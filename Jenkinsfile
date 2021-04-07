def dockerHubRepo = "cancogen-virus-seq/portal"
def githubRepo = "cancogen-virus-seq/portal"
def commit = "UNKNOWN"
def version = "UNKNOWN"

pipeline {
    agent {
        kubernetes {
            label 'portal-executor'
            yaml """
apiVersion: v1
kind: Pod
spec:
  securityContext:
    runAsUser: 1000
    runAsGroup: 1000
    fsGroup: 1000
  containers:
  - name: node
    image: node:12.13.1
    tty: true
  - name: docker
    image: docker:18-git
    tty: true
    volumeMounts:
    - mountPath: /var/run/docker.sock
      name: docker-sock
  - name: helm
    image: alpine/helm:3.1.0
    command:
    - cat
    tty: true
  volumes:
  - name: docker-sock
    hostPath:
      path: /var/run/docker.sock
      type: File
"""
        }
    }
    stages {
        stage('Prepare') {
            steps {
                script {
                    commit = sh(returnStdout: true, script: 'git describe --always').trim()
                }
                script {
                    version = sh(returnStdout: true, script: 'cat ./package.json | grep version | cut -d \':\' -f2 | sed -e \'s/"//\' -e \'s/",//\'').trim()
                }
            }
        }

		stage('Test') {
			steps {
				container('node') {
					sh "npm ci"
					sh "npm run test"
				}
			}
		}

		stage('Build & Publish Changes') {
			when {
				anyOf {
					branch 'develop'
				}
			}
			steps {
				container('docker') {
					withCredentials([usernamePassword(credentialsId:'argoContainers', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
						sh 'docker login ghcr.io -u $USERNAME -p $PASSWORD'
					}
					// DNS error if --network is default
					sh "docker build --network=host -f Dockerfile . -t ${dockerHubRepo}:cancogen -t ${dockerHubRepo}:cancogen-${commit}"
					sh "docker push ${dockerHubRepo}:cancogen-${commit}"
					sh "docker push ${dockerHubRepo}:cancogen"
				}
			}
		}

		stage('Release & Tag') {
			when {
				anyOf {
					branch 'main'
				}
			}
			steps {
				container('docker') {
					withCredentials([usernamePassword(credentialsId: 'argoGithub', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
						sh "git tag ${version}"
						sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/${githubRepo} --tags"
					}
					withCredentials([usernamePassword(credentialsId:'argoContainers', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
						sh 'docker login ghcr.io -u $USERNAME -p $PASSWORD'
					}
					// DNS error if --network is default
					sh "docker build --network=host -f Dockerfile . -t ${dockerHubRepo}:${version} -t ${dockerHubRepo}:latest"
					sh "docker push ${dockerHubRepo}:${version}"
					sh "docker push ${dockerHubRepo}:latest"
				}
			}
		}
    }
}
