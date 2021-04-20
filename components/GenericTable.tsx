import { useTable, Column } from "react-table";
import { css, SerializedStyles } from '@emotion/core';

type GenericTableProps = {
  caption?: string,
  columns: Column<{}>[],
  data?: any,
  style?: SerializedStyles,
}

const GenericTable = ({
  caption,
  columns,
  data,
  style,
}: GenericTableProps) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <table
      {...getTableProps()}
      css={theme => css`
        border: 1px solid ${theme.colors.grey_4};
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;

        caption {
          display: none;
        }

        tbody {
          max-height: 700px;
          overflow: auto;

          tr:nth-of-type(even) {
            background: ${theme.colors.grey_1};
          }
        }

        thead tr {
          border-bottom: 1px solid ${theme.colors.grey_4};
        }

        td,
        th {
          border-left: 1px solid ${theme.colors.grey_4};
          box-sizing: border-box;
          font-size: 13px;
          
          padding: 3px 10px;
          text-align: left;
          white-space: nowrap;
        }

        .col-date {
          width: 120px;
        }

        .col-genomes {
          width: 115px;
        }

        ${style}
      `}
    >
      {caption && <caption>{caption}</caption>}

      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} className={`tableColumnHeader-${column.id}`}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
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