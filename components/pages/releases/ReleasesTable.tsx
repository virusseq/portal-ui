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

import React, {
  ChangeEventHandler,
  ComponentProps,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { css } from '@emotion/react';
import { Column } from 'react-table';
import GenericTable from '../../GenericTable';
import { UnStyledButton } from '../../Button';
import useSingularityData, {
  ArchivesFetchRes,
  ArchivesSortFields,
  ArchivesFetchReq,
} from '../../../global/hooks/useSingularityData';
import { format } from 'date-fns';
import StyledLink from '../../Link';
import defaultTheme from '../../theme/index';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import urlJoin from 'url-join';
import 'react-datepicker/dist/react-datepicker.css';
import { Download } from '../../theme/icons';
import { getConfig } from '../../../global/config';

const { NEXT_PUBLIC_SINGULARITY_API_URL } = getConfig();

function dateToEpochSec(date: Date | undefined) {
  if (!date) return undefined;
  return Math.round(date.getTime() / 1000);
}

function isValidSortField(s: unknown): s is ArchivesSortFields {
  return s === 'createdAt' || s === 'numOfSamples';
}

function getFirstDefined<T>(...os: T[]): T | undefined {
  return os.find((o) => o !== undefined && o !== null && !Number.isNaN(Number(o)));
}

const columnData = (): Column<Record<string, unknown>>[] => [
  {
    accessor: 'createdAt',
    Header: 'Release Date',
    Cell: ({ value }: { value: number }) => {
      const date = new Date(0);
      date.setUTCSeconds(value);

      return <b>{format(date, 'LLLL d, yyyy h:mm aaaa')}</b>;
    },
  },
  {
    accessor: 'id',
    Header: 'Metadata & Consensus Seq Files',
    Cell: ({ value }: { value: string }) => {
      return (
        <StyledLink
          onClick={() => {
            if (NEXT_PUBLIC_SINGULARITY_API_URL && value) {
              window.location.assign(
                urlJoin(NEXT_PUBLIC_SINGULARITY_API_URL, '/download/archive/', value as string),
              );
            }
          }}
        >
          <div
            css={css`
              display: flex;
              column-gap: 5px;
              align-items: center;
            `}
          >
            <Download />
            <b>Download Dataset</b>
          </div>
        </StyledLink>
      );
    },
    disableSortBy: true,
  },
  {
    accessor: 'numOfSamples',
    Header: '# of samples',
  },
];

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
type ArchivesFetchReqSort = Pick<ArchivesFetchReq, 'sortDirection' | 'sortField'>;
const ArchivesTable = (): ReactElement => {
  const { fetchCompletedArchiveAllInfos } = useSingularityData();

  const [tableData, setTableData] = useState<ArchivesFetchRes>();
  const [archivesAfter, setArchivesAfter] = useState<Date>(EARLIEST_ARCHIVES_FROM);
  const [archivesBefore, setArchiveBefore] = useState<Date>(LATEST_ARCHIVES_TO);
  const [sort, setSort] = useState<ArchivesFetchReqSort>({
    sortDirection: 'DESC',
    sortField: 'createdAt',
  });

  const updateData = (req: ArchivesFetchReq) => {
    const mergedReq = {
      createdBeforeEpochSec: getFirstDefined(
        req.createdBeforeEpochSec,
        dateToEpochSec(archivesBefore),
        dateToEpochSec(LATEST_ARCHIVES_TO),
      ),
      createdAfterEpochSec: getFirstDefined(
        req.createdAfterEpochSec,
        dateToEpochSec(archivesAfter),
        dateToEpochSec(EARLIEST_ARCHIVES_FROM),
      ),
      sortDirection: getFirstDefined(req.sortDirection, sort.sortDirection, 'DESC'),
      sortField: getFirstDefined(req.sortField, sort.sortField, 'createdAt'),
      size: getFirstDefined(req.size, tableData?.size, 20),
      page: getFirstDefined(req.page, tableData?.number, 0),
    };

    fetchCompletedArchiveAllInfos(mergedReq).then(setTableData);
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
    if (tableData?.first || tableData?.number === undefined) return;
    updateData({ page: tableData.number - 1 });
  };

  const goToNextPage = () => {
    if (tableData?.last || tableData?.number === undefined) return;

    updateData({ page: tableData.number + 1 });
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
      createdAfterEpochSec: dateToEpochSec(date),
    });
  };

  const updateToDate = (date: Date) => {
    date = date || archivesBefore;
    date.setHours(23, 59, 59, 999); // set time to end of day
    setArchiveBefore(date);
    updateData({
      createdBeforeEpochSec: dateToEpochSec(date),
    });
  };

  const updateSort: ComponentProps<typeof GenericTable>['onSortsChange'] = ([sort]) => {
    if (!sort || !isValidSortField(sort.id)) {
      return;
    }
    const updatedSort: ArchivesFetchReqSort = {
      sortDirection: sort.desc ? 'DESC' : 'ASC',
      sortField: sort.id,
    };
    setSort(updatedSort);
    updateData({ ...updatedSort });
  };

  const offset = (tableData?.size || 0) * (tableData?.number || 0);

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
          {offset + 1}-{offset + (tableData?.numberOfElements || 0)} of {tableData?.totalElements}{' '}
          Data Releases
        </span>
        <div
          css={css`
            display: flex;
            align-items: center;
            column-gap: 5px;
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
        columns={columnData()}
        data={tableData?.content || []}
        sortable={true}
        onSortsChange={updateSort}
      />
      <div
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <div>
          Show{' '}
          <select value={tableData?.size || 1} onChange={updatePageSize}>
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
          <PageNumber num={tableData?.number ? tableData?.number + 1 : 1} />
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

export default ArchivesTable;
