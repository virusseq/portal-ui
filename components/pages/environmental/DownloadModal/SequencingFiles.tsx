/*
 *
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
 *
 *  This program and the accompanying materials are made available under the terms of
 *  the GNU Affero General Public License v3.0. You should have received a copy of the
 *  GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
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

import { css } from '@emotion/react';

import Button from '#components/Button';
import { type ThemeInterface } from '#components/theme';
import Error from '#components/theme/icons/error';
import type { SubmissionManifest } from '#global/utils/fileManifest';

const dockerRunCommand = `docker run -d -it --rm --name score-client \\
  -e STORAGE_URL=https://score.dev.virusseq-dataportal.ca \\
  -e METADATA_URL=https://song.dev.virusseq-dataportal.ca \\
  --network="host" \\
  --platform="linux/amd64" \\
  --mount type=bind,source="$(pwd)",target=/output \\
  ghcr.io/overture-stack/score:latest`;

const dockerExecCommand = `docker exec score-client sh -c "score-client download --manifest /output/manifest.txt --output-dir /output"`;

const dockerStopCommand = `docker stop score-client`;

/**
 * Section to display the sequencing genomic file download instructions.
 */
export const SequencingFilesSection = ({
	fileManifest,
	handleDownloadManifest,
	theme,
}: {
	fileManifest?: SubmissionManifest[];
	handleDownloadManifest: () => void;
	theme: ThemeInterface;
}) => (
	<>
		{fileManifest && fileManifest.length > 0 ? (
			<>
				<p>
					Follow the steps below to download the genomic files. Make sure you have Docker installed
					on your machine.
				</p>
				<h2>1. Download manifest file:</h2>
				<p>
					Click the button below to download the manifest file in TSV format. This file is required
					for the download process and contains the necessary information about your files.
				</p>
				<p>
					<strong>Note:</strong> File must be downloaded in an empty directory, and the file must be
					saved with name <strong>manifest.txt</strong>.
				</p>
				<Button onClick={handleDownloadManifest}>Download Manifest</Button>
				<h2>2. Downloading Files Using the Score Client Docker Image:</h2>
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
					Open a terminal, navigate to the same directory where the <strong>manifest.txt</strong>{' '}
					file was downloaded, and run the following command to start the Score client Docker
					container:
				</p>
				<pre>
					<code>{dockerRunCommand}</code>
				</pre>
				<p>Execute the following command to download your files using the manifest:</p>
				<pre
					css={css`
						overflow-x: scroll;
						margin: 0px;
					`}
				>
					<code>{dockerExecCommand}</code>
				</pre>
				<h2>3. Stop Score client:</h2>
				After the download is complete, stop the Score client container by running:
				<pre>
					<code>{dockerStopCommand}</code>
				</pre>
			</>
		) : (
			<div
				css={css`
					display: flex;
					align-items: center;
					column-gap: 10px;
					margin-left: 10px;
					margin-top: 10px;
				`}
			>
				<Error /> <span>Selected records do not have genomic files available for download</span>
			</div>
		)}
	</>
);

export const plainTextSequencingFileInstructions = `To download the genomic files, follow these steps:

1. Download the manifest file:
   Click the button below to download the manifest file in TSV format. This file is required for the download process and contains the necessary information about your files.

   Note: File must be downloaded in an empty directory, and the file must be saved with name manifest.txt.

2. Downloading Files Using the Score Client Docker Image:
   Note: Ensure that Docker is installed and running on your local machine before proceeding. If Docker is not installed, you can follow the installation instructions on the official Docker website.

   Open a terminal, navigate to the same directory where the manifest.txt file was downloaded, and run the following command to start the Score client Docker container:

   \`\`\`
   ${dockerRunCommand}
   \`\`\`

   Execute the following command to download your files using the manifest:

   \`\`\`
   ${dockerExecCommand}
   \`\`\`

3. Stop Score client:
   After the download is complete, stop the Score client container by running:

   \`\`\`
   ${dockerStopCommand}
   \`\`\`
`;
