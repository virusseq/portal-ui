import { ChangeEventHandler, InputHTMLAttributes, ReactElement, useState } from 'react';
import yup from 'yup';
import { get, isEmpty, update } from 'lodash';
import styled from '@emotion/styled';
import defaultTheme from '../../theme/index';
import { css } from '@emotion/react';
import { Row } from 'react-grid-system';
import { Bin } from '../../theme/icons';

type ErrorsByPathMap = Record<string, string>;

export const FormTextBlock = styled('div')`
      display: flex; 
      width 100%;
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
  label,
  required,
  errorMessage,
  inputElement,
}: FormInputBaseProps & {
  inputElement: ReactElement<InputElementBaseProps>;
}) => {
  return (
    <Row justify={'between'} nogutter>
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
          <StyledText text={errorMessage || ' '} color="red" font={12} />
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

export const FormInputSearchSelect = ({ options, ...props }: FormInputSearchSelectProps) => {
  const inputElement = (
    <div>
      <input list="options" {...props} />
      <datalist id="options">
        {options.map((o) => (
          <option value={o} />
        ))}
      </datalist>
    </div>
  );
  return <FormInputTemplate {...props} inputElement={inputElement} />;
};

type FormInputTextProps = FormInputBaseProps &
  InputElementBaseProps & {
    size: number;
  };

export const FormInputText = ({ label, required, errorMessage, ...props }: FormInputTextProps) => {
  const inputElement = <input type="text" {...props} />;
  return (
    <FormInputTemplate
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
  };

export const FormInputTextArea = ({
  label,
  required,
  errorMessage,
  ...props
}: FormInputTextAreaProps) => {
  const inputElement = (
    <textarea
      rows={10}
      css={css`
        resize: vertical;
      `}
      {...props}
    />
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

type FormInputTextBinProps = FormInputBaseProps &
  InputElementBaseProps & {
    size: number;
    showBin: boolean;
    onBinClick: () => void;
  };

export const FormInputTextBin = ({ showBin, onBinClick, ...props }: FormInputTextBinProps) => {
  const inputElement = (
    <Row nogutter>
      <input type="text" {...props} />
      <div
        onClick={onBinClick}
        css={css`
          visibility: ${showBin ? 'unset' : 'hidden'};
          margin-left: 8px;
          cursor: pointer;
        `}
      >
        <Bin />
      </div>
    </Row>
  );

  return <FormInputTemplate {...props} inputElement={inputElement} />;
};

export function usingFormValidator<T>(
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
