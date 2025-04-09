/*
 *
 * Copyright (c) 2024 The Ontario Institute for Cancer Research. All rights reserved
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

import Details from '#components/Details';
import { uuidSort } from '#components/GenericTable/helpers';
import theme from '#components/theme';
import { Checkmark, Ellipsis, Warning } from '#components/theme/icons';
import { UploadData } from '#global/hooks/useEnvironmentalData';

import { UploadStatus } from './types';

const statusSortingOrder = [
	UploadStatus.ERROR,
	UploadStatus.PROCESSING,
	UploadStatus.COMPLETE,
	UploadStatus.INCOMPLETE,
];

const StatusIcon = ({ status }: { status: UploadStatus }) => {
	switch (status) {
		case UploadStatus.COMPLETE:
			return <Checkmark size={12} />;

		case UploadStatus.ERROR:
			return <Warning size={12} />;

		case UploadStatus.INCOMPLETE:
			return <Warning size={12} />;

		case UploadStatus.PROCESSING:
			return <Ellipsis size={12} />;
	}
};

const columnData: Column<Record<string, unknown>>[] = [
	{
		accessor: 'organization',
		Header: 'Study ID',
		sortType: uuidSort,
	},
	{
		accessor: 'submitterSampleId',
		Header: 'Sample ID',
		sortType: uuidSort,
	},
	{
		accessor: 'systemId',
		Header: 'Analysis ID',
		sortType: uuidSort,
	},
	{
		accessor: 'status',
		Cell: ({ row, value }: { row: Row<UploadData>; value: UploadStatus }): ReactElement => {
			const { details, systemId, eventyType } = row.original;

			return (
				<>
					<StatusIcon status={value} />
					<span
						css={css`
							display: inline-block;
							margin-left: 15px;
							position: absolute;
							${value === UploadStatus.ERROR && `color: ${theme.colors.error_dark}`}
						`}
					>
						{`${eventyType} ${value}${details.length ? ':' : ''}`}
					</span>

					{value === UploadStatus.ERROR && details.length === 1 && (
						<span
							css={css`
								display: inline-block;
								margin-left: 105px;
								white-space: normal;
								color: ${theme.colors.error_dark};
							`}
						>
							{details[0]}
						</span>
					)}
					{value === UploadStatus.ERROR && details.length > 1 && (
						<Details
							summary={`Found ${details.length} details`}
							style={css`
								margin-left: 105px;
								color: ${theme.colors.error_dark};
							`}
						>
							<ol
								css={css`
									display: inline-block;
									white-space: pre-line;
									color: ${theme.colors.error_dark};
								`}
							>
								{details.map((e, i) => (
									<li key={`error-${i}-${systemId}`}>{e}</li>
								))}
							</ol>
						</Details>
					)}
					{value !== UploadStatus.ERROR && details.length > 1 && (
						<Details
							summary={`Found ${details.length} details`}
							style={css`
								margin-left: 130px;
								color: ${theme.colors.success_dark};
							`}
						>
							<ol
								css={css`
									display: inline-block;
									white-space: pre-line;
									color: ${theme.colors.success_dark};
								`}
							>
								{details.map((e, i) => (
									<li key={`details-${i}-${systemId}`}>{e}</li>
								))}
							</ol>
						</Details>
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
