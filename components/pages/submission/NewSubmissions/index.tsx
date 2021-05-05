import { ReactElement, useEffect, useReducer, useState } from 'react';
import { useTheme } from '@emotion/react';
import { css } from '@emotion/react';

import Router from 'next/router';

import useAuthContext from '../../../../global/hooks/useAuthContext';
import useMuseData from '../../../../global/hooks/useMuseData';
import getInternalLink from '../../../../global/utils/getInternalLink';
import { ButtonElement as Button } from '../../../Button';
import ErrorNotification from '../../../ErrorNotification';
import StyledLink from '../../../Link';
import { LoaderWrapper } from '../../../Loader';
import defaultTheme from '../../../theme';
import DropZone from './DropZone';
import FileRow from './FileRow';
import {
  getFileExtension,
  makeErrorTypeReadable,
  validationParameters,
  validationReducer,
} from './validationHelpers';
import { NoUploadErrorType, ValidationActionType } from './types';

const noUploadError = {} as NoUploadErrorType;

const NewSubmissions = (): ReactElement => {
  const { token, userHasWriteScopes } = useAuthContext();
  const theme: typeof defaultTheme = useTheme();
  const [thereAreFiles, setThereAreFiles] = useState(false);
  const [uploadError, setUploadError] = useState(noUploadError);
  const [validationState, validationDispatch] = useReducer(validationReducer, validationParameters);
  const { oneTSV, oneOrMoreFasta, readyToUpload } = validationState;

  const { awaitingResponse, fetchMuseData } = useMuseData('NewSubmissions');

  const handleSubmit = () => {
    if (thereAreFiles && token && userHasWriteScopes) {
      const formData = new FormData();

      // if many TSV are available, submit only the first one along with all fastas
      const selectedTSV = oneTSV.slice(-1)[0];
      formData.append('files', selectedTSV, selectedTSV.name);
      oneOrMoreFasta.forEach((fasta) => formData.append('files', fasta, fasta.name));

      return fetchMuseData('submissions', { body: formData, method: 'POST' }).then((response) => {
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
              message: 'Your upload request has failed. Please try again later.',
            });
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

    console.error(`no ${token ? 'token' : userHasWriteScopes ? 'scopes' : 'files'} to submit`);
  };

  useEffect(() => {
    setUploadError(noUploadError);
    setThereAreFiles(
      validationState.oneTSV.length > 0 || validationState.oneOrMoreFasta.length > 0,
    );
  }, [validationState]);

  const handleClearAll = () => {
    setUploadError(noUploadError);
    validationDispatch({ type: 'clear all' });
  };

  const handleRemoveThis = ({ name }: File) => () => {
    setUploadError(noUploadError);
    validationDispatch({
      type: `remove ${getFileExtension(name)}`,
      file: name,
    } as ValidationActionType);
  };

  return (
    <article
      css={css`
        flex-direction: column;

        h2 {
          ${theme.typography.subheading};
        }

        ol {
          box-sizing: border-box;
          margin: 0 0 20px;
          padding-left: 15px;

          li {
            margin-bottom: 20px;
          }
        }
      `}
    >
      <h1 className="view-title">Start a New Submission</h1>

      <p>
        Virus metadata is submitted as a .tsv file. Viral genome data must be submitted as a{' '}
        <span className="code">.fasta</span> file. Up to 5000 samples can be submitted in a single
        submission, but note that the larger the file the longer the submission will take. Fasta
        files are accepted individually, or as a single concatenated fasta containing all samples in
        one file.
      </p>

      <h2>To format your viral sequence metadata:</h2>

      <ol>
        <li>
          Sequence metadata must be provided in TSV format according to the accepted values for each
          field. A reference of the accepted values can be found{' '}
          <StyledLink
            href="https://github.com/Public-Health-Bioinformatics/DataHarmonizer/blob/master/template/canada_covid19/SOP.pdf"
            rel="noopener noreferrer"
            target="_blank"
          >
            in this resource
          </StyledLink>
          .
        </li>
        <li>
          <StyledLink
            href="https://github.com/Public-Health-Bioinformatics/DataHarmonizer"
            rel="noopener noreferrer"
            target="_blank"
          >
            DataHarmonizer
          </StyledLink>{' '}
          is a tool that can be used to help validate your metadata TSV locally before submitting.
          Download the tool and follow the instructions on the Github repository to pre-validate
          your metadata before submission.
        </li>
        <li>
          If you are using Excel or Google sheets, make sure all characters are UTF-8 encoded.
        </li>
      </ol>

      <h2>To format your viral sequence files:</h2>

      <ol>
        <li>
          Make sure they have the file extension <span className="code">.fasta</span>,{' '}
          <span className="code">.fa</span>, or zipped fastas in <span className="code">.gz</span>{' '}
          format.
        </li>
        <li>
          Each sequence must be preceded be a description line, beginning with a &gt;. The
          description line should include &gt;hCoV-19/<span className="code">country</span>/
          <span className="code">identifier</span>/<span className="code">year</span> sequenced.
          This identifier must match exactly the "Isolate" column in the TSV file.
        </li>
      </ol>

      <DropZone
        disabled={!userHasWriteScopes}
        validationState={validationState}
        validationDispatch={validationDispatch}
      />

      {uploadError.message && (
        <ErrorNotification
          size="md"
          title={uploadError.status}
          styles={`
            align-items: center;
            box-sizing: border-box;
            flex-direction: column;
            justify-content: center;
            margin-top: 20px;
            max-width: 100%;
            width: 100%;
          `}
        >
          {uploadError.message}
          {uploadError?.errorInfo && (
            <ul
              css={css`
                margin: 10px 0 0;
                padding-left: 0;
              `}
            >
              {Object.entries(uploadError?.errorInfo).map(
                ([type = '', values = []]) =>
                  values.length > 0 && (
                    <li key={type}>
                      {makeErrorTypeReadable(type)}:<br />
                      {values.join(', ')}.
                    </li>
                  ),
              )}
            </ul>
          )}
        </ErrorNotification>
      )}

      <LoaderWrapper
        loading={awaitingResponse}
        message={
          <>
            Currently validating metadata and sequencing files.
            <br />
            Do not navigate away from this browser window.
          </>
        }
      >
        <table
          css={css`
            border: 1px solid ${theme.colors.grey_4};
            border-collapse: collapse;
            border-spacing: 0;
            margin-top: 20px;
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
            {thereAreFiles ? (
              <>
                {oneTSV.map((tsv, index) => (
                  // when more than one, all but the last one will get crossed out on render
                  <FileRow
                    active={index === oneTSV.length - 1}
                    file={tsv}
                    key={tsv.name}
                    handleRemove={handleRemoveThis(tsv)}
                  />
                ))}
                {oneOrMoreFasta.map((fasta: File) => (
                  <FileRow
                    active={true}
                    file={fasta}
                    key={fasta.name}
                    handleRemove={handleRemoveThis(fasta)}
                  />
                ))}
              </>
            ) : (
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
                    height: 34px;
                    padding: 0 15px;
                  `}
                  disabled={!(readyToUpload && !uploadError.message)}
                  onClick={handleSubmit}
                >
                  Submit Data
                </Button>
                {thereAreFiles && !readyToUpload && (
                  <p
                    css={css`
                      color: ${theme.colors.error_dark};
                      display: inline;
                      margin-left: 10px;
                    `}
                  >
                    You must submit only one metadata TSV file and at least one FASTA file.
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
