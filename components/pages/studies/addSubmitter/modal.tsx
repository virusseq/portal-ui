/*
 *
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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
import React, { ChangeEventHandler, InputHTMLAttributes } from 'react';
import { UnStyledButton } from '../../../Button';
import { Modal } from '../../../Modal';
import { PlusIcon } from '../../../theme/icons';
import defaultTheme from '../../../theme/index';
import createAddSubmittersValidations from './validations';
import {
  FormTextBlock,
  FormInputTextBin,
  usingFormValidator,
  FormInputSearchSelect,
} from '../../../Forms';
import { AddSubmitterReq, Study } from '../../../../global/hooks/useStudiesSvcData/types';
import { cloneDeep } from 'lodash';

type AddButtonProp = {
  onClick: () => void;
  disabled: boolean;
};

const AddButton = ({ onClick, disabled }: AddButtonProp) => {
  return (
    <UnStyledButton
      disabled={disabled}
      css={css`
        cursor: ${disabled ? 'alias' : undefined};
        color: ${disabled ? defaultTheme.colors.grey_5 : defaultTheme.colors.primary};
        background-color: ${disabled ? defaultTheme.colors.grey_2 : defaultTheme.colors.white};
        font-size: 13px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        border-radius: 5px;
        border: 1px solid ${disabled ? defaultTheme.colors.grey_3 : defaultTheme?.colors.primary};
        padding: 6px 10px;
      `}
      onClick={onClick}
    >
      <PlusIcon
        style={css`
          margin-right: 5px;
        `}
        fill={disabled ? defaultTheme.colors.grey_5 : undefined}
      />
      Add Another
    </UnStyledButton>
  );
};

const EMPTY_FORM: AddSubmitterReq = Object.freeze({ studyId: '', submitters: [''] });

type AddSubmitterModalProps = {
  studies: Study[];
  onClose: () => void;
  submitData: (currentFormData: AddSubmitterReq) => Promise<void>;
};

const AddSubmitterModal = ({ studies, onClose, submitData }: AddSubmitterModalProps) => {
  const {
    formData,
    formErrors,
    setFormData,
    validateForm,
    validateField,
    clearFieldError,
  } = usingFormValidator<AddSubmitterReq>(
    cloneDeep(EMPTY_FORM),
    createAddSubmittersValidations(studies),
  );

  const updateStudyId: ChangeEventHandler = (event) => {
    event.preventDefault();

    const target = event.target as InputHTMLAttributes<typeof event>;
    setFormData({ ...formData, studyId: target.value?.toString() || '' });

    clearFieldError('studyId');
  };

  const updateSubmitters = (index: number): ChangeEventHandler => (event) => {
    event.preventDefault();

    const updatedFormData = { ...formData };
    const target = event.target as InputHTMLAttributes<typeof event>;
    const updatedValue = target.value?.toString() || '';
    updatedFormData.submitters[index] = updatedValue;
    setFormData(updatedFormData);

    clearFieldError(`submitters[${index}]`);
  };

  const addEmailInput = () => {
    const updatedFormData = { ...formData };
    updatedFormData.submitters.push('');
    setFormData(updatedFormData);
  };

  const removeEmailInput = (index: number) => () => {
    clearFieldError(`submitters[${index}]`);
    const updatedFormData = { ...formData };
    updatedFormData.submitters.splice(index, 1);
    setFormData(updatedFormData);
  };

  const handleSubmit = async () => {
    const valid = await validateForm();
    // care about valid only because formErrors will render validation errors
    if (valid) {
      await submitData(formData);
      setFormData(cloneDeep(EMPTY_FORM));
    }
  };

  const onBlur = (field: string) => () => validateField(field);

  const notFilledRequiredFields = formData.studyId === '' || formData.submitters[0] === '';

  const hasNotInputedAnySubmitter =
    formData.submitters[0] === undefined || formData.submitters[0] === '';

  return (
    <Modal
      title={'Add Data Submitters'}
      showActionButton={true}
      disableActionButton={notFilledRequiredFields}
      actionText={'Add Data Submitters'}
      closeText={'Cancel'}
      onCloseClick={onClose}
      onActionClick={handleSubmit}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          width: 630px;
          justify-content: space-evenly;
          padding-right: 20px;
        `}
      >
        <FormTextBlock
          css={css`
            margin-top: 15px;
            margin-bottom: 25px;
          `}
        >
          Which study would you like to add data submitter(s) to?
        </FormTextBlock>
        <FormInputSearchSelect
          required={true}
          label="Study ID"
          onChange={updateStudyId}
          onBlur={onBlur(`studyId`)}
          errorMessage={formErrors[`studyId`]}
          value={formData[`studyId`]}
          size={50}
          options={studies.map((s) => s.studyId)}
        />
        <FormTextBlock
          css={css`
            margin-top: 15px;
            margin-bottom: 25px;
          `}
        >
          What email addresses would you like to add for the data submitter(s)? Note: the email
          address must already be registered in the VirusSeq Data Portal before you can add them.
        </FormTextBlock>
        <div
          css={css`
            margin-bottom: 30px};
          `}
        >
          {formData.submitters.map((s, i) => {
            return (
              <FormInputTextBin
                key={i}
                required={true}
                label="Email Address"
                value={s}
                size={44}
                onChange={updateSubmitters(i)}
                onBlur={onBlur(`submitters[${i}]`)}
                onBinClick={removeEmailInput(i)}
                showBin={i !== 0}
                errorMessage={formErrors[`submitters[${i}]`]}
              />
            );
          })}
          <AddButton onClick={addEmailInput} disabled={hasNotInputedAnySubmitter} />
        </div>
      </div>
    </Modal>
  );
};

export default AddSubmitterModal;
