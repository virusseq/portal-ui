import { useState } from 'react';

import { getConfig } from '../../config';
import processStream from '../../utils/processStream';
import useAuthContext from '../useAuthContext';

const useMuseData = (origin: string) => {
  const { NEXT_PUBLIC_MUSE_API } = getConfig();
  const { fetchWithAuth, token } = useAuthContext();
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  
  // For reference: https://muse.virusseq-dataportal.ca/swagger-ui/
  const fetchMuseData = (endpoint: string, { body = '', method = 'GET' }: { body?: any, method?: string } = {}) => {
    setAwaitingResponse(true);
  
    return fetchWithAuth(
      `${NEXT_PUBLIC_MUSE_API}${endpoint}`,
      {
        method,
        body,
      }, 
    )
    .then(response => {
      // TODO: create dev mode
      // console.log('initial response', response);
      return response?.body
    })
    .then(stream => {
      return stream?.constructor?.name === 'ReadableStream'
        ? processStream(origin, stream.getReader())()
          .then((parsedStream: string) => {
            setAwaitingResponse(false);
            // TODO: create dev mode
            // console.log('parsedStream', parsedStream)
            return parsedStream && JSON.parse(parsedStream);
          })
          .catch((error: Error | string) => {
            console.log(`Offending stream at ${origin}`, stream);
            console.error(error);
            return error;
          })
        : new Error(`Unspecified error at ${origin}`);
    })
    .catch((err: { response: any }) => {
      console.error('error', err)
      return Promise.reject(err);
    });
  };

  const fetchEventStream = (endpoint: string, submissionId: string, onMessage?: Function): EventSource => {
    const eventSource = new EventSource(
      `${NEXT_PUBLIC_MUSE_API}${endpoint}?${
        submissionId ? `submissionId=${submissionId}` : ''
      }&access_token=${token}`, {
      withCredentials: true,
    });

    eventSource.onmessage = function (event) {
      console.log("New message", event);
      onMessage?.(event.data);
    };

    return eventSource;
  }

  return {
    awaitingResponse,
    fetchEventStream,
    fetchMuseData,
    setAwaitingResponse,
  }
}

export default useMuseData;
