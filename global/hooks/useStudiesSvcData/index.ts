/*
 *
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
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
import { getConfig } from '../../config';
import useAuthContext from '../useAuthContext';
import urlJoin from 'url-join';
import { AddUserReq, CreateStudyReq, DeleteUserReq, Study } from './types';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization:
    'Bearer eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MjE1MjY5ODksImV4cCI6MTYyMzY3NDQ3Miwic3ViIjoiNzdmMWVmNzgtNzQ5NS00YjRhLTk4MmEtNmI5NTMyZGM2OWZiIiwiaXNzIjoiZWdvIiwianRpIjoiMDVmODQ4YTItMjZlNy00YjRhLWE4NjMtNzg0MDk0NTk0MWQwIiwiY29udGV4dCI6eyJzY29wZSI6WyJET01BSU4uV1JJVEUiLCJzb25nLlJFQUQiLCJpZC5XUklURSIsInNjb3JlLlJFQUQiLCJpZC5SRUFEIiwic2NvcmUuV1JJVEUiLCJzb25nLldSSVRFIiwiRE9NQUlOLlJFQUQiXSwiYXBwbGljYXRpb24iOnsibmFtZSI6ImFkbWluSWQiLCJjbGllbnRJZCI6ImFkbWluSWQiLCJyZWRpcmVjdFVyaSI6Imh0dHA6Ly9leGFtcGxlLmNvbSIsImRlc2NyaXB0aW9uIjoic29uZ1Njb3JlQWRtaW4iLCJzdGF0dXMiOiJBUFBST1ZFRCIsInR5cGUiOiJDTElFTlQifX19.kyehofFmhwe0V_A1hGLsLxDvYqQ43vnAEa2t4h1LWhYxfHcOeUlOdRbgXAxh7YjrPQ4AFi2SZs1J__ikoVdcljBIcn8KYGV8OXsESQM2bwCLZttAJJJhyHYHUl78_3vpGLI3hBkxubqkZm09Jbqo7vB9vJ0tAYxZeKSLO_er1SA69VrrWO7Rx4ayGQ7B7_4DnfUBWW8KgniLVQZDv_mXzUfUIJIQW-Ux3gufZvw10Y2CKAAeVOk4Y7hsoqunTA4n2d8oNUj86LwiGR8RryhYrsI-0kZyWh5ywdJ4iVtXD7YmCu_npej2naskRPmE3egH7dkykN4V3oIEoZ4QCPELyA',
};

const useStudiesSvcData = () => {
  const { NEXT_PUBLIC_STUDIES_SVC_URL } = getConfig();
  //   const { fetchWithAuth, token } = useAuthContext();
  const [awaitingResponse, setAwaitingResponse] = useState(false);

  const fetchStudies = () => {
    setAwaitingResponse(true);
    return fetch(urlJoin(NEXT_PUBLIC_STUDIES_SVC_URL, '/studies'), { method: 'GET', headers })
      .then((res) => {
        setAwaitingResponse(false);
        return res.json();
      })
      .catch((err) => {
        return [];
      });
  };

  const createStudy = (createStudyBody: CreateStudyReq) => {
    setAwaitingResponse(true);
    return fetch(urlJoin(NEXT_PUBLIC_STUDIES_SVC_URL, '/studies'), {
      method: 'POST',
      headers,
      body: JSON.stringify(createStudyBody),
    }).then((res) => {
      setAwaitingResponse(false);
      return res.json();
    });
  };

  const addUser = (addUserBody: AddUserReq) => {
    setAwaitingResponse(true);
    return fetch(urlJoin(NEXT_PUBLIC_STUDIES_SVC_URL, '/studies/submitters'), {
      method: 'POST',
      headers,
      body: JSON.stringify(addUserBody),
    }).then((res) => {
      setAwaitingResponse(false);
      return res.json();
    });
  };

  const deleteSubmitter = (dub: DeleteUserReq) => {
    setAwaitingResponse(true);
    const url = urlJoin(
      NEXT_PUBLIC_STUDIES_SVC_URL,
      `/studies/submitters?studyId=${dub.studyId}&submitter=${dub.submitter}`,
    );
    return fetch(url, {
      method: 'DELETE',
      headers,
    }).then((res) => {
      setAwaitingResponse(false);
      return res.json();
    });
  };

  return { awaitingResponse, fetchStudies, createStudy, addUser, deleteSubmitter };
};

export default useStudiesSvcData;
