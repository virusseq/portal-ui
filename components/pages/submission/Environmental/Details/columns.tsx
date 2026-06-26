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
import { RecordValidationErrorDetails, UpdateDetails, UploadData } from '#global/hooks/useEnvironmentalData';

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
		case UploadStatus.INCOMPLETE:
			return <Warning size={12} />;

		default:
			return <Ellipsis size={12} />;
	}
};

/**
 * Type guard to check if a detail is of type RecordValidationErrorDetails
 */
const isRecordValidationErrorDetails = (
	detail: RecordValidationErrorDetails | UpdateDetails,
): detail is RecordValidationErrorDetails => {
	return typeof detail === 'object' && detail !== null && 'field' in detail && 'issue' in detail;
};

/**
 * Type guard to check if a detail is of type UpdateDetails
 */
const isUpdateDetails = (detail: RecordValidationErrorDetails | UpdateDetails): detail is UpdateDetails => {
	return typeof detail === 'object' && detail !== null && 'old' in detail && 'new' in detail;
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
		accessor: 'originalFilePair',
		Header: 'File name',
		sortType: uuidSort,
	},
	{
		accessor: 'status',
		Cell: ({ row, value }: { row: Row<UploadData>; value: UploadStatus }): ReactElement => {
			const { details, systemId, eventType } = row.original;
			const errorDetails = details.filter(isRecordValidationErrorDetails);
			const updateDetails = details.filter(isUpdateDetails);

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
						{`${eventType} ${value}${details.length ? ': ' : ''}`}
					</span>

					{value === UploadStatus.ERROR && errorDetails.length > 0 ? (
						<Details
							summary={`Found ${errorDetails.length} issue${errorDetails.length > 1 ? 's' : ''}`}
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
								{errorDetails.map((error, index) => (
									<li
										key={`error-${index}-${systemId}`}
										css={css`
											margin-bottom: 10px;
										`}
									>
										<strong>Field:</strong> {error.field}
										<br />
										<strong>Issue:</strong> {error.issue}
										{error.value ? (
											<>
												<br />
												<strong>Value:</strong> {error.value}
											</>
										) : null}
									</li>
								))}
							</ol>
						</Details>
					) : value !== UploadStatus.ERROR && updateDetails.length > 0 ? (
						<Details
							summary={`Found ${updateDetails.length} detail${updateDetails.length > 1 ? 's' : ''}`}
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
								{updateDetails.map((detail, i) => (
									<li key={`details-${i}-${systemId}`}>
										<strong>Old:</strong> {JSON.stringify(detail.old)}
										<br />
										<strong>New:</strong> {JSON.stringify(detail.new)}
									</li>
								))}
							</ol>
						</Details>
					) : null}
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
