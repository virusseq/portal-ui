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
import { Study } from '../../../../global/hooks/useStudiesSvcData/types';

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
  studies: Study[];
  onClose: () => void;
  submitData: (currentFormData: FormData) => Promise<void>;
};

const AddSubmitterModal = ({ studies, onClose, submitData }: AddSubmitterModalProps) => {
  const {
    formData,
    formErrors,
    setFormData,
    validateForm,
    validateField,
    clearFieldError,
  } = usingFormValidator<FormData>(EMPTY_FORM, createAddSubmittersValidations(studies));

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
          options={studies.map((s) => s.studyId)}
        />
        <FormTextBlock>
          What email addresses would you like to add for the data submitter(s)? Note: the email
          address must already be registered in the VirusSeq Data Portal before you can add them.
        </FormTextBlock>
        {formData.submitters.map((s, i) => {
          return (
            <FormInputTextBin
              key={i}
              required={true}
              label="Email Address"
              value={s}
              size={37}
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
  );
};

export default AddSubmitterModal;
