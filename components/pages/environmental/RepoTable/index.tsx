/*
 *
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
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
import {
	Pagination,
	Table,
	TableContextProvider,
	Toolbar,
	useArrangerTheme,
} from '@overture-stack/arranger-components';
import {
	CustomColumnMappingInterface,
	CustomExporterInput,
	type ExporterFileInterface,
	type ExporterFunction,
} from '@overture-stack/arranger-components/dist/Table/DownloadButton/types';
import { UseThemeContextProps } from '@overture-stack/arranger-components/dist/ThemeContext/types';
import type { SQON } from '@overture-stack/sqon-builder';
import { ReactElement, useState } from 'react';
import urlJoin from 'url-join';

import StyledLink from '#components/Link';
import DownloadModal from '#components/pages/environmental/DownloadModal';
import { ThemeInterface } from '#components/theme';
import { Download } from '#components/theme/icons';
import validateStringAsUrl from '#components/utils/urlValidation';
import { getConfig } from '#global/config';
import type { SubmissionManifest } from '#global/utils/fileManifest';

import { excludeRecordsWithoutFiles, getManifestDataAsync, getMetadataBlobAsync } from './helper';

const COLUMNS_DROPDOWN_TOOLTIP = 'Column selection does \\a not affect downloads.';

const downloadButtonCustomProps = { exportSelectedRowsField: '_id' };

const getTableConfigs = ({
	apiHost = '',
	customExporters,
	theme,
}: {
	apiHost?: string;
	customExporters?: CustomExporterInput;
	theme: ThemeInterface;
}): UseThemeContextProps => ({
	callerName: 'RepoTable',
	components: {
		Table: {
			borderColor: theme.colors.grey_3,
			padding: '0.4rem',
			columnTypes: {
				'data.sra_url': {
					cellValue: ({ value = '' }) => {
						const valueIsURL = validateStringAsUrl(value);
						// TODO: may want to validate the URL is an SRA one, if we have a pattern
						return valueIsURL ? (
							<StyledLink
								href={value}
								rel="noopener noreferrer"
								target="_blank"
							>
								{value}
							</StyledLink>
						) : (
							value
						);
					},
				},
			},

			// Components
			Cell: {
				hoverBackground: theme.colors.secondary_1,
				verticalBorderColor: theme.colors.grey_3,
			},
			CountDisplay: {
				fontColor: 'inherit',
			},
			DownloadButton: {
				background: theme.colors.success_dark,
				borderColor: theme.colors.primary,
				customExporters,
				downloadUrl: urlJoin(apiHost, 'download'),
				fontColor: theme.colors.white,
				hoverBackground: theme.colors.accent3_dark,
				...downloadButtonCustomProps,
				label: () => (
					<>
						<Download
							fill={theme.colors.white}
							style={css`
								margin-right: 0.2rem;
							`}
						/>{' '}
						Download Dataset
					</>
				),
			},
			ColumnSelectButton: {
				background: theme.colors.white,
				borderColor: theme.colors.grey_5,
				fontColor: theme.colors.primary,
				hoverBackground: theme.colors.secondary_light,
				tooltipAlign: 'top left',
				tooltipText: COLUMNS_DROPDOWN_TOOLTIP,
			},
			DropDown: {
				arrowTransition: 'all 0s',
				css: css`
					${theme.typography.subheading2}
					line-height: 1.3rem;
				`,
				disabledBackground: theme.colors.grey_3,
				disabledFontColor: theme.colors.grey_6,
				ListWrapper: {
					background: theme.colors.white,
					css: css`
						${theme.shadow.default}
					`,
					fontColor: theme.colors.black,
					fontSize: '0.7rem',
					hoverBackground: theme.colors.secondary_light,
				},
			},
			HeaderRow: {
				fontColor: theme.colors.accent_dark,
				fontSize: '0.8rem',
				verticalBorderColor: theme.colors.grey_3,
			},
			Row: {
				css: css`
					&:nth-of-type(odd) {
						background: ${theme.colors.grey_1};
					}
				`,
				hoverBackground: theme.colors.grey_3,
				selectedBackground: theme.colors.secondary_1,
			},
			MaxRowsSelector: {
				fontColor: 'inherit',
			},
			PageSelector: {
				//
			},
			TableWrapper: {
				margin: '0.5rem 0',
			},
			Toolbar: {
				css: css`
					.buttons {
						flex-direction: row-reverse;
					}
				`,
			},
		},
	},
});

const RepoTable = (): ReactElement => {
	const theme = useTheme();
	const {
		NEXT_PUBLIC_ARRANGER_ENVIRONMENTAL_API,
		NEXT_PUBLIC_ARRANGER_ENVIRONMENTAL_MANIFEST_COLUMNS,
		NEXT_PUBLIC_ENABLE_DOWNLOADS,
	} = getConfig();

	const [showDownloadInfoModal, setShowDownloadInfoModal] = useState(false);
	const [fileManifest, setFileManifest] = useState<SubmissionManifest[]>([]);
	const [fileMetadata, setFileMetadata] = useState<Blob | null>(null);
	const [selectedRows, setSelectedRows] = useState<string[]>([]);
	const [isLoadingManifest, setIsLoadingManifest] = useState(false);
	const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);

	const closeModal = () => {
		setShowDownloadInfoModal(false);
		setFileManifest([]);
		setFileMetadata(null);
	};

	const today = new Date().toISOString();
	const tsvExportColumns = NEXT_PUBLIC_ARRANGER_ENVIRONMENTAL_MANIFEST_COLUMNS.split(',')
		.filter((field) => field.trim()) // break it into arrays, and ensure there's no empty field names
		.map((fieldName) => fieldName.replace(/['"]+/g, '').trim())
		.map((fieldName): Partial<CustomColumnMappingInterface> => {
			return {
				displayFormat: ({ displayFormat = '', displayType = '', type = '' } = {}) => {
					return displayFormat || ([displayType, type].includes('date') && 'yyyy-MM-dd') || null;
				},
				displayName: ({ displayName = '', Header = '' } = {}) => {
					switch (fieldName) {
						case 'study_id':
							return fieldName;

						default:
							return displayName || Header;
					}
				},
				fieldName,
			};
		});

	const handleBundleDownload: ExporterFunction = ({
		sqon,
		url,
		selectedRows,
		files,
	}: {
		sqon: SQON | null;
		url: string;
		selectedRows: string[];
		files?: ExporterFileInterface[];
	}) => {
		const filteredSqonWithFiles = excludeRecordsWithoutFiles(sqon);

		setShowDownloadInfoModal(true);
		setIsLoadingManifest(true);
		setIsLoadingMetadata(true);
		setSelectedRows(selectedRows);

		// Start fetching manifest
		getManifestDataAsync(filteredSqonWithFiles)
			.then(setFileManifest)
			.catch((error) => {
				console.error('Failed to fetch manifest:', error);
			})
			.finally(() => setIsLoadingManifest(false));

		// Start fetching files metadata if files are present
		if (files && files.length > 0) {
			getMetadataBlobAsync({
				sqon,
				columns: files[0].columns,
				documentType: 'analysis',
				fileType: 'tsv',
				maxRows: 0,
				url,
			})
				.then(setFileMetadata)
				.finally(() => setIsLoadingMetadata(false));
		} else {
			setIsLoadingMetadata(false);
		}
	};

	const customExporters: CustomExporterInput = NEXT_PUBLIC_ENABLE_DOWNLOADS
		? [
				{
					columns: tsvExportColumns,
					fileName: `wastewater-metadata-export-${today}.tsv`,
					function: 'saveTSV',
					label: 'Metadata only',
					valueWhenEmpty: '',
				},
				{ function: handleBundleDownload, label: 'Metadata + File manifest' },
			]
		: [];

	useArrangerTheme(getTableConfigs({ apiHost: NEXT_PUBLIC_ARRANGER_ENVIRONMENTAL_API, customExporters, theme }));

	return (
		<article
			css={css`
				border-radius: 5px;
				background-color: ${theme.colors.white};
				padding: 8px;
				margin-bottom: 12px;
				${theme.shadow.default};
			`}
		>
			<TableContextProvider>
				<Toolbar />
				<Table />
				<Pagination />
			</TableContextProvider>

			{showDownloadInfoModal && (
				<DownloadModal
					onClose={closeModal}
					fileManifest={fileManifest}
					fileMetadata={fileMetadata}
					selectedRows={selectedRows}
					isLoading={isLoadingManifest || isLoadingMetadata}
					metadataFileName={`wastewater-metadata-export-${today}.tsv`}
				/>
			)}
		</article>
	);
};

export default RepoTable;
