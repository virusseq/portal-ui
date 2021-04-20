import { useEffect, useMemo, useState, useReducer, } from "react";
import { css } from '@emotion/core';

import useAuthContext from "../../../../global/hooks/useAuthContext";
import useMuseData, { UploadDataType } from '../../../../global/hooks/useMuseData';
import GenericTable from '../../../GenericTable';
import { LoaderWrapper } from '../../../Loader';
import columnData from './columns';
import Overview from './Overview';
import { SubmissionDetailsProps, UploadsStatusDictionaryType } from './types';
import {
  uploadsStatusDictionary,
  uploadsStatusReducer,
} from  './uploadStatusHelpers';

const SubmissionDetails = ({ ID }: SubmissionDetailsProps) => {
  const columns = useMemo(() => columnData, []);
  const [totalUploads, setTotalUploads] = useState(0);
  const [dataIsPending, setDataIsPending] = useState(false);
  const [submissionDetails, submissionDetailsDispatch] = useReducer(uploadsStatusReducer, uploadsStatusDictionary);

  const { token } = useAuthContext();
  const {
    awaitingResponse,
    fetchMuseData,
    fetchEventStream,
  } = useMuseData('SubmissionsDetails');

  // gets the initial status for all the uploads
  useEffect(()=> {
    if (token && totalUploads === 0) {
      fetchMuseData(`uploads?${
        new URLSearchParams({
          page: '0',
          size: '100000',
          sortDirection: 'DESC',
          sortField: 'createdAt',
          submissionId: ID,
        })
      }`)
        .then(({ data: uploadsData, ...response}) => {
          if (Array.isArray(uploadsData) && uploadsData.length > 0) {
            console.log('response', [...uploadsData]);
            
            setTotalUploads(uploadsData.length);
            submissionDetailsDispatch({
              type: 'initial details',
              uploads: uploadsData,
            });

            setDataIsPending(uploadsData.some(({ status }: UploadDataType) => 
              ['QUEUED', 'PROCESSING'].includes(status)
            ));
          } else { // handle rare edge case
            // TODO: create dev mode
            console.error('Unexpected response getting upload details', response, uploadsData);
          }
        });
    }
  }, [token])

  // tries to get status updates, if any are available
  useEffect(() => {
    let eStream: EventSource | null;

    if (dataIsPending) {
      eStream = fetchEventStream(
        'uploads-stream', 
        ID,
        (messageData: UploadDataType) => {
          console.log('before message', {...submissionDetails}, messageData)
          submissionDetailsDispatch({
            type: 'new details',
            upload: messageData,
          })
        }
      );
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
      <Overview ID={ID}/>

      <LoaderWrapper
        loading={awaitingResponse}
        size="10px"
      >
        {totalUploads > 0 && (
          <p
            css={css`
              display: block;
              font-size: 13px;
              margin: 10px 0;
            `}
          >
            1 - {totalUploads} of {totalUploads} Viral Genomes
          </p>
        )}

        <GenericTable
          columns={columns}
          data={Object.values(submissionDetails).flat()}
          style={css`
            td {
              vertical-align: top;
            }

            td:last-of-type {
              width: 300px;
              svg {
                margin-top: 2px;
                position: absolute;
              }
            }

          `}
        />
      </LoaderWrapper>
    </article>
  );
}

export default SubmissionDetails;
