import { Column } from 'react-table';

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
    accessor: 'studyId',
    Header: 'Study ID',
  },
  {
    accessor: 'createdAt',
    Cell: ({ value }: { value: number }) =>
      value && new Date(new Date(value * 1000).toUTCString()).toISOString().slice(0, 10),
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
