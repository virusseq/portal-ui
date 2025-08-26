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

import { useRouter } from 'next/router';
import { createContext, ReactElement, useContext, useState } from 'react';

import { getConfig } from '#global/config';
import { UserWithId } from '#global/types';
import { EGO_JWT_KEY } from '#global/utils/constants';
import { decodeToken, extractUser, isValidJwt } from '#global/utils/egoTokenUtils';

import { LogEventFunctionType } from './useTrackingContext';

type T_AuthContext = {
	token?: string;
	logout: (logEvent: LogEventFunctionType) => void;
	user?: UserWithId;
	userEnvironmentalWriteScopes: string[];
	userClinicalWriteScopes: string[];
	userIsCurator?: boolean;
	userIsEnvironmentalAdmin?: boolean;
	userHasAccessToStudySvc?: boolean;
	userHasClinicalAccess?: boolean;
	userHasEnvironmentalAccess?: boolean;
	userIsClinicalAdmin?: boolean;
	fetchWithAuth: typeof fetch;
};

const AuthContext = createContext<T_AuthContext>({
	token: undefined,
	logout: () => null,
	user: undefined,
	userClinicalWriteScopes: [],
	userEnvironmentalWriteScopes: [],
	fetchWithAuth: fetch,
});

export const AuthProvider = ({
	egoJwt,
	children,
}: {
	egoJwt?: string;
	children: ReactElement;
}): ReactElement => {
	const {
		NEXT_PUBLIC_KEYCLOAK,
		NEXT_PUBLIC_SCOPE_STUDY_SVC_WRITE,
		NEXT_PUBLIC_SCOPE_ENVIRONMENTAL_ADMIN_WRITE,
		NEXT_PUBLIC_SCOPE_ENVIRONMENTAL_PREFIX_WRITE,
		NEXT_PUBLIC_SCOPE_ENVIRONMENTAL_SUFFIX_WRITE,
		NEXT_PUBLIC_SCOPE_CLINICAL_ADMIN_WRITE,
		NEXT_PUBLIC_SCOPE_CLINICAL_PREFIX_WRITE,
		NEXT_PUBLIC_SCOPE_CLINICAL_SUFFIX_WRITE,
	} = getConfig();
	const [token, setTokenState] = useState(egoJwt);
	const router = useRouter();

	const removeToken = () => {
		localStorage.removeItem(EGO_JWT_KEY);
		setTokenState('');
	};

	const logout = (logEvent: LogEventFunctionType) => {
		removeToken();
		logEvent({
			category: 'User',
			action: 'Logged out using dropdown',
		});
		setTimeout(
			() => router.push(`${NEXT_PUBLIC_KEYCLOAK}logout?redirect_uri=${window.location.origin}`),
			2000,
		);
	};

	if (!token) {
		if (isValidJwt(egoJwt)) {
			setTokenState(egoJwt);
		}
	} else {
		if (!isValidJwt(token)) {
			if (egoJwt && token === egoJwt) {
				removeToken();
			}
		} else if (!egoJwt) {
			setTokenState('');
		}
	}

	const fetchWithAuth: T_AuthContext['fetchWithAuth'] = (url, options = { method: 'GET' }) => {
		return fetch(url, {
			...options,
			headers: { ...options?.headers, accept: '*/*', Authorization: `Bearer ${token || ''}` },
			...(options.method === 'GET' && { body: null }),
		});
	};

	const userInfo = token ? decodeToken(token) : null;
	const user = userInfo ? extractUser(userInfo) : undefined;

	const extractScopes = (
		scopes: string[] | undefined,
		prefix: string,
		suffix: string,
	): string[] => {
		if (!scopes) return [];

		const prefixLower = prefix.toLowerCase();
		const suffixLower = suffix.toLowerCase();

		return scopes
			.filter((scope) => {
				const lower = scope.toLowerCase();
				return lower.startsWith(prefixLower) && lower.endsWith(suffixLower);
			})
			.map((scope) => scope.slice(prefix.length, scope.length - suffix.length));
	};

	const userEnvironmentalWriteScopes = extractScopes(
		user?.scope,
		NEXT_PUBLIC_SCOPE_ENVIRONMENTAL_PREFIX_WRITE,
		NEXT_PUBLIC_SCOPE_ENVIRONMENTAL_SUFFIX_WRITE,
	);

	const userClinicalWriteScopes = extractScopes(
		user?.scope,
		NEXT_PUBLIC_SCOPE_CLINICAL_PREFIX_WRITE,
		NEXT_PUBLIC_SCOPE_CLINICAL_SUFFIX_WRITE,
	);

	const userIsClinicalAdmin = user?.scope.some(
		(scope) => scope.toLowerCase() === NEXT_PUBLIC_SCOPE_CLINICAL_ADMIN_WRITE.toLowerCase(),
	);

	const userHasAccessToStudySvc = user?.scope.some(
		(scope) => scope.toLowerCase() === NEXT_PUBLIC_SCOPE_STUDY_SVC_WRITE.toLowerCase(),
	);

	const userIsEnvironmentalAdmin = user?.scope.some(
		(scope) => scope.toLowerCase() === NEXT_PUBLIC_SCOPE_ENVIRONMENTAL_ADMIN_WRITE.toLowerCase(),
	);

	const userIsCurator = userHasAccessToStudySvc && userIsClinicalAdmin && userIsEnvironmentalAdmin;

	const userHasClinicalAccess = !!(userIsCurator || userClinicalWriteScopes.length > 0);
	const userHasEnvironmentalAccess = !!(
		userIsEnvironmentalAdmin || userEnvironmentalWriteScopes.length > 0
	);

	const authData = {
		token,
		logout,
		user,
		userEnvironmentalWriteScopes,
		userClinicalWriteScopes,
		userIsCurator,
		userIsEnvironmentalAdmin,
		userHasAccessToStudySvc,
		userHasClinicalAccess,
		userHasEnvironmentalAccess,
		userIsClinicalAdmin,
		fetchWithAuth,
	};

	return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

const useAuthContext = (): T_AuthContext => useContext(AuthContext);
export default useAuthContext;
