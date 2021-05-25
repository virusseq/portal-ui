import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { create } from 'lodash';
import { table } from 'node:console';
import React, { useEffect, useState } from 'react';
import { Column } from 'react-table';
import useStudiesSvcData from '../../../global/hooks/useStudiesSvcData';
import { CreateStudyBody } from '../../../global/hooks/useStudiesSvcData/types';
import Button, { UnStyledButton } from '../../Button';
import GenericTable from '../../GenericTable';
import { Bin } from '../../theme/icons';
import defaultTheme from '../../theme/index';
import AddSubmitterModal from './modals/AddSubmittersModal';
import CreateStudyModal from './modals/CreateStudyModal';
import DeleteSubmitterModal from './modals/DeleteSubmitterModal';

type Study = {
  studyName: string;
  studyId: string;
  organization: string;
  description: string;
  emailAddresses: string[];
};

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
    accessor: 'studyName',
    Header: 'Study Name',
  },
  {
    accessor: 'description',
    Header: 'Description',
  },
  {
    accessor: (row) => {
      const studyId = row.studyId;
      return (row as Study).emailAddresses?.map((ea) => ({ studyId, email: ea }));
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
                {v.email}
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

type DeleteRow = { studyId: string; email: string };
const EMPTY_DELETE_ROW = { studyId: '', email: '' };

const PageContent = () => {
  const [showCreateStudyModal, setShowCreateStudyModal] = useState(false);
  const [showAddSubmitterModal, setShowAddSubmitterModal] = useState(false);
  const [submitterToDelete, setSubmitterToDelete] = useState<DeleteRow>({ ...EMPTY_DELETE_ROW });

  const [tableData, setTableData] = useState<Study[]>([]);
  const { fetchStudies, createStudy, addUser, deleteSubmitter } = useStudiesSvcData();

  useEffect(() => {
    fetchStudies().then(setTableData);
  }, []);

  const closeAllModals = () => {
    setShowCreateStudyModal(false);
    setShowAddSubmitterModal(false);
    setSubmitterToDelete({ ...EMPTY_DELETE_ROW });
  };

  const onCreateSubmit = async (currentFormData: any) => {
    const createResult = await createStudy(currentFormData);
    setTableData(tableData.concat(createResult.study));
    closeAllModals();
  };

  const onAddUserSubmit = async (currentFormData: any) => {
    const addResult = await addUser(currentFormData);
    const updatedTableData = tableData.map((td) => {
      if (td.studyId === addResult.data.studyId) {
        td.emailAddresses.push(...addResult.data.emailAddresses);
      }
      return td;
    });
    setTableData(updatedTableData);
    closeAllModals();
  };

  const onRemoveSubmitter = async () => {
    const removeResult = await deleteSubmitter(submitterToDelete);
    const updatedTableData = tableData.map((td) => {
      if (td.studyId === removeResult.data.studyId) {
        td.emailAddresses = td.emailAddresses.filter((ea) => ea !== removeResult.data.email);
      }
      return td;
    });
    setTableData(updatedTableData);
    closeAllModals();
  };

  const tableDeleteButtonFunc = (dr: DeleteRow) => () => {
    setSubmitterToDelete(dr);
  };

  return (
    <div
      css={css`
        display: flex;
        margin: 60px;
        flex-direction: column;
      `}
    >
      <CreateStudyModal
        showModal={showCreateStudyModal}
        onClose={closeAllModals}
        onSubmit={onCreateSubmit}
      />
      <AddSubmitterModal
        showModal={showAddSubmitterModal}
        onClose={closeAllModals}
        onSubmit={onAddUserSubmit}
      />
      <DeleteSubmitterModal
        email={submitterToDelete.email}
        studyId={submitterToDelete.email}
        onClose={closeAllModals}
        onSubmit={onRemoveSubmitter}
      />
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
            onClick={() => setShowCreateStudyModal(true)}
          >
            Create a Study
          </Button>
          <Button onClick={() => setShowAddSubmitterModal(true)}>Add Data Submitters</Button>
        </div>
      </div>
      <GenericTable columns={columnData(tableDeleteButtonFunc)} data={tableData} />
    </div>
  );
};

export default PageContent;
