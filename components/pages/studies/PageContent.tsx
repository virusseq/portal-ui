import { css } from '@emotion/react';
import React from 'react';
import { Column } from 'react-table';
import Button, { UnStyledButton } from '../../Button';
import GenericTable from '../../GenericTable';
import { Bin } from '../../theme/icons';
import defaultTheme from '../../theme/index';

const dummyData = [
  {
    studyId: 'COVID-PR',
    name: 'COVID-PR',
    organization: '"Institute of PRs"',
    description: '"Description for COVID-PR"',
    users: [
      {
        name: 'submitter6@example.com',
        email: 'submitter6@example.com',
        status: 'APPROVED',
      },
    ],
  },
  {
    studyId: 'TEST-CA',
    name: 'TEST-CA',
    organization: '"Institute of Tests"',
    description: '"Description for TEST-CA"',
    users: [
      {
        name: 'submitter2@example.com',
        email: 'submitter2@example.com',
        status: 'APPROVED',
      },
      {
        name: 'submitter1@example.com',
        email: 'submitter1@example.com',
        status: 'APPROVED',
      },
      {
        name: 'submitter3@example.com',
        email: 'submitter3@example.com',
        status: 'APPROVED',
      },
    ],
  },
  {
    studyId: 'DASH-CA',
    name: 'DASH-CA',
    organization: '"Institute of Dashs"',
    description: '"Description for DASH-CA"',
    users: [
      {
        name: 'submitter5@example.com',
        email: 'submitter5@example.com',
        status: 'APPROVED',
      },
      {
        name: 'submitter4@example.com',
        email: 'submitter4@example.com',
        status: 'APPROVED',
      },
    ],
  },
];

const handleRemove = () => {
  alert('NOT IMPLEMENTATION YET!');
};

const columnData: Column<Record<string, unknown>>[] = [
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
    accessor: 'users',
    Header: 'Data Submitters',
    Cell: ({ value }: { value: any[] }) =>
      value ? (
        <div
          css={css`
            margin-left: -10px;
            margin-right: -10px;
          `}
        >
          {value.map(({ email }, i) => (
            <div
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
                {email}
              </div>

              <UnStyledButton
                onClick={handleRemove}
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
      ) : null,
  },
];

const PageContent = () => {
  return (
    <div
      css={css`
        display: flex;
        margin: 60px;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 30px;
          padding: 20px 0px;
          border-bottom: solid 1px ${defaultTheme.colors.grey_4};
        `}
      >
        <div
          css={css`
            //   ${defaultTheme.typography.heading}
            font-size: 26px;
            line-height: 1.38;
            color: #28519d;
          `}
        >
          Manage Studies
        </div>
        <div>
          <Button
            css={css`
              margin-right: 20px;
            `}
          >
            Create a Study
          </Button>
          <Button>Add Data Submitters</Button>
        </div>
      </div>
      <GenericTable columns={columnData} data={dummyData} />
    </div>
  );
};

export default PageContent;
