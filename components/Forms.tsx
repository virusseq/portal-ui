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

import { ChangeEventHandler, ReactElement, useState } from 'react';
import yup from 'yup';
import { get, isEmpty } from 'lodash';
import styled from '@emotion/styled';
import defaultTheme from './theme/index';
import { css } from '@emotion/react';
import { Row } from 'react-grid-system';
import { Bin } from './theme/icons';

type ErrorsByPathMap = Record<string, string>;

const inputTextStyle = css`
  ${defaultTheme.typography.baseFont}
  font-size: 16px;
  border-radius: 5px;
  border: solid 1px ${defaultTheme.colors.grey_5};
`;

export const FormTextBlock = styled('div')`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 16px;
  line-height: 24px;
  ${defaultTheme.typography.baseFont}
`;

const StyledText = ({ text, color = 'black', bold = false, font = 16 }: any) => {
  return (
    <div
      css={css`
        ${defaultTheme.typography.baseFont}
        color: ${color};
        font-size: ${font}px;
        line-height: 24px;
        font-weight: ${bold ? 'bold' : 'normal'};
        white-space: pre;
      `}
    >
      {text}
    </div>
  );
};

export type FormInputBaseProps = {
  key?: string | number;
  label: string;
  required: boolean;
  errorMessage: string;
};

export type InputElementBaseProps = {
  onChange: ChangeEventHandler;
  value: string;
  onBlur: () => void;
};

/** Template for all FormInput types */
const FormInputTemplate = ({
  key,
  label,
  required,
  errorMessage,
  inputElement,
}: FormInputBaseProps & {
  inputElement: ReactElement<InputElementBaseProps>;
}) => {
  return (
    <Row key={key} justify={'between'} nogutter>
      <Row nogutter>
        <StyledText text={label} bold />
        {required && <StyledText color="red" text="  *" bold />}
      </Row>
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <div>
          {inputElement}
          <StyledText text={errorMessage || ' '} color={defaultTheme.colors.error} font={11} />
        </div>
      </div>
    </Row>
  );
};

type FormInputSearchSelectProps = FormInputBaseProps &
  InputElementBaseProps & {
    options: string[];
    size: number;
  };

export const FormInputSearchSelect = ({
  key = '',
  label,
  required,
  errorMessage,
  options,
  ...props
}: FormInputSearchSelectProps) => {
  const inputElement = (
    <div>
      <input
        css={css`
          ${inputTextStyle}
          padding: 6px 10px;
        `}
        list={`${key}-options`}
        {...props}
      />
      <datalist id={`${key}-options`}>
        {options.map((o, i) => (
          <option key={`${key}-options-${i}]`} value={o} />
        ))}
      </datalist>
    </div>
  );
  return (
    <FormInputTemplate
      key={key}
      label={label}
      required={required}
      errorMessage={errorMessage}
      inputElement={inputElement}
    />
  );
};

type FormInputTextProps = FormInputBaseProps &
  InputElementBaseProps & {
    size: number;
  };

export const FormInputText = ({
  key,
  label,
  required,
  errorMessage,
  ...props
}: FormInputTextProps) => {
  const inputElement = (
    <input
      css={css`
        ${inputTextStyle}
        padding: 6px 10px;
      `}
      type="text"
      {...props}
    />
  );
  return (
    <FormInputTemplate
      key={key}
      label={label}
      required={required}
      errorMessage={errorMessage}
      inputElement={inputElement}
    />
  );
};

type FormInputTextAreaProps = FormInputBaseProps &
  InputElementBaseProps & {
    cols: number;
    rows: number;
  };

export const FormInputTextArea = ({
  key,
  label,
  required,
  errorMessage,
  ...props
}: FormInputTextAreaProps) => {
  const inputElement = (
    <textarea
      css={css`
        ${inputTextStyle}
        resize: vertical;
        padding: 6px 10px;
      `}
      {...props}
    />
  );

  return (
    <FormInputTemplate
      key={key}
      label={label}
      required={required}
      errorMessage={errorMessage}
      inputElement={inputElement}
    />
  );
};

type FormInputTextBinProps = FormInputBaseProps &
  InputElementBaseProps & {
    size: number;
    showBin: boolean;
    onBinClick: () => void;
  };

export const FormInputTextBin = ({
  label,
  required,
  errorMessage,
  showBin,
  onBinClick,
  ...props
}: FormInputTextBinProps) => {
  const inputElement = (
    <Row nogutter>
      <input
        css={css`
          ${inputTextStyle}
          padding: 6px 10px;
        `}
        type="text"
        {...props}
      />
      <div
        onClick={onBinClick}
        css={css`
          visibility: ${showBin ? 'unset' : 'hidden'};
          padding: 6px 10px;
          margin-left: 8px;
          cursor: pointer;
        `}
      >
        <Bin />
      </div>
    </Row>
  );

  return (
    <FormInputTemplate
      label={label}
      required={required}
      errorMessage={errorMessage}
      inputElement={inputElement}
    />
  );
};

export function useFormValidator<T>(
  initialForm: T,
  formSchema: yup.BaseSchema<T>,
): {
  isFormValid: boolean;
  isFormInvalid: boolean;
  formData: T;
  formErrors: ErrorsByPathMap;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  validateForm: () => Promise<boolean>;
  validateField: (path: string) => Promise<boolean>;
  clearAllErrors: () => void;
  clearFieldError: (path: string) => void;
} {
  const [formData, setFormData] = useState<T>({ ...initialForm });
  const [formErrors, setFormErrors] = useState<ErrorsByPathMap>({});

  const validateField = (path: string) => {
    const updatedFormErrors = { ...formErrors };

    const value: any | undefined = get(formData, path);
    if (value === undefined) {
      delete updatedFormErrors[path];
      setFormErrors(updatedFormErrors);
    }
    return formSchema
      .validateAt(path, formData, {
        abortEarly: false,
        stripUnknown: true,
      })
      .then(() => {
        delete updatedFormErrors[path];
        setFormErrors(updatedFormErrors);
        return true;
      })
      .catch((err: any) => {
        err.inner.forEach(({ message, path }: any) => {
          updatedFormErrors[path] = message;
        });
        setFormErrors(updatedFormErrors);
        return false;
      });
  };

  const validateForm = () => {
    const updatedFormErrors: ErrorsByPathMap = {};

    return formSchema
      .validate(formData, {
        abortEarly: false,
        stripUnknown: true,
      })
      .then(() => {
        setFormErrors(updatedFormErrors);
        return true;
      })
      .catch((err: any) => {
        err.inner.forEach(({ message, path }: any) => {
          updatedFormErrors[path] = message;
        });
        setFormErrors(updatedFormErrors);
        console.log(err);
        return false;
      });
  };

  const clearAllErrors = () => {
    setFormErrors({});
  };

  const clearFieldError = (path: string) => {
    const updatedFormErrors = { ...formErrors };
    if (updatedFormErrors[path]) {
      delete updatedFormErrors[path];
    }
    setFormErrors(updatedFormErrors);
  };

  const isFormValid = isEmpty(formErrors);
  const isFormInvalid = !isFormValid;

  return {
    isFormValid,
    isFormInvalid,
    formData,
    formErrors,
    setFormData,
    validateForm,
    validateField,
    clearAllErrors,
    clearFieldError,
  };
}
