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

import { css, useTheme } from '@emotion/react';
import type { SQONType } from '@overture-stack/arranger-components';
import { useCallback, useEffect, useState } from 'react';

import { convertToDownloadManifest, downloadFile, type SubmissionManifest } from '#/global/utils/fileManifest';
import Collapsible from '#components/Collapsible';
import StyledLink from '#components/Link';
import Loader from '#components/Loader';
import { Modal } from '#components/Modal';
import { createZipFile } from '#components/pages/environmental/RepoTable/helper';
import defaultTheme, { type ThemeInterface } from '#components/theme';
import { Checkmark, CoronaVirus, Storage } from '#components/theme/icons';
import { INTERNAL_PATHS } from '#global/utils/constants';
import { fetchReleaseData } from '#global/hooks/useReleaseData/environmental';

import { MetadataFileSection } from './MetadataFile';
import { plainTextSequencingFileInstructions, SequencingFilesSection } from './SequencingFiles';

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
			Your download has started. By downloading this data, you agree to the policies listed under{' '}
			<StyledLink href={INTERNAL_PATHS.ACKNOWLEDGEMENTS}>acknowledgements</StyledLink>.
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
	theme = defaultTheme,
}: {
	numOfSamples?: number;
	numOfSeqFiles?: number;
	theme?: ThemeInterface;
}) => {
	return (
		<div
			css={css`
				display: flex;
				margin-top: 20px;
				align-items: center;
				border: solid 1px ${theme.colors.grey_3};
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

const CompleteCheckmark = ({ theme = defaultTheme }: { theme?: ThemeInterface }) => (
	<div
		css={css`
			display: flex;
			align-items: center;
			padding: 8px;
			background-color: ${theme.colors.success_dark};
			border-radius: 50%;
		`}
	>
		<Checkmark
			size={17}
			fill={theme.colors.white}
		/>
	</div>
);

/**
 * Component to display the title of the Download Info Modal.
 * @param showDownloading
 * @returns
 */
const DownloadInfoModalTitle = ({
	showDownloading,
	theme = defaultTheme,
}: {
	showDownloading: boolean;
	theme?: ThemeInterface;
}) => (
	<div
		css={css`
			display: flex;
			align-items: center;
			column-gap: 10px;
			margin-left: 10px;
			margin-top: 10px;
			color: ${theme.colors.primary};
			${theme.typography.heading};
			span {
				font-size: 22px;
			}
			.status-container {
				display: inline-flex;
				column-gap: 10px;
			}
		`}
	>
		{showDownloading ? (
			<span className="status-container">
				<Loader
					size={'20px'}
					margin={'0px'}
				/>{' '}
				<span>Preparing Download...</span>
			</span>
		) : (
			<span className="status-container">
				<CompleteCheckmark theme={theme} /> <span>Download Initiated</span>
			</span>
		)}
	</div>
);

/**
 * Main component for the Download Info Modal.
 */
const DownloadModal = ({
	fileManifest,
	fileMetadata,
	instructionsFileName = 'download_instructions.txt',
	isLoading,
	manifestFileName = 'manifest.txt',
	metadataFileName = 'metadata-export.tsv',
	onClose,
	sqon,
	selectedRows = [],
	zipArchiveFileName = 'download_bundle.zip',
}: {
	fileManifest?: SubmissionManifest[];
	fileMetadata: Blob | null;
	instructionsFileName?: string;
	isLoading: boolean;
	manifestFileName?: string;
	metadataFileName?: string;
	onClose: () => void;
	selectedRows: string[];
	sqon: SQONType;
	zipArchiveFileName?: string;
}) => {
	const theme: ThemeInterface = useTheme();

	const [samplesCount, setSamplesCount] = useState(selectedRows.length);

	const handleBundleDownload = useCallback(async () => {
		const bundleDownload: { content: Blob; fileName: string }[] = [];

		if (fileManifest) {
			const manifestContent = convertToDownloadManifest(fileManifest);
			const manifestBlob = new Blob([manifestContent], { type: 'text/tab-separated-values' });
			bundleDownload.push({ content: manifestBlob, fileName: manifestFileName });
		}
		if (fileMetadata) {
			bundleDownload.push({ content: fileMetadata, fileName: metadataFileName });
			bundleDownload.push({
				content: new Blob([plainTextSequencingFileInstructions], { type: 'text/plain' }),
				fileName: instructionsFileName,
			});
		}

		const zipBlob = await createZipFile(bundleDownload);
		downloadFile(zipBlob, zipArchiveFileName);
	}, [fileManifest, fileMetadata, metadataFileName, instructionsFileName, zipArchiveFileName, manifestFileName]);

	const handleDownloadManifest = () => {
		if (!fileManifest || fileManifest.length === 0) {
			console.warn('No genomic files available for download');
			return;
		}
		const manifestContent = convertToDownloadManifest(fileManifest);
		const blob = new Blob([manifestContent], { type: 'text/tab-separated-values' });
		downloadFile(blob, manifestFileName);
	};

	const handleDownloadMetadata = (blob: Blob) => {
		downloadFile(blob, metadataFileName);
	};

	useEffect(() => {
		if (!isLoading) {
			handleBundleDownload();
			if (selectedRows.length === 0) {
				fetchReleaseData(sqon).then((data) => {
					const sumGenomesPerProvince = data?.filesByVariant?.reduce((sum, { count }) => sum + count, 0);
					const approxGenomesCount = data?.genomesCount?.value;
					setSamplesCount(sumGenomesPerProvince || approxGenomesCount || 0);
				});
			}
		}
	}, [isLoading, handleBundleDownload, selectedRows, sqon]);

	return (
		<Modal
			onCloseClick={onClose}
			title={
				<DownloadInfoModalTitle
					showDownloading={isLoading}
					theme={theme}
				/>
			}
		>
			<div
				css={css`
					padding: 20px;
					width: 800px;
					height: 500px;
					overflow-y: auto;
					margin: 0px;
					${theme.typography.regular}

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
				{isLoading ? (
					<>
						<Loader size={'25px'} />
						<span>Preparing Download...</span>
					</>
				) : (
					<>
						<AdvisorySection />
						<ArchiveStatDisplay
							numOfSamples={samplesCount}
							numOfSeqFiles={fileManifest?.length}
						/>
						<p>Download metadata and sequencing files instructions:</p>
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
					</>
				)}
			</div>
		</Modal>
	);
};

export default DownloadModal;
