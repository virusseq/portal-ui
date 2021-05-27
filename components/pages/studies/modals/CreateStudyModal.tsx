import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ChangeEventHandler, InputHTMLAttributes, useState } from 'react';
import useStudiesSvcData from '../../../../global/hooks/useStudiesSvcData';
import { Modal } from '../../../Modal';

type FormData = {
  studyId: string;
  organization: string;
  name: string;
  description: string;
};

const EMPTY_FORM = Object.freeze({
  studyId: '',
  organization: '',
  name: '',
  description: '',
});

const FormRow = styled('div')`
      display: flex; 
      width 100%;
      justify-content: space-between;
      margin-left: 20px;
      margin-right: 20px;
      `;

const CreateStudyModal = ({ showModal, onClose, onSubmit }: any) => {
  const [formData, setFormData] = useState<FormData>({ ...EMPTY_FORM });

  const handleSubmit = () => {
    console.log('Submitting to svc');
    onSubmit(formData);
    setFormData({ ...EMPTY_FORM });
  };

  const handleInputChange = (key: keyof FormData): ChangeEventHandler => (event) => {
    event.preventDefault();
    const target = event.target as InputHTMLAttributes<typeof event>;
    setFormData({ ...formData, [key]: target.value || '' });
  };

  return showModal ? (
    <Modal
      key="CreateForm"
      title={'Create a Study'}
      showActionButton={true}
      disableActionButton={false}
      actionText={'Create Study'}
      closeText={'Cancel'}
      onCloseClick={onClose}
      onActionClick={handleSubmit}
    >
      <div
        key="CreateForm"
        css={css`
          display: flex;
          flex-direction: column;
          width: 675px;
          height: 400px;
          justify-content: space-evenly;
        `}
      >
        <FormRow>
          Study ID
          <input
            type="text"
            size={40}
            onChange={handleInputChange('studyId')}
            value={formData.studyId}
          ></input>
        </FormRow>
        <FormRow>
          Organization
          <input
            type="text"
            key="organization"
            size={40}
            onChange={handleInputChange('organization')}
            value={formData.organization}
          ></input>
        </FormRow>
        <FormRow>
          Study Name
          <input
            type="text"
            key="studyName"
            size={40}
            onChange={handleInputChange('name')}
            value={formData.name}
          ></input>
        </FormRow>
        <FormRow>
          Description
          <input
            type="text"
            key="description"
            size={40}
            onChange={handleInputChange('description')}
            value={formData.description}
          ></input>
        </FormRow>
      </div>
    </Modal>
  ) : null;
};

export default CreateStudyModal;
