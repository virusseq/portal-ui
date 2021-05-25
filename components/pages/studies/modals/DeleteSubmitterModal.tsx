import { css } from '@emotion/react';
import React from 'react';
import { Modal } from '../../../Modal';

const DeleteSubmitterModal = ({ onClose, onSubmit, email, studyId }: any) => {
  return email !== '' && studyId !== '' ? (
    <Modal
      showActionButton={true}
      disableActionButton={false}
      onCloseClick={onClose}
      onActionClick={onSubmit}
      actionText="Remove"
      closeText="Cancel"
      title={'Remove Confirmation'}
    >
      <p
        css={css`
          padding-right: 7px;
          padding-left: 7px;
        `}
      >
        Are you sure you want to remove {email} from {studyId}?
      </p>
    </Modal>
  ) : null;
};

export default DeleteSubmitterModal;
