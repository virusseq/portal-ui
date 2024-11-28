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

import { css } from '@emotion/react';
import { ReactElement } from 'react';
import { Column, Row } from 'react-table';

import { UploadDataType } from '@/components/../global/hooks/useMuseData';
import { uuidSort } from '@/components/GenericTable/helpers';
import theme from '@/components/theme';
import { Checkmark, Ellipsis, Warning } from '@/components/theme/icons';

import { UploadStatusType } from './types';

const statusSortingOrder = ['ERROR', 'PROCESSING', 'COMPLETE', 'QUEUED'];

const StatusIcon = ({ status }: { status: UploadStatusType }) => {
	switch (status) {
		case 'COMPLETE':
			return <Checkmark size={12} />;

		case 'ERROR':
			return <Warning size={13} />;

		case 'PROCESSING':
			return <Ellipsis size={12} />;

		case 'QUEUED':
			return <Ellipsis size={12} fill={theme.colors.grey_6} />;

		default:
			return <Ellipsis size={12} fill={theme.colors.grey_6} />;
	}
};

const columnData: Column<Record<string, unknown>>[] = [
	{
		accessor: 'studyId',
		Header: 'Study ID',
		sortType: uuidSort,
	},
	{
		accessor: 'submitterSampleId',
		Header: 'Sample ID',
		sortType: uuidSort,
	},
	{
		accessor: 'analysisId',
		Header: 'Analysis ID',
		sortType: uuidSort,
	},
	{
		accessor: 'status',
		Cell: ({ row: { original }, value }: { row: Row; value: unknown }): ReactElement => {
			const { error } = original as UploadDataType;

			return (
				<>
					<StatusIcon status={value as UploadStatusType} />

					<span
						css={css`
							display: inline-block;
							margin-left: 15px;
							position: absolute;
							${value === 'ERROR' && `color: ${theme.colors.error_dark}`}
						`}
					>
						{`${value}${error ? ':' : ''}`}
					</span>

					{error && (
						<span
							css={css`
								display: inline-block;
								margin-left: 60px;
								white-space: normal;

								${value === 'ERROR' && `color: ${theme.colors.error_dark}`}
							`}
						>
							{error}
						</span>
					)}
				</>
			);
		},
		Header: 'Submission Status',
		sortType: (rowA, rowB, columnId) =>
			statusSortingOrder.indexOf(rowA.values[columnId]) -
			statusSortingOrder.indexOf(rowB.values[columnId])
				? 1
				: -1,
	},
];

export default columnData;
