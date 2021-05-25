import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ChangeEventHandler, InputHTMLAttributes, useState } from 'react';
import Button from '../../../Button';
import { Modal } from '../../../Modal';

const FormRow = styled('div')`
      display: flex; 
      width 100%;
      justify-content: space-between;
      margin-left: 20px;
      margin-right: 20px;
      `;

type FormData = {
  studyId: string;
  emailAddresses: string[];
};

const EMPTY_FORM: FormData = Object.freeze({ studyId: '', emailAddresses: [''] });

type AddSubmitterModalProps = {
  showModal: boolean;
  onClose: () => void;
  onSubmit: (currentFormData: FormData) => void;
};

const AddSubmitterModal = ({ showModal, onClose, onSubmit }: AddSubmitterModalProps) => {
  const [formData, setFormData] = useState<FormData>({ ...EMPTY_FORM });

  const updateStudyId: ChangeEventHandler = (event) => {
    event.preventDefault();

    const target = event.target as InputHTMLAttributes<typeof event>;
    setFormData({ ...formData, studyId: target.value?.toString() || '' });
  };

  const updateEmailAddresses = (index: number): ChangeEventHandler => (event) => {
    event.preventDefault();

    const updatedFormData = { ...formData };
    const target = event.target as InputHTMLAttributes<typeof event>;
    const updatedValue = target.value?.toString() || '';
    updatedFormData.emailAddresses[index] = updatedValue;
    setFormData(updatedFormData);
  };

  const addEmailInput = () => {
    const updatedFormData = { ...formData };
    updatedFormData.emailAddresses.push('');
    setFormData(updatedFormData);
  };

  const handleSubmit = () => {
    console.log('Submitting to svc');
    onSubmit(formData);
    setFormData({ studyId: '', emailAddresses: [''] });
  };

  return showModal ? (
    <Modal
      key="CreateForm"
      title={'Add Data Submitters'}
      showActionButton={true}
      disableActionButton={false}
      actionText={'Add Data Submitters'}
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
        <FormRow>Which study would you like to add data submitter(s) to?</FormRow>
        <FormRow>
          Study ID
          <input type="text" size={40} onChange={updateStudyId} value={formData.studyId}></input>
        </FormRow>
        <FormRow>
          What email addresses would you like to add for the data submitter(s)? Note: the email
          address must already be registered in the VirusSeq Data Portal before you can add them.
        </FormRow>
        <FormRow>Email Address</FormRow>
        {formData.emailAddresses.map((ea, i) => {
          return (
            <input type="text" size={20} value={ea} onChange={updateEmailAddresses(i)}></input>
          );
        })}
        <Button onClick={addEmailInput}>Add Another</Button>
      </div>
    </Modal>
  ) : null;
};

export default AddSubmitterModal;
