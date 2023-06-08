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

import { useState } from 'react';
import urlJoin from 'url-join';

import { getConfig } from '../../config';
import processStream from '../../utils/processStream';
import useAuthContext from '../useAuthContext';

const useMuseData = (origin: string) => {
  const { NEXT_PUBLIC_MUSE_API } = getConfig();
  const { fetchWithAuth, token } = useAuthContext();
  const [awaitingResponse, setAwaitingResponse] = useState(false);

  // For reference: https://muse.virusseq-dataportal.ca/swagger-ui/
  const fetchMuseData = (
    endpoint: string,
    { body = '', method = 'GET' }: { body?: any; method?: string } = {},
  ) => {
    setAwaitingResponse(true);

    return fetchWithAuth(urlJoin(NEXT_PUBLIC_MUSE_API,endpoint), {
      method,
      body,
    })
      .then((response) => {
        // TODO: create dev mode
        // console.log('initial response', response);
        return response?.body;
      })
      .then((stream) =>
        stream?.constructor?.name === 'ReadableStream'
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
          : (console.error(stream), new Error(`Unspecified error at ${origin}`)),
      )
      .catch((err: { response: any }) => {
        console.error('error', err);
        return Promise.reject(err);
      });
  };

  const fetchEventStream = (
    endpoint: string,
    submissionId?: string,
    onMessage?: Function,
  ): EventSource => {
    const eventSource = new EventSource(
			`${urlJoin(NEXT_PUBLIC_MUSE_API, endpoint)}?access_token=${token}${
				submissionId ? `&submissionId=${submissionId}` : ''
			}`,
			{
				withCredentials: true,
			},
		);

    eventSource.onmessage = function (event: MessageEvent) {
      console.log('New message', event);
      onMessage?.(JSON.parse(event.data));
    };

    eventSource.onopen = (event) => {
      console.log('Connection to Muse EventSource Established: Awaiting further details');
    };
    eventSource.onerror = (cause) => {
      console.error(cause);
    };

    return eventSource;
  };

  return {
    awaitingResponse,
    fetchEventStream,
    fetchMuseData,
    setAwaitingResponse,
  };
};

export default useMuseData;

export * from './types';
