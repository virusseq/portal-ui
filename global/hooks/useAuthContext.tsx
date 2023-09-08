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

import { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';


import { EGO_JWT_KEY } from '../utils/constants';
import { isValidJwt } from '../utils/egoTokenUtils';
import { getConfig } from '../config';
import { ProviderType, UserStatus, UserType, UserWithId } from '../types';
import { LogEventFunctionType } from './useTrackingContext';
import { useSession } from 'next-auth/react';

type T_AuthContext = {
  token?: string;
  logout: (logEvent: LogEventFunctionType) => void;
  user?: UserWithId;
  userHasWriteScopes?: boolean;
  userIsCurator?: boolean;
  userHasAccessToStudySvc?: boolean;
  userCanSubmitDataForAllStudy?: boolean;
  fetchWithAuth: typeof fetch;
};

const AuthContext = createContext<T_AuthContext>({
  token: undefined,
  logout: () => null,
  user: undefined,
  userHasWriteScopes: false,
  fetchWithAuth: fetch
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
    NEXT_PUBLIC_SCOPE_MUSE_STUDY_SYSTEM_WRITE,
  } = getConfig();
  const [token, setTokenState] = useState(egoJwt);
  const [user, setUser] = useState<UserWithId>();
  const [userHasWriteScopes, setUserHasWriteScopes] = useState(false);
  const [userCanSubmitDataForAllStudy, setUserCanSubmitDataForAllStudy] = useState(false);
  const [userHasAccessToStudySvc, setUserHasAccessToStudySvc] = useState(false);
  const [userIsCurator, setUserIsCurator] = useState(false);
  const { data: session } = useSession()

  useEffect(() => {
    if(session?.account){
      setTokenState(session?.account?.accessToken)
      const newUser: UserWithId = {
        id: session?.user?.sub,
        email: session?.user?.email,
        type: UserType.USER,
        status: UserStatus.APPROVED,
        firstName: session?.user?.firstName,
        lastName: session?.user?.lastName,
        createdAt: 0,
        lastLogin: 0,
        providerType: ProviderType.KEYCLOAK,
        providerSubjectId: "",
        scope: session?.scopes
      }
      setUser(newUser)

      setUserHasWriteScopes(session?.scopes.some((scope) => scope.toLowerCase().includes('write')) || false);

      setUserCanSubmitDataForAllStudy(session?.scopes.some(
        (scope) => scope.toLowerCase() === NEXT_PUBLIC_SCOPE_MUSE_STUDY_SYSTEM_WRITE.toLowerCase()
      ) || false);
    
      setUserHasAccessToStudySvc(session?.scopes.some(
        (scope) => scope.toLowerCase() === NEXT_PUBLIC_SCOPE_STUDY_SVC_WRITE.toLowerCase(),
      ) || false);
    
      setUserIsCurator(userHasAccessToStudySvc && userCanSubmitDataForAllStudy);

    } else {
      setTokenState("")
    }
  }, [session])

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
      headers: { ...options?.headers, accept: '*/*' },
      ...(options.method === 'GET' && { body: null }),
    });
  };

  const authData = {
    token,
    logout,
    user,
    userHasWriteScopes,
    userIsCurator,
    userHasAccessToStudySvc,
    userCanSubmitDataForAllStudy,
    fetchWithAuth,
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

const useAuthContext = (): T_AuthContext => useContext(AuthContext);
export default useAuthContext;
