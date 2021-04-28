import { ReactElement, useMemo } from 'react';
import { Column, useSortBy, usePagination, useTable } from 'react-table';
import { css, SerializedStyles } from '@emotion/react';
import { useTheme } from '@emotion/react';
import cx from 'classnames';

import defaultTheme from '../theme';

type GenericTableProps = {
  caption?: string;
  columns: Column<Record<string, unknown>>[];
  data: Record<string, unknown>[];
  loader?: React.ReactNode;
  loading?: boolean;
  pageable?: boolean;
  sortable?:
    | {
        defaultSortBy?: [
          {
            desc?: boolean;
            id: string;
          },
        ];
        sortType?: string;
      }
    | boolean;
  style?: SerializedStyles;
};

const GenericTable = ({
  caption,
  columns,
  data,
  pageable,
  sortable,
  style,
}: GenericTableProps): ReactElement => {
  const theme: typeof defaultTheme = useTheme();
  const memoisedColumns = useMemo(() => columns, []);
  // const memoisedData = useMemo(() => data, []);
  const sortBy = useMemo(
    () =>
      typeof sortable !== 'boolean' && sortable?.defaultSortBy
        ? { sortBy: sortable.defaultSortBy }
        : {},
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      autoResetSortBy: false,
      columns: memoisedColumns,
      data,
      defaultCanSort: !!sortable,
      disableSortBy: !sortable,
      disableSortRemove: true,
      initialState: {
        ...sortBy,
      },
    },
    useSortBy,
    // usePagination,
  );

  return (
    <table
      {...getTableProps()}
      className={cx(!!sortable && 'sortable', !!pageable && 'pageable')}
      css={css`
        border: 1px solid ${theme.colors.grey_4};
        border-spacing: 0;
        width: 100%;

        caption {
          display: none;
        }

        th {
          border-width: 3px 0;
          height: 30px;
          user-select: none;

          &.sorted {
            border-color: transparent;
            border-style: solid;

            &.asc {
              border-top-color: grey;
            }

            &.desc {
              border-bottom-color: grey;
            }
          }
        }

        td,
        th {
          box-sizing: border-box;
          font-size: 13px;
          padding: 3px 10px;
          text-align: left;
          white-space: nowrap;

          &:not(:first-of-type) {
            border-left: 1px solid ${theme.colors.grey_4} !important;
          }
        }

        tbody {
          tr:first-of-type td {
            border-top: 1px solid ${theme.colors.grey_4};
          }

          tr:nth-of-type(even) {
            background: ${theme.colors.grey_1};
          }
        }

        ${style}
      `}
    >
      {caption && <caption>{caption}</caption>}

      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                className={cx(
                  `tableColumnHeader-${column.id}`,
                  column.isSorted && ['sorted', column.isSortedDesc ? 'desc' : 'asc'],
                )}
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);

          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} className={`tableBodyCell-${cell.column.id}`}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default GenericTable;
