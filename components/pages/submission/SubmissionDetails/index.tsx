import { ReactElement, useEffect, useState, useReducer } from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';

import useAuthContext from '../../../../global/hooks/useAuthContext';
import useMuseData, { UploadDataType } from '../../../../global/hooks/useMuseData';
import GenericTable from '../../../GenericTable';
import { LoaderWrapper } from '../../../Loader';
import defaultTheme from '../../../theme';
import columns from './columns';
import Overview from './Overview';
import { SubmissionDetailsProps } from './types';
import { uploadsStatusDictionary, uploadsStatusReducer } from './uploadStatusHelpers';

const SubmissionDetails = ({ ID }: SubmissionDetailsProps): ReactElement => {
  const theme: typeof defaultTheme = useTheme();
  const [totalUploads, setTotalUploads] = useState(0);
  const [dataIsPending, setDataIsPending] = useState(false);
  const [submissionDetails, submissionDetailsDispatch] = useReducer(
    uploadsStatusReducer,
    uploadsStatusDictionary,
  );

  const { token } = useAuthContext();
  const { awaitingResponse, fetchMuseData, fetchEventStream } = useMuseData('SubmissionsDetails');

  // gets the initial status for all the uploads
  useEffect(() => {
    if (token && totalUploads === 0) {
      fetchMuseData(
        `uploads?${new URLSearchParams({
          page: '0',
          size: '100000',
          submissionId: ID,
        })}`,
      ).then(({ data: uploadsData, ...response }) => {
        if (Array.isArray(uploadsData) && uploadsData.length > 0) {
          setTotalUploads(uploadsData.length);
          submissionDetailsDispatch({
            type: 'initial details',
            uploads: uploadsData,
          });

          setDataIsPending(
            uploadsData.some(({ status }: UploadDataType) =>
              ['QUEUED', 'PROCESSING'].includes(status),
            ),
          );
        } else {
          // handle rare edge case
          // TODO: create dev mode
          console.error('Unexpected response getting upload details', response, uploadsData);
        }
      });
    }
  }, [token]);

  // tries to get status updates, if any are available
  useEffect(() => {
    let eStream: EventSource | null;

    if (dataIsPending) {
      eStream = fetchEventStream('uploads-stream', ID, (messageData: UploadDataType) => {
        submissionDetailsDispatch({
          type: 'new details',
          upload: messageData,
        });
      });
    }

    // close any pending streams
    return () => eStream?.close?.();
  }, [dataIsPending]);

  return (
    <article
      css={css`
        width: 100%;
      `}
    >
      <Overview ID={ID} />

      <LoaderWrapper loading={awaitingResponse} size="10px">
        {totalUploads > 0 && (
          <>
            <p
              css={css`
                display: block;
                font-size: 13px;
                margin: 10px 0;
              `}
            >
              1 - {totalUploads} of {totalUploads} Viral Genomes
            </p>
            <GenericTable
              columns={columns}
              data={Object.values(submissionDetails).flat()}
              sortable={{
                defaultSortBy: [
                  {
                    id: 'status',
                  },
                ],
              }}
              style={css`
                &.sortable {
                  th.asc {
                    border-top-color: ${theme.colors.accent};
                  }

                  th.desc {
                    border-bottom-color: ${theme.colors.accent};
                  }
                }

                td {
                  vertical-align: top;

                  &:last-of-type {
                    svg {
                      margin-top: 2px;
                      position: absolute;
                    }
                  }

                  &:not(:last-of-type) {
                    max-width: 250px;
                    white-space: normal;
                    width: 250px;
                  }
                }
              `}
            />
          </>
        )}
      </LoaderWrapper>
    </article>
  );
};

export default SubmissionDetails;
