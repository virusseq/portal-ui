import React, { ReactElement } from 'react';
import { css } from '@emotion/react';
import defaultTheme from '../../theme/index';
import { Column } from 'react-table';
import GenericTable from '../../GenericTable';

const getTableStyle = (theme: typeof defaultTheme) => css`
  & tbody {
    tr td {
      vertical-align: top;
      text-align: left;
      border-top: 1px solid ${theme.colors.accent};
    }
  }
`;

const columnData = (): Column<Record<string, unknown>>[] => [
  {
    accessor: 'createdAt',
    Header: 'Release Date',
  },
  {
    accessor: 'objectId',
    Header: 'Metadata & Consensus Seq Files',
  },
  {
    accessor: 'numOfSamples',
    Header: '# of samples',
  },
];

const tableData = [
  { createdAt: 1, numOfSamples: 123, objectId: 'asdf-asdf-asdf', id: 'asdf-123' },
  { createdAt: 2, numOfSamples: 123, objectId: 'asdf-asdf-asdf', id: 'asdf-123' },
];

const NOOP = () => {};

const ArchivesTable = (): ReactElement => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 10px;
      `}
    >
      <GenericTable
        style={getTableStyle(defaultTheme)}
        columns={columnData()}
        data={tableData}
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
          <select value={10} onChange={NOOP}>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>{' '}
          rows{' '}
        </div>
        <div>
          <button onClick={NOOP} disabled={false}>
            {'<<'}
          </button>{' '}
          <button onClick={NOOP} disabled={false}>
            {'<'}
          </button>{' '}
          1{' '}
          <button onClick={NOOP} disabled={false}>
            {'>'}
          </button>{' '}
          <button onClick={NOOP} disabled={false}>
            {'>>'}
          </button>{' '}
        </div>
      </div>
    </div>
  );
};

export default ArchivesTable;
