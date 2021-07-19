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
          <b>⤓Download Dataset</b>
        </StyledLink>
      );
    },
  },
  {
    accessor: 'numOfSamples',
    Header: '# of samples',
  },
];

const earliestRelease = 1626373700;
const nowEpoch = Math.round(new Date().getTime() / 1000);

type FilterDates = { fromCreateTimeEpoch: number | -1; toCreateTimeEpoch: number | -1 };

const ArchivesTable = (): ReactElement => {
  const { fetchReleaseInfo } = useSingularityData();

  const [tableData, setTableData] = useState<ArchivesFetchRes>();
  const [filterDates, setFilterDates] = useState<FilterDates>({
    fromCreateTimeEpoch: earliestRelease,
    toCreateTimeEpoch: nowEpoch,
  });

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

  const updateFromDate: ChangeEventHandler<any> = (e) => {
    try {
      const { value } = e.target;
      const epochSecs = new Date(value).valueOf() / 1000;
      console.log(epochSecs);
      const updatedFilterDates: FilterDates = { ...filterDates, fromCreateTimeEpoch: epochSecs };
      setFilterDates(updatedFilterDates);
      updateData({ ...updatedFilterDates });
    } catch (e) {
      console.error(e);
    }
  };

  const updateToDate: ChangeEventHandler<any> = (e) => {
    try {
      const { value } = e.target;
      const epochSecs = new Date(value).valueOf() / 1000;
      console.log(epochSecs);
      const updatedFilterDates: FilterDates = { ...filterDates, toCreateTimeEpoch: epochSecs };
      setFilterDates(updatedFilterDates);
      updateData({ ...updatedFilterDates });
    } catch (e) {
      console.error(e);
    }
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
          <input type="date" id="fromDate" onChange={updateFromDate} />
          <span>to</span>
          <input type="date" id="toDate" onChange={updateToDate} />
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
            column-gap: 10px;
          `}
        >
          <UnStyledButton onClick={goToFirstPage} disabled={tableData?.first}>
            {'<<'}
          </UnStyledButton>
          <UnStyledButton onClick={goToPrevPage} disabled={tableData?.first}>
            {'<'}
          </UnStyledButton>
          <span>{tableData?.number ? tableData?.number + 1 : 1}</span>
          <UnStyledButton onClick={goToNextPage} disabled={tableData?.last}>
            {'>'}
          </UnStyledButton>
          <UnStyledButton onClick={goToLastPage} disabled={tableData?.last}>
            {'>>'}
          </UnStyledButton>
        </div>
      </div>
    </div>
  );
};

export default ArchivesTable;
