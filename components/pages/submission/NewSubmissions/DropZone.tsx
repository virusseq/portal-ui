import { Dispatch, ReactElement, useCallback } from 'react';
import { useTheme } from 'emotion-theming';
import { css } from '@emotion/core';
import { useDropzone } from 'react-dropzone';

import { ButtonElement as Button } from '../../../Button';
import defaultTheme from '../../../theme';
import DragAndDrop from '../../../theme/icons/DragAndDrop';
import { validator } from './validationHelpers';
import { ValidationActionType, ValidationParametersType } from './types';

const DropZone = ({
  validationState,
  validationDispatch,
}: {
  validationState: ValidationParametersType;
  validationDispatch: Dispatch<ValidationActionType>;
}): ReactElement => {
  const theme: typeof defaultTheme = useTheme();

  const {
    getRootProps,
    getInputProps,
    // isDragAccept,
    isDragActive,
    // isFileTooLarge,
  } = useDropzone({
    accept: '.fasta,.tsv,text/tab-separated-values',
    // accept: '.fa,.fasta,.tsv,text/tab-separated-values',
    onDrop: useCallback(
      (acceptedFiles) => acceptedFiles.forEach(validator(validationState, validationDispatch)),
      [],
    ),
  });

  const { onClick: fileUploadClick, ...rootProps } = getRootProps();

  return (
    <figure
      css={css`
        align-items: center;
        border: 1px dashed ${theme.colors.grey_6};
        display: flex;
        justify-content: center;
        margin: 30px 0 0;
        padding: 10px;
        position: relative;

        ${isDragActive &&
        css`
          background: rgba(${theme.colors.accent_light_rgb}, 0.3);

          span span {
            /* font-weight: 700; */
          }
        `}

        &:focus {
          outline: none;
        }

        > span {
          font-weight: 600;
          margin: 0 10px 0 7px;
        }
      `}
      {...rootProps}
    >
      <input {...getInputProps()} />
      <DragAndDrop />
      <span>
        Drag and <span>drop file(s)</span> here or
      </span>
      <Button
        css={css`
          height: 34px;
          margin: 20px 0;
        `}
        disabled={isDragActive}
        onClick={fileUploadClick}
      >
        Upload Files
      </Button>
    </figure>
  );
};

export default DropZone;
