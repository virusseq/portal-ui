import { css } from '@emotion/react';
import React, { ChangeEventHandler, InputHTMLAttributes } from 'react';
import { UnStyledButton } from '../../../Button';
import { Modal } from '../../../Modal';
import { PlusIcon } from '../../../theme/icons';
import defaultTheme from '../../../theme/index';
import { AddSubmittersValidations } from './validations';
import {
  FormTextBlock,
  FormInputText,
  FormInputTextBin,
  usingFormValidator,
  FormInputSearchSelect,
} from '../Forms';

const AddButton = ({ onClick }: any) => {
  return (
    <UnStyledButton
      css={css`
        color: ${defaultTheme.colors.primary};
        background-color: ${defaultTheme.colors.white};
        font-size: 14px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        border-radius: 5px;
        border: 1px solid ${defaultTheme?.colors.primary};
        padding: 6px 15px;
      `}
      onClick={onClick}
    >
      <PlusIcon
        style={css`
          margin-right: 5px;
        `}
      />
      Add Another
    </UnStyledButton>
  );
};

type FormData = {
  studyId: string;
  submitters: string[];
};

const EMPTY_FORM: any = Object.freeze({ studyId: '', submitters: [''] });

type AddSubmitterModalProps = {
  showModal: boolean;
  onClose: () => void;
  submitData: (currentFormData: FormData) => Promise<void>;
};

const AddSubmitterModal = ({ showModal, onClose, submitData }: AddSubmitterModalProps) => {
  const {
    isFormInvalid,
    formData,
    formErrors,
    setFormData,
    validateForm,
    validateField,
  } = usingFormValidator<FormData>(EMPTY_FORM, AddSubmittersValidations);

  const updateStudyId: ChangeEventHandler = async (event) => {
    event.preventDefault();

    const target = event.target as InputHTMLAttributes<typeof event>;
    setFormData({ ...formData, studyId: target.value?.toString() || '' });

    await validateField('studyId');
  };

  const updateSubmitters = (index: number): ChangeEventHandler => (event) => {
    event.preventDefault();

    const updatedFormData = { ...formData };
    const target = event.target as InputHTMLAttributes<typeof event>;
    const updatedValue = target.value?.toString() || '';
    updatedFormData.submitters[index] = updatedValue;
    setFormData(updatedFormData);
  };

  const addEmailInput = () => {
    const updatedFormData = { ...formData };
    updatedFormData.submitters.push('');
    setFormData(updatedFormData);
  };

  const removeEmailInput = (index: number) => () => {
    const updatedFormData = { ...formData };
    updatedFormData.submitters.splice(index, 1);
    setFormData(updatedFormData);
    validateForm();
  };

  const handleSubmit = () => {
    validateForm()
      .then((valid) => {
        if (!valid) {
          throw Error('Form data is not valid, refuse to submit!');
        }
      })
      .then(() => submitData(formData))
      .then(() => setFormData({ studyId: '', submitters: [''] }))
      .catch((err) => console.error(err));
  };

  const onBlur = (field: string) => () => validateField(field);

  const notFilledRequiredFields = formData.studyId === '' || formData.submitters[0] === '';

  return showModal ? (
    <Modal
      title={'Add Data Submitters'}
      showActionButton={true}
      disableActionButton={isFormInvalid || notFilledRequiredFields}
      actionText={'Add Data Submitters'}
      closeText={'Cancel'}
      onCloseClick={onClose}
      onActionClick={handleSubmit}
    >
      <div
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
        <FormTextBlock>Which study would you like to add data submitter(s) to?</FormTextBlock>
        <FormInputSearchSelect
          required={true}
          label="Study ID"
          onChange={updateStudyId}
          onBlur={onBlur(`studyId`)}
          errorMessage={formErrors[`studyId`]}
          value={formData[`studyId`]}
          size={43}
          options={['ASDF', 'fdsa']}
        />
        <FormTextBlock>
          What email addresses would you like to add for the data submitter(s)? Note: the email
          address must already be registered in the VirusSeq Data Portal before you can add them.
        </FormTextBlock>
        {formData.submitters.map((s, i) => {
          return (
            <FormInputTextBin
              required={true}
              label="Email Address"
              value={s}
              size={40}
              onChange={updateSubmitters(i)}
              onBlur={onBlur(`submitters[${i}]`)}
              onBinClick={removeEmailInput(i)}
              showBin={i !== 0}
              errorMessage={formErrors[`submitters[${i}]`]}
            />
          );
        })}
        <AddButton onClick={addEmailInput} />
      </div>
    </Modal>
  ) : null;
};

export default AddSubmitterModal;
