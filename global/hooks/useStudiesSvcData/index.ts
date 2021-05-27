import { useState } from 'react';
import { getConfig } from '../../config';
import useAuthContext from '../useAuthContext';
import urlJoin from 'url-join';
import { AddUserBody, CreateStudyBody, DeleteUserBody, Study } from './types';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: 'Bearer JWT',
};

const useStudiesSvcData = () => {
  const { NEXT_PUBLIC_STUDIES_SVC_URL } = getConfig();
  //   const { fetchWithAuth, token } = useAuthContext();
  const [awaitingResponse, setAwaitingResponse] = useState(false);

  const fetchStudies = () => {
    setAwaitingResponse(true);
    return fetch(urlJoin(NEXT_PUBLIC_STUDIES_SVC_URL, '/studies'), { method: 'GET', headers }).then(
      (res) => {
        setAwaitingResponse(false);
        return res.json();
      },
    );
  };

  const createStudy = (createStudyBody: CreateStudyBody) => {
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

  const addUser = (addUserBody: AddUserBody) => {
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

  const deleteSubmitter = (dub: DeleteUserBody) => {
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
