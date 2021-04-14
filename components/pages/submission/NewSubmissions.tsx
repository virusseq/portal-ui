import { MouseEventHandler, useCallback, useEffect, useReducer, useState } from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import Router from 'next/router';
import { useDropzone } from 'react-dropzone';

import useMuseData from '../../../global/hooks/useMuseData';
import getInternalLink from '../../../global/utils/getInternalLink';
import { ButtonElement as Button, UnStyledButton } from '../../Button';
import StyledLink from '../../Link';
import { LoaderWrapper } from '../../Loader';
import defaultTheme from '../../theme';
import { Bin, File } from '../../theme/icons';
import ErrorNotification from '../../ErrorNotification';
import {
  getFileExtension,
  validationParameters,
  validationReducer, 
  validationTypes,
  validator,
} from './validation';

const isTSV = (type: string) => type === "text/tab-separated-values";

const FileRow = ({
  active = false,
  file: { name = '', type = '' }, 
  handleRemove = () => {console.log('clicked')},
} : {
  active: boolean,
  file: File,
  handleRemove?: MouseEventHandler<HTMLButtonElement>,
}) => {
  const theme: typeof defaultTheme = useTheme();

  return (
    <tr data-type={getFileExtension(name)} data-upload={active}>
      <td>
        <File
          fill={isTSV(type) 
            ? theme.colors.secondary_dark
            : theme.colors.accent3_dark
          } 
        />
        {` ${name}`}
      </td>
      <td>
        <UnStyledButton
          css={css``}
          onClick={handleRemove}
        >
          <Bin />
        </UnStyledButton>
      </td>
    </tr>
  );
};

const noUploadError = {} as { 
  errorInfo?: {},
  message?: string,
  status?: string,
};

const NewSubmissions = () => {
  const [thereAreFiles, setThereAreFiles] = useState(false);
  const [uploadError, setUploadError] = useState(noUploadError);
  const [validationState, validationDispatch] = useReducer(validationReducer, validationParameters);
  const {
    oneTSV,
    oneOrMoreFasta,
    readyToUpload,
  } = validationState;

  const {
    awaitingResponse,
    fetchMuseData,
  } = useMuseData('NewSubmissions');

  const {
    getRootProps,
    getInputProps, 
    isDragActive,
    isDragReject,
    isDragAccept,
    // isFileTooLarge,
  } = useDropzone({ 
    accept: '.fasta,.tsv,text/tab-separated-values', 
    onDrop: useCallback(acceptedFiles => acceptedFiles.forEach(validator(validationState, validationDispatch)), []),
  });
  const { onClick: fileUploadClick, ...rootProps } = getRootProps();

  const handleSubmit = () => {
    if (thereAreFiles) {
      const formData = new FormData();

      // if many TSV are available, submit only the first one along with all fastas
      const selectedTSV = oneTSV.slice(-1)[0];
      formData.append('files', selectedTSV, selectedTSV.name);
      oneOrMoreFasta.forEach(fasta => formData.append('files', fasta, fasta.name));

      return fetchMuseData(
        'submissions', 
        { body: formData, method: 'POST' }
      )
        .then((response) => {
          switch (response.status) {
            case 'BAD_REQUEST': {
              setUploadError({
                ...response,
                status: 'Your submission has errors and cannot be processed.',
              });
              return Promise.resolve();
            }

            case 'INTERNAL_SERVER_ERROR': {
              console.error(response);
              setUploadError({
                status: 'Internal server error',
                message: 'You upload request has failed. Please try again later.'
              })
              return Promise.resolve();
            }

            default: {
              response.submissionId 
                ? Router.push(getInternalLink({ path: `submission/${response.submissionId}` }))
                : console.log('Unhandled response:', response);
              return Promise.resolve();
            }
          }
        });
    }
    
    console.error('no files to submit');
  }

  useEffect(() => {
    setUploadError(noUploadError);
    setThereAreFiles(validationState.oneTSV.length > 0 || validationState.oneOrMoreFasta.length > 0);
  }, [validationState]);

  const handleClearAll = () => {
    setUploadError(noUploadError);
    validationDispatch({ type: 'clear all' });
  }

  const handleRemoveThis = ({ type, name }: File) => () => {
    setUploadError(noUploadError);
    validationDispatch({
      type: `remove ${isTSV(type) ? 'tsv' : 'fasta'}`,
      file: name,
    } as validationTypes.ValidationActionType);
  }

  return (
    <article
      css={theme => css`
        flex-direction: column;

        &:focus {
          outline: none;
        }

        ${isDragActive && `
          &::before {
            align-items: center;
            // background: ${isDragReject ? theme.colors.error : theme.colors.accent};
            background: ${theme.colors.accent};
            color: ${theme.colors.white};
            // content: "${isDragReject ? 'File type not accepted' : 'You may drop your files now'}";
            content: "You may drop your files now";
            display: flex;
            font-size: 20px;
            height: 100%;
            justify-content: center;
            opacity: 0.7;
            position: absolute;
            right: 0;
            top: 0;
            width: 100%;
            z-index: 1000;
          }
        `}
      `}
      {...rootProps}
    >
      <h1 className="view-title">
        Start a New Submission
      </h1>

      <ol
        css={css`
          box-sizing: border-box;
          margin: 0 0 20px;
          padding-left: 15px;

          li {
            margin-bottom: 20px;
          }
        `}
      >
        <li>
          <StyledLink href={``}>Download the metadata template TSV</StyledLink>
          {' and fill in all of the fields for your samples.'}
        </li>
        <li>
          Upload one formatted metadata TSV file and the accompanying FASTA sequencing files.
          <input {...getInputProps()} />
          <br/>
          <Button
            css={css`
              margin: 20px 0;
            `}
            disabled={isDragActive} 
            onClick={fileUploadClick}
          >           
            Upload Files
          </Button>   
        </li>
      </ol>

      {uploadError.message && (
        <ErrorNotification
          size="md"
          title={uploadError.status}
          styles={`
            flex-direction: column;
            justify-content: center;
            align-items: center;
          `}
        >
          {uploadError.message}
        </ErrorNotification>
      )}

      <LoaderWrapper
        loading={awaitingResponse}
        message={(<>Currently validating metadata and sequencing files.<br/>Do not navigate away from this browser window.</>)}
      >
        <table
          css={theme => css`
            border: 1px solid ${theme.colors.grey_4};
            border-collapse: collapse;
            border-spacing: 0;
            margin-top: 40px;
            width: 100%;

            caption {
              display: none;
            }

            .title {
              font-weight: bold;
            }

            .clearAll {
              font-size: 14px;
              padding-left: 0;
            }

            .emptyRow {
              font-size: 14px;
              text-align: center;
            }

            tbody {
              max-height: 100px;
            }

            tfoot {
              background: ${theme.colors.grey_2};
            }

            tr[data-type="tsv"]:not([data-upload="true"]) {
              color: ${theme.colors.grey_5};
              text-decoration: line-through;
            }

            td {
              border-top: 1px solid ${theme.colors.grey_4};
              box-sizing: border-box;
              font-size: 14px;
              min-height: 40px;
              height: 40px;
              padding: 0 10px;

              &:last-of-type:not(:first-of-type) {
                text-align: right;
                width: 65px;
              }
            }
          `}
        >
          <caption>Files to upload</caption>

          <thead>
            <tr>
              <td className="title">Uploaded Files</td>
              <td className="clearAll">
                <StyledLink
                  css={css`
                    text-decoration: none;
                  `}
                  disabled={!thereAreFiles}
                  onClick={handleClearAll}
                >
                  Clear all
                </StyledLink>
              </td>
            </tr>
          </thead>

          <tbody>
          {thereAreFiles 
            ? (
              <>
                {oneTSV.map((tsv, index) => (
                  // when more than one, all but the last one will get crossed out on render
                  <FileRow
                    active={index === (oneTSV.length -1)}
                    file={tsv}
                    key={tsv.name}
                    handleRemove={handleRemoveThis(tsv)}
                  />
                ))}
                {oneOrMoreFasta.map((fasta: File) =>
                  <FileRow 
                    active={true}
                    file={fasta}
                    key={fasta.name}
                    handleRemove={handleRemoveThis(fasta)}
                  />
                )}
              </>
            )
            : (
              <tr className="emptyRow">
                <td colSpan={2}>You have no files uploaded.</td>
              </tr>
            )}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={2}>
                <Button
                  css={css`
                    padding: 2px 15px;
                  `}
                  disabled={!(readyToUpload && !uploadError.message)}
                  onClick={handleSubmit}
                >           
                  Submit Data
                </Button>
                {thereAreFiles && !readyToUpload && (
                  <p
                    css={theme => css`
                      color: ${theme.colors.error_dark};
                      display: inline;
                      margin-left: 10px;
                    `}
                  >
                    You must submit one metadata TSV file and at least one FASTA file.
                  </p>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </LoaderWrapper>
    </article>
  );
};

export default NewSubmissions;
