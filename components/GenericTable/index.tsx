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

import { ReactElement, useEffect, useMemo } from 'react';
import { Column, useSortBy, useTable, SortingRule } from 'react-table';
import { css, useTheme, SerializedStyles } from '@emotion/react';
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
  onSortsChange?: (s: Array<SortingRule<unknown>>) => void;
  style?: SerializedStyles;
};

const GenericTable = ({
  caption,
  columns,
  data,
  pageable,
  sortable,
  style,
  onSortsChange,
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state } = useTable(
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
      manualSortBy: typeof onSortsChange === 'function' ? true : false,
    },
    useSortBy,
    // usePagination,
  );

  useEffect(() => {
    if (typeof onSortsChange === 'function') {
      onSortsChange(state.sortBy);
    }
  }, [state.sortBy]);

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
