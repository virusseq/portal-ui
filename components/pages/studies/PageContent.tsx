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
import useNotifier, { NotificationType } from './notifier/useNotifier';
import StudiesTable from './StudiesTable';
import {
  RemoveSubmitterReq,
  StudiesSvcResError,
  Study,
} from '../../../global/hooks/useStudiesSvcData/types';

const EMPTY_DELETE_ROW: RemoveSubmitterReq = Object.freeze({ studyId: '', submitter: '' });

const PageContent = () => {
  const [tableData, setTableData] = useState<Study[]>([]);

  const [showCreateStudyModal, setShowCreateStudyModal] = useState(false);
  const [showAddSubmitterModal, setShowAddSubmitterModal] = useState(false);
  const [submitterToRemove, setSubmitterToRemove] = useState<RemoveSubmitterReq>({
    ...EMPTY_DELETE_ROW,
  });

  const notifier = useNotifier();
  const {
    awaitingResponse,
    fetchStudies,
    createStudy,
    addSubmitterToStudy,
    removeSubmitterFromStudy,
  } = useStudiesSvcData();

  const updateTable = async () => {
    const res = await fetchStudies();
    if (res.success && res.data) {
      setTableData(res.data);
    } else {
      const { type, studyId, submitters } = res.error || {};
      notifier.addNotification({
        success: false,
        notifierReason: type as any,
        studyId,
        submitters,
      });
    }
  };

  useEffect(() => {
    updateTable();
  }, []);

  const closeAllModals = () => {
    setShowCreateStudyModal(false);
    setShowAddSubmitterModal(false);
    setSubmitterToRemove({ ...EMPTY_DELETE_ROW });
  };

  const afterSubmit = (
    success: boolean,
    error: StudiesSvcResError | undefined,
    onSuccessNotifyState: NotificationType,
  ) => {
    if (!success && error) {
      const { type, studyId, submitters } = error;
      notifier.addNotification({
        success: false,
        notifierReason: type as any,
        studyId,
        submitters,
      });
    } else {
      notifier.addNotification({ success: true, notifierReason: onSuccessNotifyState });
    }
    closeAllModals();
    updateTable();
  };

  const submitCreateStudy = async (currentFormData: any) => {
    const { success, error } = await createStudy(currentFormData);
    afterSubmit(success, error, NotificationType.STUDY_CREATED);
  };

  const submitAddUser = async (currentFormData: any) => {
    const { success, error } = await addSubmitterToStudy(currentFormData);
    afterSubmit(success, error, NotificationType.SUBMITTERS_ADDED);
  };

  const submitRemoveSubmitter = async () => {
    const { success, error } = await removeSubmitterFromStudy(submitterToRemove);
    afterSubmit(success, error, NotificationType.SUBMITTERS_REMOVED);
  };

  const createRemoveSubmitterModalFunc = (dr: RemoveSubmitterReq) => () => {
    setSubmitterToRemove(dr);
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
        email={submitterToRemove.submitter}
        studyId={submitterToRemove.studyId}
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
      <StudiesTable tableDeleteButtonFunc={createRemoveSubmitterModalFunc} tableData={tableData} />
    </div>
  );
};

export default PageContent;
