/*
 *
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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

import { ReactElement, useEffect, useState } from 'react';
import { css, useTheme } from '@emotion/react';
import {
	Pagination,
	Table,
	TableContextProvider,
	useArrangerData,
	useArrangerTheme,
	Toolbar,
} from '@overture-stack/arranger-components';
import type { SQONType } from '@overture-stack/arranger-components/dist/DataContext/types';
import {
	CustomColumnMappingInterface,
	CustomExporterInput,
	ExporterFunction,
} from '@overture-stack/arranger-components/dist/Table/DownloadButton/types';
import { UseThemeContextProps } from '@overture-stack/arranger-components/dist/ThemeContext/types';
import { isEmpty } from 'lodash';
import urlJoin from 'url-join';

import { getConfig } from '@/global/config';
import useSingularityData, { Archive } from '@/global/hooks/useSingularityData';
import useTrackingContext from '@/global/hooks/useTrackingContext';
import { ThemeInterface } from '@/components/theme';
import { Download } from '@/components/theme/icons';
import sleep from '@/components/utils/sleep';

import DownloadInfoModal from './DownloadInfoModal';
import { buildSqonWithObjectIds, saveSet } from './helper';

const COLUMNS_DROPDOWN_TOOLTIP = 'Column selection does \\a not affect downloads.';

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
			// columnTypes: {
			// 	list: {
			// 		listStyle: 'roman',
			// 	},
			// },

			// Other Components
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
				hoverVerticalBorderColor: theme.colors.grey_6,
				selectedBackground: theme.colors.secondary_1,
				verticalBorderColor: theme.colors.grey_3,
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
			// TODO: update Arranger Components version to have this here instead of inline
			// Toolbar: {
			// 	css: css`
			// 		.buttons {
			// 			flex-direction: row-reverse;
			// 		}
			// 	`,
			// },
		},
	},
});

const RepoTable = (): ReactElement => {
	const { sqon } = useArrangerData();
	const { fetchLatestArchiveAllInfo, findArchiveById, startArchiveBuildBySetId } =
		useSingularityData();

	const theme = useTheme();
	const { logEvent } = useTrackingContext();
	const {
		NEXT_PUBLIC_ARRANGER_API,
		NEXT_PUBLIC_ARRANGER_MANIFEST_COLUMNS,
		NEXT_PUBLIC_ENABLE_DOWNLOADS,
		NEXT_PUBLIC_SINGULARITY_API_URL,
	} = getConfig();

	const [archive, setArchive] = useState<Archive | undefined>(undefined);
	const [showDownloadInfoModal, setShowDownloadInfoModal] = useState(false);

	const showModal = () => {
		setArchive(undefined);
		setShowDownloadInfoModal(true);
	};
	const closeModal = () => {
		setShowDownloadInfoModal(false);
		setArchive(undefined);
	};

	const saveSetThenBuildArchive = async (sqon: SQONType): Promise<Archive> => {
		const setId = await saveSet(sqon);
		logEvent({
			category: 'Downloads',
			action: 'Archive Build',
		});
		return await startArchiveBuildBySetId(setId);
	};

	const updateArchiveState = async () => {
		if (archive?.status === 'BUILDING') {
			await sleep(5000);
			await findArchiveById(archive.id).then(setArchive);
		} else if (archive?.status === 'COMPLETE' && showDownloadInfoModal) {
			logEvent({
				category: 'Downloads',
				action: 'Archive Download',
			});

			window.location.assign(
				urlJoin(NEXT_PUBLIC_SINGULARITY_API_URL, '/download/archive/', archive.id),
			);
		}
	};

	useEffect(() => {
		updateArchiveState();
	}, [archive]);

	const handleBundleDownload: ExporterFunction = ({ selectedRows }) => {
		showModal();

		const sqonToUse = buildSqonWithObjectIds(sqon, selectedRows);

		const archivePromise = isEmpty(sqonToUse)
			? fetchLatestArchiveAllInfo()
			: saveSetThenBuildArchive(sqonToUse);

		archivePromise.then(setArchive);
	};

	const today = new Date().toISOString();
	const tsvExportColumns = NEXT_PUBLIC_ARRANGER_MANIFEST_COLUMNS.split(',')
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
							return (displayName || Header)
								.toLowerCase()
								.replace(/(\s+)ct(\s+)/g, '$1Ct$2')
								.replace(/(\s+)id/g, '$1ID')
								.replace(/(\s*)gisaid(\s*)/g, '$1GISAID$2');
					}
				},
				fieldName,
			};
		});

	const customExporters: CustomExporterInput = NEXT_PUBLIC_ENABLE_DOWNLOADS
		? [
				{
					columns: tsvExportColumns,
					fileName: `virusseq-metadata-export-${today}.tsv`,
					function: 'saveTSV',
					label: 'Metadata only',
					valueWhenEmpty: '',
				},
				{ function: handleBundleDownload, label: 'Metadata & Fasta files' },
		  ]
		: [];

	useArrangerTheme(getTableConfigs({ apiHost: NEXT_PUBLIC_ARRANGER_API, customExporters, theme }));

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
				<Toolbar
					css={css`
						.buttons {
							flex-direction: row-reverse;
						}
					`}
				/>
				<Table />
				<Pagination />
			</TableContextProvider>

			{showDownloadInfoModal && <DownloadInfoModal onClose={closeModal} archive={archive} />}
		</article>
	);
};

export default RepoTable;
