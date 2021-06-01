/*
 *
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
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

import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import useStudiesSvcData from '../../../global/hooks/useStudiesSvcData';
import Button from '../../Button';
import defaultTheme from '../../theme/index';
import AddSubmitterModal from './addSubmitter/modal';
import CreateStudyModal from './createStudy/modal';
import DeleteSubmitterModal from './DeleteSubmitterModal';
import useNotifier from './notifier/useNotifier';
import StudiesTable from './StudiesTable';
import { Study } from '../../../global/hooks/useStudiesSvcData/types';

export type DeleteRow = { studyId: string; submitter: string };
const EMPTY_DELETE_ROW: DeleteRow = { studyId: '', submitter: '' };

const PageContent = () => {
  const [showCreateStudyModal, setShowCreateStudyModal] = useState(false);
  const [showAddSubmitterModal, setShowAddSubmitterModal] = useState(false);
  const [submitterToDelete, setSubmitterToDelete] = useState<DeleteRow>({ ...EMPTY_DELETE_ROW });

  const notifier = useNotifier();

  const [tableData, setTableData] = useState<Study[]>([]);
  const {
    awaitingResponse,
    fetchStudies,
    createStudy,
    addUser,
    deleteSubmitter,
  } = useStudiesSvcData();

  const updateTable = () => {
    fetchStudies().then(setTableData);
  };

  useEffect(() => {
    updateTable();
  }, []);

  const closeAllModals = () => {
    setShowCreateStudyModal(false);
    setShowAddSubmitterModal(false);
    setSubmitterToDelete({ ...EMPTY_DELETE_ROW });
  };

  const submitCreateStudy = async (currentFormData: any) => {
    createStudy(currentFormData).then((res) => {
      closeAllModals();
      console.log(res);
      notifier.addNotification(res);
      updateTable();
    });
  };

  const submitAddUser = async (currentFormData: any) => {
    addUser(currentFormData).then((res) => {
      closeAllModals();
      console.log(res);
      notifier.addNotification(res);
      updateTable();
    });
  };

  const submitRemoveSubmitter = async () => {
    deleteSubmitter(submitterToDelete).then((res) => {
      closeAllModals();
      console.log(res);
      notifier.addNotification(res);
      updateTable();
    });
  };

  const tableDeleteButtonFunc = (dr: DeleteRow) => () => {
    setSubmitterToDelete(dr);
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        padding-left: 60px;
        padding-right: 60px;
        padding-bottom: ${defaultTheme.dimensions.footer.height + 60}px;
      `}
    >
      <CreateStudyModal
        showModal={showCreateStudyModal}
        onClose={closeAllModals}
        submitData={submitCreateStudy}
      />
      {showAddSubmitterModal && (
        <AddSubmitterModal
          studies={tableData}
          onClose={closeAllModals}
          submitData={submitAddUser}
        />
      )}
      <DeleteSubmitterModal
        email={submitterToDelete.submitter}
        studyId={submitterToDelete.studyId}
        onClose={closeAllModals}
        onSubmit={submitRemoveSubmitter}
      />
      {notifier.NotificationsDiv}
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
            disabled={awaitingResponse}
            css={css`
              margin-right: 20px;
            `}
            onClick={() => setShowCreateStudyModal(true)}
          >
            Create a Study
          </Button>
          <Button disabled={awaitingResponse} onClick={() => setShowAddSubmitterModal(true)}>
            Add Data Submitters
          </Button>
        </div>
      </div>
      <StudiesTable tableDeleteButtonFunc={tableDeleteButtonFunc} tableData={tableData} />
    </div>
  );
};

export default PageContent;
