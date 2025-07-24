/*
 *
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
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

import { css, useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';

import {
	convertToDownloadManifest,
	downloadFile,
	type SubmissionManifest,
} from '#/global/utils/fileManifest';
import Button from '#components/Button';
import Collapsible from '#components/Collapsible';
import StyledLink from '#components/Link';
import Loader from '#components/Loader';
import { Modal } from '#components/Modal';
import defaultTheme from '#components/theme';
import { CoronaVirus, Storage } from '#components/theme/icons';
import Error from '#components/theme/icons/error';
import { INTERNAL_PATHS } from '#global/utils/constants';

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
 * Advisory section to display the data usage policy and acknowledgements.
 * @returns
 */
const AdvisorySection = () => (
	<>
		<p
			css={css`
				margin-top: 25px;
			`}
		>
			By downloading this data, you agree to{' '}
			<StyledLink href={INTERNAL_PATHS.ACKNOWLEDGEMENTS}>acknowledge</StyledLink> the Canadian
			Public Health Laboratory Network (CPHLN), CanCOGeN VirusSeq, all laboratories having
			contributed data and follow all{' '}
			<StyledLink href={INTERNAL_PATHS.POLICIES}>CVDP policies</StyledLink>.
		</p>
		<p>
			Data that is being shared is the work of many individuals and should be treated as unpublished
			data. If you wish to publish research using the data, contact us at{' '}
			<StyledLink
				href="mailto:info@virusseq-dataportal.ca"
				rel="noopener noreferrer"
				target="_blank"
			>
				info@virusseq-dataportal.ca
			</StyledLink>{' '}
			first to ensure that those who have generated the data can be involved in its analysis.
		</p>
	</>
);

/**
 * Summary component to display the number of samples and sequencing files
 * @param param0
 * @returns
 */
const ArchiveStatDisplay = ({
	numOfSamples = 0,
	numOfSeqFiles = 0,
}: {
	numOfSamples?: number;
	numOfSeqFiles?: number;
}) => {
	return (
		<div
			css={css`
				display: flex;
				margin-top: 20px;
				align-items: center;
				border: solid 1px ${defaultTheme.colors.grey_3};
				padding: 15px 20px 15px 20px;
				column-gap: 40px;
			`}
		>
			<div
				css={css`
					display: flex;
					align-items: center;
					column-gap: 10px;
				`}
			>
				<CoronaVirus />
				<span>{numOfSamples} Analysis</span>
			</div>
			<div
				css={css`
					display: flex;
					align-items: center;
					column-gap: 10px;
				`}
			>
				<Storage />
				<span>{numOfSeqFiles} Sequencing files</span>
			</div>
		</div>
	);
};

/**
 * Component to display the title of the Download Info Modal.
 * @param showDownloading
 * @returns
 */
const DownloadInfoModalTitle = (showDownloading: boolean) => (
	<div
		css={css`
			display: flex;
			align-items: center;
			column-gap: 10px;
			margin-left: 10px;
			margin-top: 10px;
			color: ${defaultTheme.colors.primary};
			${defaultTheme.typography.heading};
			span {
				font-size: 22px;
			}
		`}
	>
		{showDownloading && (
			<>
				<Loader size={'20px'} margin={'0px'} /> <span>Preparing Download...</span>
			</>
		)}

		{!showDownloading && (
			<>
				<span>Download files instructions</span>
			</>
		)}
	</div>
);

/**
 * Section to display the metadata file download instructions.
 * @param param0
 * @returns
 */
const MetadataFileSection = ({
	fileMetadata,
	handleDownloadMetadata,
}: {
	fileMetadata: Blob | null;
	handleDownloadMetadata: (blob: Blob) => void;
}) => (
	<>
		{!fileMetadata && <Loader size={'25px'} />}
		{fileMetadata && (
			<>
				<p>
					The metadata file contains information about the selected samples. Click the button below
					to download it.
				</p>
				<Button onClick={() => handleDownloadMetadata(fileMetadata)}>Download Metadata</Button>
			</>
		)}
	</>
);

/**
 * Section to display the sequencing genomic file download instructions.
 * @param param0
 * @returns
 */
const SequencingFilesSection = ({
	fileManifest,
	handleDownloadManifest,
	theme,
}: {
	fileManifest?: SubmissionManifest[];
	handleDownloadManifest: () => void;
	theme: typeof defaultTheme;
}) => (
	<>
		{fileManifest?.length === 0 && (
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
		{!fileManifest && <Loader size={'25px'} />}
		{fileManifest && fileManifest.length > 0 && (
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
		)}
	</>
);

/**
 * Main component for the Download Info Modal.
 * @param param0
 * @returns
 */
const DownloadInfoModal = ({
	onClose,
	fileManifest,
	fileMetadata,
	selectedRows = [],
}: {
	onClose: () => void;
	fileManifest?: SubmissionManifest[];
	fileMetadata: Blob | null;
	selectedRows: string[];
}) => {
	const theme: typeof defaultTheme = useTheme();
	const [showDownloading, setShowDownloading] = useState(true);

	const handleDownloadManifest = () => {
		if (!fileManifest || fileManifest.length === 0) {
			console.warn('No genomic files available for download');
			return;
		}
		const manifestContent = convertToDownloadManifest(fileManifest);
		const blob = new Blob([manifestContent], { type: 'text/tab-separated-values' });
		downloadFile(blob, 'manifest.txt');
	};

	const handleDownloadMetadata = (blob: Blob) => {
		const today = new Date().toISOString();
		const fileName = `wastewater-metadata-export-${today}.tsv`;
		downloadFile(blob, fileName);
	};

	useEffect(() => {
		if (fileMetadata) {
			setShowDownloading(false);
		}
	}, [fileMetadata, fileManifest]);

	return (
		<Modal onCloseClick={onClose} title={DownloadInfoModalTitle(showDownloading)}>
			<div
				css={css`
					padding: 20px;
					width: 900px;
					height: 500px;
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
				<ArchiveStatDisplay
					numOfSamples={selectedRows.length}
					numOfSeqFiles={fileManifest?.length}
				/>
				<br />
				<Collapsible title="Instructions for Download Metadata file">
					<MetadataFileSection
						fileMetadata={fileMetadata}
						handleDownloadMetadata={handleDownloadMetadata}
					/>
				</Collapsible>
				<Collapsible title="Instructions for Download Sequencing files">
					<SequencingFilesSection
						fileManifest={fileManifest}
						handleDownloadManifest={handleDownloadManifest}
						theme={theme}
					/>
				</Collapsible>

				<AdvisorySection />
			</div>
		</Modal>
	);
};

export default DownloadInfoModal;
