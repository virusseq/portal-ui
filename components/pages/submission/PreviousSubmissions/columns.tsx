import { Column } from "react-table";

import getInternalLink from "../../../../global/utils/getInternalLink";
import StyledLink from '../../../Link';

const columnData: Column<{}>[] = [
  {
    accessor: 'submissionId',
    Cell: ({ value }: { value: string }) => (
      <StyledLink href={getInternalLink({ path: `/submission/${value}`})}>
        {value}
      </StyledLink>
    ),
    Header: 'Submission ID',
  },
  {
    accessor: 'studyId',
    Header: 'Study ID',
  },
  {
    accessor: 'createdAt',
    Cell: ({ value }: { value: number}) => (
      value && new Date(
        new Date(value * 1000).toUTCString()
      ).toISOString().slice(0, 10)
    ),
    Header: 'Submission Date',
  },
  {
    accessor: 'totalRecords',
    Header: '# Viral Genomes',
  },
];

export default columnData;