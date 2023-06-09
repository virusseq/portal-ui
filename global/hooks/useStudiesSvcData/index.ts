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
import useAuthContext from '../useAuthContext';

import {
	AddSubmitterReq,
	CreateStudyReq,
	RemoveSubmitterReq,
	ErrorType,
	StudiesSvcRes,
	Study,
} from './types';

function isValidErrorType(type: any): type is ErrorType {
	return typeof type === 'string' && Object.values(ErrorType).includes(type as ErrorType);
}

function convertToStudiesRes<T>(obj: any | undefined): StudiesSvcRes<T> {
	const success = (obj && obj.success) || false;
	if (success) {
		return { success, data: obj.data };
	}

	const { type, studyId, submitters } = obj.error;

	return {
		success,
		error: {
			type: isValidErrorType(type) ? type : ErrorType.UNKNOWN,
			studyId: studyId || '',
			submitters: submitters || [],
		},
	};
}

const APP_JSON_HEADER = {
	'Content-Type': 'application/json',
};

const useStudiesSvcData = () => {
	const { NEXT_PUBLIC_STUDIES_SVC_URL } = getConfig();
	const { fetchWithAuth } = useAuthContext();
	const [awaitingResponse, setAwaitingResponse] = useState(false);

	const wrapWithHandlers = <T>(promise: Promise<Response>) => {
		setAwaitingResponse(true);
		return promise
			.then((res) => res.json())
			.then((body) => {
				setAwaitingResponse(false);
				return convertToStudiesRes<T>(body);
			})
			.catch((err) => {
				setAwaitingResponse(false);
				return convertToStudiesRes<T>({ success: false, error: { type: ErrorType.UNKNOWN } });
			});
	};

	const fetchStudies = (): Promise<StudiesSvcRes<Study[]>> => {
		const promise = fetchWithAuth(urlJoin(NEXT_PUBLIC_STUDIES_SVC_URL, '/studies'), {
			method: 'GET',
		});
		return wrapWithHandlers(promise);
	};

	const createStudy = (createStudyReq: CreateStudyReq): Promise<StudiesSvcRes<undefined>> => {
		console.log(createStudyReq);
		const promise = fetchWithAuth(urlJoin(NEXT_PUBLIC_STUDIES_SVC_URL, '/studies'), {
			method: 'POST',
			headers: APP_JSON_HEADER,
			body: JSON.stringify(createStudyReq),
		});
		return wrapWithHandlers(promise);
	};

	const addSubmitterToStudy = (
		addSubmitterReq: AddSubmitterReq,
	): Promise<StudiesSvcRes<undefined>> => {
		const promise = fetchWithAuth(urlJoin(NEXT_PUBLIC_STUDIES_SVC_URL, '/studies/submitters'), {
			method: 'POST',
			headers: APP_JSON_HEADER,
			body: JSON.stringify(addSubmitterReq),
		});
		return wrapWithHandlers(promise);
	};

	const removeSubmitterFromStudy = (
		removeSubmitterReq: RemoveSubmitterReq,
	): Promise<StudiesSvcRes<undefined>> => {
		const url = urlJoin(
			NEXT_PUBLIC_STUDIES_SVC_URL,
			`/studies/submitters?studyId=${removeSubmitterReq.studyId}&submitter=${removeSubmitterReq.submitter}`,
		);
		const promise = fetchWithAuth(url, { method: 'DELETE' });
		return wrapWithHandlers(promise);
	};

	return {
		awaitingResponse,
		fetchStudies,
		createStudy,
		addSubmitterToStudy,
		removeSubmitterFromStudy,
	};
};

export default useStudiesSvcData;
