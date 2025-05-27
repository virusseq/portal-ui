/*
 *
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
 *
 *  This program and the accompanying materials are made available under the terms of
 *  the GNU Affero General Public License v3.0. You should have received a copy of the
 *  GNU Affero General Public License along with this program.
 *   If not, see <http://www.gnu.org/licenses/>.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 *  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 *  SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 *  TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 *  OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 *  IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 *  ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

import { css, useTheme } from '@emotion/react';
import { ReactElement } from 'react';

import Button from '#components/Button';
import { Modal } from '#components/Modal';
import AccessTokenInfo from '#components/pages/user/AccessTokenInfo';
import defaultTheme from '#components/theme';

import type { SubmissionManifest } from './types';

export const convertManifestsToTSV = (submissionId: string, manifests: SubmissionManifest[]) => {
	const header = `${submissionId}\t\t\n`;
	const dataRows = manifests
		.map(({ objectId, fileName, md5Sum }) => `${objectId}\t/output/${fileName}\t${md5Sum}`)
		.join('\n');
	return header + dataRows;
};

const downloadTSVFile = (data: string, filename: string) => {
	const blob = new Blob([data], { type: 'text/tab-separated-values' });
	const url = URL.createObjectURL(blob);

	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
};

const dockerRunCommand = `
docker run -d -it --rm --name score-client \\
  -e ACCESSTOKEN=\${token} \\
  -e STORAGE_URL=https://score.dev.virusseq-dataportal.ca \\
  -e METADATA_URL=https://song.dev.virusseq-dataportal.ca \\
  --network="host" \\
  --platform="linux/amd64" \\
  --mount type=bind,source="$(pwd)",target=/output \\
  ghcr.io/overture-stack/score:latest"
    `;

const dockerExecCommand = `docker exec score-client sh -c "score-client upload --manifest /output/manifest.txt"`;

const dockerStopCommand = `docker stop score-client`;

const FileUploadInstructionsModal = ({
	submissionId,
	onClose,
	submissionManifest,
}: {
	submissionId: string;
	onClose: () => void;
	submissionManifest: SubmissionManifest[];
}): ReactElement => {
	const theme: typeof defaultTheme = useTheme();

	const handleDownload = () => {
		const manifestContent = convertManifestsToTSV(submissionId, submissionManifest);
		downloadTSVFile(manifestContent, 'manifest.txt');
	};

	return (
		<Modal title={'Genomic files upload instructions'} onCloseClick={onClose}>
			<div
				css={css`
					padding: 20px;
					width: 900px;
					height: 700px;
					overflow-y: scroll;
					margin: 0px;
					${defaultTheme.typography.regular}

					pre {
						background-color: ${theme.colors.grey_2};
						border-radius: 8px;
						box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
						padding: 10px;
						border: 1px solid ${theme.colors.grey_3};
						margin: 10px 10px;
					}
				`}
			>
				<p>
					Follow the steps below to upload the genomic files. Make sure you have the necessary files
					ready and that you have Docker installed on your machine.
				</p>
				<h2>1. Download manifest file:</h2>
				<p>
					Click the button below to download the manifest file in TSV format. This file is required
					for the upload process and contains the necessary information about your files.
				</p>
				<p>
					<strong>Note:</strong> File must be downloaded in the same directory as the files you want
					to upload.
				</p>
				<Button onClick={handleDownload}>Download Manifest</Button>
				<h2>2. Copy your access token:</h2>
				<p>
					To authenticate, you need an access token for the Score client. Copy the token below and
					continue with the next step.
				</p>
				<div
					css={css`
						padding: 0px 50px;
						margin: 0px;
					`}
				>
					<AccessTokenInfo />
				</div>
				<h2>3. Uploading Files Using the Score Client Docker Image:</h2>
				<p>
					<strong>Note:</strong> Ensure that Docker is installed and running on your local machine
					before proceeding. If Docker is not installed, you can follow the installation
					instructions on the official{' '}
					<a
						css={css`
							align-items: center;
							color: ${theme.colors.primary};
							font-weight: bold;
							text-decoration: none;
						`}
						href="https://docs.docker.com/get-docker/"
						rel="noopener noreferrer"
						target="_blank"
					>
						Docker website
					</a>
					.
				</p>
				<p>
					<strong>Note:</strong> Ensure that the manifest file is in the same directory as the files
					you want to upload.
				</p>
				<p>
					In the command below, replace <code>{'${token}'}</code> with the token you copied in Step
					2.
				</p>
				<p>Run the following command to start the Score client Docker container:</p>
				<pre>
					<code>{dockerRunCommand}</code>
				</pre>
				<p>Execute the following command to upload your files using the manifest:</p>
				<pre>
					<code>{dockerExecCommand}</code>
				</pre>
				<h2>4. Stop Score client:</h2>
				After the upload is complete, stop the Score client container by running:
				<pre>
					<code>{dockerStopCommand}</code>
				</pre>
			</div>
		</Modal>
	);
};

export default FileUploadInstructionsModal;
