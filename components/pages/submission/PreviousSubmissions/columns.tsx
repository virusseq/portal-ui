import { Column } from 'react-table';
import { format } from 'date-fns';
import { css } from '@emotion/react';

import getInternalLink from '../../../../global/utils/getInternalLink';
import { numberSort, uuidSort } from '../../../GenericTable/helpers';
import StyledLink from '../../../Link';

const columnData: Column<Record<string, unknown>>[] = [
  {
    accessor: 'submissionId',
    Cell: ({ value }: { value: string }) => (
      <StyledLink href={getInternalLink({ path: `/submission/${value}` })}>{value}</StyledLink>
    ),
    Header: 'Submission ID',
    sortType: uuidSort,
  },
  {
    accessor: 'studyIds',
    Cell: ({ value }: { value: string[] }) =>
      value ? (
        <ul
          css={css`
            margin: 0;
            padding-left: 15px;
          `}
        >
          {value.map((id) => (
            <li key={id}>{id}</li>
          ))}
        </ul>
      ) : null,
    Header: 'Study IDs',
  },
  {
    accessor: 'createdAt',
    Cell: ({ value }: { value: number }) => format(new Date(value), 'yyyy-MM-dd'),
    Header: 'Submission Date',
    sortType: numberSort,
  },
  {
    accessor: 'totalRecords',
    Header: '# Viral Genomes',
    sortType: numberSort,
  },
];

export default columnData;
