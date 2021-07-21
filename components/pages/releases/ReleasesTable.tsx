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

import { ChangeEventHandler, ReactElement, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Column } from 'react-table';
import GenericTable from '../../GenericTable';
import { UnStyledButton } from '../../Button';
import useSingularityData, {
  ArchivesFetchRes,
  ArchviesFetchReq,
} from '../../../global/hooks/useSingularityData';
import { format } from 'date-fns';
import StyledLink from '../../Link';
import defaultTheme from '../../theme/index';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Download } from '../../theme/icons';

function dateToEpochSec(date: Date | undefined) {
  if (!date) return undefined;
  return Math.round(date.getTime() / 1000);
}

const columnData = (): Column<Record<string, unknown>>[] => [
  {
    accessor: 'createdAt',
    Header: 'Release Date',
    Cell: ({ value }: { value: number }) => {
      const date = new Date(0);
      date.setUTCSeconds(value);

      return <b>{format(date, 'LLLL d, yyyy h:m aaaa')}</b>;
    },
  },
  {
    accessor: 'objectId',
    Header: 'Metadata & Consensus Seq Files',
    Cell: ({ value }: { value: string }) => {
      const link = 'TBD';
      return (
        <StyledLink>
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
        width: 80px;
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

const ArchivesTable = (): ReactElement => {
  const { fetchCompletedArchvieAllInfos: fetchReleaseInfo } = useSingularityData();

  const [tableData, setTableData] = useState<ArchivesFetchRes>();
  const [archivesFrom, setArchivesFrom] = useState<Date>();
  const [archivesTo, setArchiveTo] = useState<Date>();

  const updateData = (req: ArchviesFetchReq) => {
    fetchReleaseInfo(req).then(setTableData);
  };

  useEffect(() => {
    fetchReleaseInfo().then(setTableData);
  }, []);

  const updatePageSize: ChangeEventHandler<any> = (e) => {
    const size = e.target.value as number;
    if (isNaN(size)) return;
    updateData({ page: 0, size });
  };

  const goToFirstPage = () => {
    console.log(tableData);
    if (tableData?.first) return;
    updateData({ page: 0, size: tableData?.size || 10 });
  };

  const goToPrevPage = () => {
    console.log(tableData);
    if (tableData?.first || tableData?.number === undefined) return;
    updateData({ page: tableData.number - 1, size: tableData?.size || 10 });
  };

  const goToNextPage = () => {
    console.log(tableData);
    if (tableData?.last || tableData?.number === undefined) return;

    updateData({ page: tableData.number + 1, size: tableData?.size || 10 });
  };

  const goToLastPage = () => {
    console.log(tableData);
    if (tableData?.last || tableData?.totalPages === undefined) return;
    updateData({ page: tableData.totalPages - 1, size: tableData?.size || 10 });
  };

  const updateFromDate = (date: Date) => {
    date.setHours(0, 0, 0, 0); // set time to start of day
    setArchivesFrom(date);
    const updatedFilterDates = {
      createdBeforeEpochSec: dateToEpochSec(archivesTo),
      createdAfterEpochSec: dateToEpochSec(date),
    };
    updateData(updatedFilterDates);
  };

  const updateToDate = (date: Date) => {
    date.setHours(23, 59, 59, 999); // set time to end of day
    setArchiveTo(date);
    const updatedFilterDates = {
      createdBeforeEpochSec: dateToEpochSec(date),
      createdAfterEpochSec: dateToEpochSec(archivesFrom),
    };
    updateData(updatedFilterDates);
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
            selected={archivesFrom}
            minDate={new Date('2021/1/1')}
            maxDate={archivesTo}
          />
          <span>to</span>
          <StyledDatePicker
            onChange={updateToDate}
            selected={archivesTo}
            minDate={archivesFrom}
            maxDate={new Date()}
          />
        </div>
      </div>
      <GenericTable
        columns={columnData()}
        data={tableData?.content || []}
        pageable={true}
        sortable={{
          defaultSortBy: [
            {
              id: 'createAt',
            },
          ],
        }}
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
            {[1, 10, 20, 30, 40, 50].map((pageSize) => (
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
