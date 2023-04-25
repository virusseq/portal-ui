String podSpec = '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: node
    image: node:16
    tty: true
    securityContext:
      runAsUser: 1000
      runAsGroup: 1000
      fsGroup: 1000
  - name: dind-daemon
    image: docker:18.06-dind
    securityContext:
      privileged: true
    env:
    - name: DOCKER_TLS_CERTDIR
      value: ''
    volumeMounts:
      - name: dind-storage
        mountPath: /var/lib/docker
  - name: docker
    image: docker:18-git
    command:
    - cat
    tty: true
    env:
    - name: DOCKER_HOST
      value: tcp://localhost:2375
    - name: HOME
      value: /home/jenkins/agent
    securityContext:
      runAsUser: 1000
      runAsGroup: 1000
      fsGroup: 1000
  volumes:
  - name: dind-storage
    emptyDir: {}
'''

pipeline {
  agent {
    kubernetes {
      yaml podSpec
    }
  }

  environment {
    dockerImgRepo = 'ghcr.io/cancogen-virus-seq/portal'
    githubRepo = 'cancogen-virus-seq/portal'

    commit = sh(
      returnStdout: true,
      script: 'git describe --always'
    ).trim()

    version = sh(
      returnStdout: true,
      script: 'cat ./package.json | ' +
        'grep "version" | ' +
        'cut -d : -f2 | ' +
        "sed \'s:[\",]::g\'"
    ).trim()
  }

  options {
    timeout(time: 30, unit: 'MINUTES')
    timestamps()
  }

  stages {
    stage('Build images') {
      steps {
        container('docker') {
          sh "docker build \
            --build-arg APP_COMMIT=${commit} \
            --build-arg APP_VERSION=${version} \
            --network=host \
            -f Dockerfile \
            -t portal:${commit} ."
        }
      }
    }

    // attempt to publish github tag before images to prevent overwriting existing ones.
    stage('Publish Git Version Tag') {
      when {
        branch 'main'
      }
      steps {
        container('docker') {
          withCredentials([usernamePassword(
            credentialsId: 'argoGithub',
            passwordVariable: 'GIT_PASSWORD',
            usernameVariable: 'GIT_USERNAME'
          )]) {
            sh "git tag ${version}"
            sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/${githubRepo} --tags"
          }
        }
      }
    }

    stage('Publish images') {
      when {
        anyOf {
          branch 'develop'
          branch 'main'
          // branch 'test'
          branch 'arrangerV3'
        }
      }
      steps {
        container('docker') {
          withCredentials([usernamePassword(
            credentialsId:'argoContainers',
            usernameVariable: 'USERNAME',
            passwordVariable: 'PASSWORD'
          )]) {
            sh 'docker login ghcr.io -u $USERNAME -p $PASSWORD'

            script {
              if (env.BRANCH_NAME ==~ /(main)/) { // push latest and version tags
                sh "docker tag portal:${commit} ${dockerImgRepo}:${version}"
                sh "docker push ${dockerImgRepo}:${version}"

                sh "docker tag portal:${commit} ${dockerImgRepo}:latest"
                sh "docker push ${dockerImgRepo}:latest"
              } else { // push commit tags
                sh "docker tag portal:${commit} ${dockerImgRepo}:${commit}"
                sh "docker push ${dockerImgRepo}:${commit}"
              }

              if (env.BRANCH_NAME ==~ /(develop)/) { // push edge tag
                sh "docker tag portal:${commit} ${dockerImgRepo}:edge"
                sh "docker push ${dockerImgRepo}:edge"
              }
            }
          }
        }
      }
    }

    stage('Deploy to cancogen-virus-seq-dev') {
      when {
        anyOf {
          branch 'develop'
          branch 'arrangerV3'
          // branch 'test'
        }
      }
      steps {
        script {
          // we don't want the build to be tagged as failed because it could not be deployed.
          try {
            build(job: 'virusseq/update-app-version', parameters: [
              string(name: 'BUILD_BRANCH', value: env.BRANCH_NAME),
              string(name: 'CANCOGEN_ENV', value: 'dev'),
              string(name: 'NEW_APP_VERSION', value: "${commit}"),
              string(name: 'TARGET_RELEASE', value: 'portalv3'),
            ])
          } catch (err) {
            echo 'The app built successfully, but could not be deployed'
          }
        }
      }
    }
  }
}
