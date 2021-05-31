import { css } from '@emotion/react';
import React, { ChangeEventHandler, InputHTMLAttributes } from 'react';
import { Modal } from '../../../Modal';
import { FormInputTextArea, FormInputText, usingFormValidator } from '../Forms';
import { CreateStudyValidations } from './validations';

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

type CreateStudyModalProps = {
  showModal: boolean;
  onClose: () => void;
  submitData: (currentFormData: FormData) => Promise<void>;
};

const CreateStudyModal = ({ showModal, onClose, submitData }: CreateStudyModalProps) => {
  const {
    isFormInvalid,
    formData,
    formErrors,
    setFormData,
    validateForm,
    validateField,
    clearFieldError,
  } = usingFormValidator<FormData>(EMPTY_FORM, CreateStudyValidations);

  const handleSubmit = () => {
    validateForm()
      .then((valid) => {
        if (!valid) {
          throw Error('Form data is not valid, refuse to submit!');
        }
      })
      .then(() => submitData(formData))
      .then(() => setFormData({ ...EMPTY_FORM }))
      .catch((err) => console.error(err));
  };

  const buildOnChangeFunc = (key: keyof FormData): ChangeEventHandler => (event) => {
    event.preventDefault();
    const target = event.target as InputHTMLAttributes<typeof event>;
    setFormData({ ...formData, [key]: target.value || '' });
    clearFieldError(key);
  };

  const buildOnBlurFunc = (key: keyof FormData) => () => validateField(key);

  const notFilledRequiredFields =
    formData.studyId === '' || formData.name === '' || formData.organization === '';

  return showModal ? (
    <Modal
      key="CreateForm"
      title={'Create a Study'}
      showActionButton={true}
      disableActionButton={isFormInvalid || notFilledRequiredFields}
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
          margin-left: 30px;
          margin-right: 30px;
        `}
      >
        <FormInputText
          required={true}
          label="Study ID"
          onChange={buildOnChangeFunc('studyId')}
          onBlur={buildOnBlurFunc(`studyId`)}
          errorMessage={formErrors[`studyId`]}
          value={formData[`studyId`]}
          size={43}
        />
        <FormInputText
          required={true}
          label="Organization"
          onChange={buildOnChangeFunc('organization')}
          onBlur={buildOnBlurFunc(`organization`)}
          errorMessage={formErrors[`organization`]}
          value={formData[`organization`]}
          size={43}
        />
        <FormInputText
          required={true}
          label="Study Name"
          onChange={buildOnChangeFunc('name')}
          onBlur={buildOnBlurFunc(`name`)}
          errorMessage={formErrors[`name`]}
          value={formData[`name`]}
          size={43}
        />
        <FormInputTextArea
          required={false}
          label="Description"
          onChange={buildOnChangeFunc('description')}
          onBlur={buildOnBlurFunc(`description`)}
          errorMessage={formErrors[`description`]}
          value={formData[`description`]}
          cols={44}
        />
      </div>
    </Modal>
  ) : null;
};

export default CreateStudyModal;
