import { css } from '@emotion/react';
import React from 'react';
import { Column } from 'react-table';
import { UnStyledButton } from '../../Button';
import GenericTable from '../../GenericTable';
import { Bin } from '../../theme/icons';
import defaultTheme from '../../theme/index';
import { DeleteRow, Study } from './types';

const columnData = (
  deleteFuncGenerator: ({ email, studyId }: any) => () => void,
): Column<Record<string, unknown>>[] => [
  {
    accessor: 'studyId',
    Header: 'Study ID',
  },
  {
    accessor: 'organization',
    Header: 'Organization',
  },
  {
    accessor: 'name',
    Header: 'Study Name',
  },
  {
    accessor: 'description',
    Header: 'Description',
  },
  {
    accessor: (row) => {
      const studyId = row.studyId;
      return (row as Study).submitters?.map((s) => ({ studyId, submitter: s }));
    },
    Header: 'Data Submitters',
    Cell: ({ value }: { value: DeleteRow[] }) => {
      return Array.isArray(value) ? (
        <div
          css={css`
            margin-left: -10px;
            margin-right: -10px;
          `}
        >
          {value.map((v, i) => (
            <div
              key={i}
              css={css`
                display: flex;
                justify-content: space-between;
                ${i < value.length - 1
                  ? `border-bottom: solid 1px ${defaultTheme.colors.grey_4};`
                  : ''};
              `}
            >
              <div
                css={css`
                  margin-top: 5px;
                  margin-bottom: 5px;
                  margin-left: 15px;
                `}
              >
                {v.submitter}
              </div>

              <UnStyledButton
                onClick={deleteFuncGenerator(v)}
                css={css`
                  margin-top: 5px;
                  margin-bottom: 5px;
                  margin-right: 15px;
                `}
              >
                <Bin />
              </UnStyledButton>
            </div>
          ))}
        </div>
      ) : null;
    },
  },
];

const StudiesTable = ({ tableDeleteButtonFunc, tableData }: any) => {
  return <GenericTable columns={columnData(tableDeleteButtonFunc)} data={tableData} />;
};

export default StudiesTable;
