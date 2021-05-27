import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ChangeEventHandler, InputHTMLAttributes, useState } from 'react';
import Button, { UnStyledButton } from '../../../Button';
import { Modal } from '../../../Modal';
import { Bin, PlusIcon } from '../../../theme/icons';
import defaultTheme from '../../../theme/index';

const FormText = styled('div')`
      display: flex; 
      width 100%;
      justify-content: space-between;
      font-size: 16px;
      line-height: 24px;
      ${defaultTheme.typography.baseFont}
      `;

const BoldText = styled('div')`
  ${defaultTheme.typography.baseFont}
  font-size: 16px;
  line-height: 24px;
  font-weight: bold;
`;

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

const FormTextInput = ({
  label,
  onChange,
  value,
  showBinButton,
  offsetForNoBin,
  onBinClick,
  size = 40,
}: any) => {
  return (
    <FormText>
      <BoldText>{label}</BoldText>
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <input
          type="text"
          size={size}
          onChange={onChange}
          value={value}
          css={css`
            margin-right: ${offsetForNoBin ? '28px' : '0px'};
          `}
        />
        {showBinButton && (
          <div
            onClick={onBinClick}
            css={css`
              pad-top: 10px;
              margin-left: 10px;
              cursor: pointer;
            `}
          >
            <Bin />
          </div>
        )}
      </div>
    </FormText>
  );
};

type FormData = {
  studyId: string;
  submitters: string[];
};

const EMPTY_FORM: FormData = Object.freeze({ studyId: '', submitters: [''] });

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
    updatedFormData.submitters[index] = updatedValue;
    setFormData(updatedFormData);
  };

  const addEmailInput = () => {
    const updatedFormData = { ...formData };
    updatedFormData.submitters.push('');
    setFormData(updatedFormData);
  };

  const handleSubmit = () => {
    console.log('Submitting to svc');
    onSubmit(formData);
    setFormData({ studyId: '', submitters: [''] });
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
          margin-left: 30px;
          margin-right: 30px;
        `}
      >
        <FormText>Which study would you like to add data submitter(s) to?</FormText>
        <FormTextInput
          label="Study ID"
          onChange={updateStudyId}
          value={formData.studyId}
          size={43}
        />
        <FormText>
          What email addresses would you like to add for the data submitter(s)? Note: the email
          address must already be registered in the VirusSeq Data Portal before you can add them.
        </FormText>
        {formData.submitters.map((ea, i) => {
          return (
            <FormTextInput
              label="Email Address"
              value={ea}
              onChange={updateEmailAddresses(i)}
              showBinButton={i !== 0}
              offsetForNoBin={i === 0}
            />
          );
        })}
        <AddButton onClick={addEmailInput} />
      </div>
    </Modal>
  ) : null;
};

export default AddSubmitterModal;
