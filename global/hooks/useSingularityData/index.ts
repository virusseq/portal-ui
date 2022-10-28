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

import { getConfig } from '@/global/config';
import processStream from '@/global/utils/processStream';

import {
  Archive,
  ArchivesFetchReq,
  ArchivesFetchRes,
  ContributorsResponse,
  SingularityErrorResponse,
  TotalCounts,
} from './types';

const DEFAULT_FAILED_ARCHIVE: Archive = {
  id: 'FAILED TO CREATE',
  object_id: '',
  status: 'FAILED',
  numOfDownloads: 0,
  numOfSamples: 0,
  type: 'SET_QUERY',
  hash: '',
  hashInfo: '',
  created_at: 0,
};

const logErrorAndReject = (err: any) => {
  console.error('error', err);
  return Promise.reject(err);
};

const useSingularityData = () => {
  const { NEXT_PUBLIC_SINGULARITY_API_URL } = getConfig();
  const [awaitingResponse, setAwaitingResponse] = useState(false);

  // For reference: https://singularity.dev.cancogen.cancercollaboratory.org/swagger-ui/
  const fetchContributors = () => {
    setAwaitingResponse(true);

    return fetch(urlJoin(NEXT_PUBLIC_SINGULARITY_API_URL, '/contributors'), {
      method: 'GET',
    })
      .then((response) => {
        return response?.body;
      })
      .then((stream) =>
        stream?.constructor?.name === 'ReadableStream'
          ? processStream(origin, stream.getReader())()
              .then((parsedStream: string) => {
                setAwaitingResponse(false);
                // TODO: create dev mode
                // console.log('parsedStream', parsedStream)
                return parsedStream && (JSON.parse(parsedStream) as ContributorsResponse);
              })
              .catch((error: Error | string) => {
                console.log(`Offending stream at ${origin}`, stream);
                console.error(error);
                return error;
              })
          : (console.error(stream), new Error(`Unspecified error at ${origin}`)),
      )
      .catch((err: { response: SingularityErrorResponse }) => {
        console.error('error', err);
        return Promise.reject(err);
      });
  };

  const fetchTotalCounts = (): Promise<TotalCounts> => {
    setAwaitingResponse(true);

    return fetch(urlJoin(NEXT_PUBLIC_SINGULARITY_API_URL, '/aggregations/total-counts'))
      .then((res) => {
        if (res.status !== 200) {
          throw Error("Couldn't fetch total-counts!");
        }
        return res.json();
      })
      .catch((err: { response: SingularityErrorResponse }) => {
        console.error('error', err);
        return Promise.reject(err);
      })
      .finally(() => setAwaitingResponse(false)) as Promise<TotalCounts>;
  };

  const fetchCompletedArchiveAllInfos = (req?: ArchivesFetchReq): Promise<ArchivesFetchRes> => {
    const params = req
      ? '?' +
        Object.entries(req)
          .filter(([k, v]) => v !== undefined)
          .map(([k, v]) => `${k}=${v}`)
          .join('&')
      : '';

    setAwaitingResponse(true);

    return fetch(urlJoin(NEXT_PUBLIC_SINGULARITY_API_URL, '/archives', params))
      .then((res) => {
        setAwaitingResponse(false);
        if (res.status !== 200) {
          throw Error("Couldn't fetch archives!");
        }
        return res.json();
      })
      .catch((err: { response: SingularityErrorResponse }) => {
        console.error('error', err);
        return Promise.reject(err);
      }) as Promise<ArchivesFetchRes>;
  };

  const fetchLatestArchiveAllInfo = (): Promise<Archive> => {
    return fetchCompletedArchiveAllInfos({
      size: 1,
      page: 0,
      sortDirection: 'DESC',
      sortField: 'createdAt',
      status: 'COMPLETE',
    }).then((res) => {
      if (res.content[0]) {
        return res.content[0];
      } else {
        return DEFAULT_FAILED_ARCHIVE;
      }
    });
  };

  const startArchiveBuildBySetId = (setId: string): Promise<Archive> => {
    return fetch(urlJoin(NEXT_PUBLIC_SINGULARITY_API_URL, '/build-archive/set-query'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ setId: setId }),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw Error("Couldn't build archive!");
        }
        return res.json();
      })
      .catch((err: any) => {
        console.log('error', err);
        return DEFAULT_FAILED_ARCHIVE;
      }) as Promise<Archive>;
  };

  const findArchiveById = (archiveId: string): Promise<Archive> => {
    return fetch(urlJoin(NEXT_PUBLIC_SINGULARITY_API_URL, '/archives/', archiveId))
      .then((res) => {
        if (res.status !== 200) {
          throw Error("Couldn't find archive!");
        }
        return res.json();
      })
      .catch((err: any) => {
        console.log('error', err);
        return DEFAULT_FAILED_ARCHIVE;
      }) as Promise<Archive>;
  };

  return {
    awaitingResponse,
    fetchContributors,
    fetchTotalCounts,
    fetchCompletedArchiveAllInfos,
    fetchLatestArchiveAllInfo,
    setAwaitingResponse,
    startArchiveBuildBySetId,
    findArchiveById,
  };
};

export default useSingularityData;

export * from './types';
