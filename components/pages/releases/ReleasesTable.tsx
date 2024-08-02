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

import { ChangeEventHandler, ComponentProps, ReactElement, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import axios from 'axios';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import urlJoin from 'url-join';
import 'react-datepicker/dist/react-datepicker.css';

import { UnStyledButton } from '@/components/Button';
import GenericTable from '@/components/GenericTable';
import defaultTheme from '@/components/theme';
import { getConfig } from '@/global/config';

import columns from './columns';
import {
	ArchivesFetchReq,
	ArchivesFetchReqSort,
	ArchivesFetchRes,
	ArchivesSortFields,
} from './types';

function dateToEpochSec(date: Date | undefined) {
	if (!date) return undefined;
	return Math.round(date.getTime() / 1000);
}

function isValidSortField(columnName: string): columnName is ArchivesSortFields {
	return [
		'numOfSamples',
		'releaseTimeUntil',
		'totalSubmitted',
		'totalSupressed',
		'totalUpdated',
	].includes(columnName);
}

function getFirstDefined<T>(...os: T[]): T | undefined {
	return os.find((o) => o !== undefined && o !== null && !Number.isNaN(o));
}

const PageButton = ({
	direction,
	onClick,
	disabled,
}: {
	direction: 'LEFT' | 'DOUBLE_LEFT' | 'RIGHT' | 'DOUBLE_RIGHT';
	onClick: any;
	disabled: boolean | undefined;
}) => {
	return (
		<UnStyledButton
			onClick={onClick}
			disabled={disabled}
			css={css`
				cursor: ${disabled ? 'default' : undefined};
				color: ${disabled ? defaultTheme.colors.grey_6 : defaultTheme.colors.primary};
				font-size: 18px;
				${defaultTheme.typography.baseFont}
			`}
		>
			{direction === 'LEFT' && '‹'}
			{direction === 'DOUBLE_LEFT' && '«'}
			{direction === 'RIGHT' && '›'}
			{direction === 'DOUBLE_RIGHT' && '»'}
		</UnStyledButton>
	);
};

const PageNumber = ({ num }: { num: number }) => {
	return (
		<span
			css={css`
				font-size: 14px;
				text-align: center;
				width: 14px;
				height: 14px;
				border-radius: 50%;
				padding: 3px 4px 5px 4px;
				background-color: ${defaultTheme.colors.grey_1};
				${defaultTheme.typography.baseFont};
			`}
		>
			{num}
		</span>
	);
};

const EARLIEST_ARCHIVES_FROM = new Date('2021/1/1');
const LATEST_ARCHIVES_TO = new Date();

const StyledDatePicker = ({
	onChange,
	selected,
	minDate,
	maxDate,
}: Pick<ReactDatePickerProps, 'onChange' | 'selected' | 'minDate' | 'maxDate'>) => {
	return (
		<DatePicker
			css={css`
				${defaultTheme.typography.baseFont};
				font-size: 12px;
				border-radius: 5px;
				border: solid 1px ${defaultTheme.colors.grey_5};
				text-align: center;
				padding: 5px 0px 5px 0px;
				width: 100px;
			`}
			dateFormat="yyyy/MM/dd"
			placeholderText="YYYY/MM/DD"
			selected={selected}
			onChange={onChange}
			minDate={minDate}
			maxDate={maxDate}
		/>
	);
};

const ReleasesTable = (): ReactElement => {
	const { NEXT_PUBLIC_PORTAL_API_URL } = getConfig();
	const [tableData, setTableData] = useState<ArchivesFetchRes>();
	const [archivesAfter, setArchivesAfter] = useState<Date>(EARLIEST_ARCHIVES_FROM);
	const [archivesBefore, setArchiveBefore] = useState<Date>(LATEST_ARCHIVES_TO);
	const [sort, setSort] = useState<ArchivesFetchReqSort>({
		sortDirection: 'DESC',
		sortFieldName: 'releaseTimeUntil',
	});

	const getReleaseData = async (params: ArchivesFetchReq) => {
		const { data } = await axios.get(urlJoin(NEXT_PUBLIC_PORTAL_API_URL, 'changelog'), {
			params,
		});
		const { page = 0, totalPages = 0 } = data;

		return {
			...data,
			first: page === 0,
			last: page === totalPages - 1,
			size: Number(data.size),
			totalReleases: Number(data.totalReleases),
		};
	};

	const updateData = (req: ArchivesFetchReq) => {
		const mergedReq = {
			createdBefore: getFirstDefined(
				req.createdBefore,
				dateToEpochSec(archivesBefore),
				dateToEpochSec(LATEST_ARCHIVES_TO),
			),
			createdAfter: getFirstDefined(
				req.createdAfter,
				dateToEpochSec(archivesAfter),
				dateToEpochSec(EARLIEST_ARCHIVES_FROM),
			),
			sortDirection: getFirstDefined(req.sortDirection, sort.sortDirection, 'DESC'),
			sortFieldName: getFirstDefined(req.sortFieldName, sort.sortFieldName, 'releaseTimeUntil'),
			size: getFirstDefined(req.size, tableData?.size, 20),
			page: getFirstDefined(req.page, tableData?.page, 0),
		};

		getReleaseData(mergedReq)
			.then(setTableData)
			.catch((err) => {
				console.log(err);
				console.error('Something went wrong retrieving release data');
			});
	};

	useEffect(() => {
		updateData({});
	}, []);

	const updatePageSize: ChangeEventHandler<any> = (e) => {
		const size = Number(e.target.value);
		if (isNaN(size)) return;
		updateData({ size });
	};

	const goToFirstPage = () => {
		if (tableData?.first) return;
		updateData({ page: 0 });
	};

	const goToPrevPage = () => {
		if (tableData?.first || tableData?.page === undefined) return;
		updateData({ page: tableData.page - 1 });
	};

	const goToNextPage = () => {
		if (tableData?.last || tableData?.page === undefined) return;

		updateData({ page: tableData.page + 1 });
	};

	const goToLastPage = () => {
		if (tableData?.last || tableData?.totalPages === undefined) return;
		updateData({ page: tableData.totalPages - 1 });
	};

	const updateFromDate = (date: Date) => {
		date = date || archivesAfter;
		date.setHours(0, 0, 0, 0); // set time to start of day
		setArchivesAfter(date);
		updateData({
			createdAfter: dateToEpochSec(date),
		});
	};

	const updateToDate = (date: Date) => {
		date = date || archivesBefore;
		date.setHours(23, 59, 59, 999); // set time to end of day
		setArchiveBefore(date);
		updateData({
			createdBefore: dateToEpochSec(date),
		});
	};

	const updateSort: ComponentProps<typeof GenericTable>['onSortsChange'] = ([sort]) => {
		if (!sort || !isValidSortField(sort.id)) {
			return;
		}
		const updatedSort: ArchivesFetchReqSort = {
			sortDirection: sort.desc ? 'DESC' : 'ASC',
			sortFieldName: sort.id,
		};
		setSort(updatedSort);
		updateData({ ...updatedSort });
	};

	const offset = (Number(tableData?.size) || 0) * (Number(tableData?.page) || 0);

	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				row-gap: 10px;
			`}
		>
			<div
				css={css`
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 12px;
				`}
			>
				<span>
					{tableData?.totalReleases ? (
						<>
							{offset + 1} to{' '}
							{offset +
								(Math.min(Number(tableData?.size), (tableData?.totalReleases || 0) - offset) ||
									0)}{' '}
							of {tableData?.totalReleases}
						</>
					) : (
						0
					)}
					{' Data Releases'}
				</span>

				<div
					css={css`
						display: flex;
						align-items: center;
						column-gap: 5px;
						> * {
							flex-shrink: 0;
							width: auto;
						}
					`}
				>
					<span>Filter by Date:</span>

					<StyledDatePicker
						onChange={updateFromDate}
						selected={archivesAfter}
						minDate={EARLIEST_ARCHIVES_FROM}
						maxDate={archivesBefore}
					/>

					<span>to</span>

					<StyledDatePicker
						onChange={updateToDate}
						selected={archivesBefore}
						minDate={archivesAfter}
						maxDate={LATEST_ARCHIVES_TO}
					/>
				</div>
			</div>

			<GenericTable
				columns={columns}
				data={tableData?.releases || []}
				onSortsChange={updateSort}
				options={{
					getRowId: (row) => row.id as string,
				}}
				sortable={true}
			/>

			<div
				css={css`
					display: flex;
					justify-content: space-between;
				`}
			>
				<div>
					Show{' '}
					<select value={tableData?.size || 20} onChange={updatePageSize}>
						{[5, 10, 20, 30, 40, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								{pageSize}
							</option>
						))}
					</select>{' '}
					rows{' '}
				</div>

				<div
					css={css`
						display: inline-flex;
						align-items: center;
						column-gap: 10px;
					`}
				>
					<PageButton
						direction={'DOUBLE_LEFT'}
						onClick={goToFirstPage}
						disabled={tableData?.first}
					/>
					<PageButton direction={'LEFT'} onClick={goToPrevPage} disabled={tableData?.first} />
					<PageNumber num={tableData?.page ? tableData?.page + 1 : 1} />
					<PageButton direction={'RIGHT'} onClick={goToNextPage} disabled={tableData?.last} />
					<PageButton
						direction={'DOUBLE_RIGHT'}
						onClick={goToLastPage}
						disabled={tableData?.last}
					/>
				</div>
			</div>
		</div>
	);
};

export default ReleasesTable;
