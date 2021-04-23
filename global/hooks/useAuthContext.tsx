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

import { createContext, ReactElement, useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { EGO_JWT_KEY } from '../utils/constants';
import { decodeToken, extractUser, isValidJwt } from '../utils/egoTokenUtils';
import { getConfig } from '../config';
import { UserWithId } from '../types';

type T_AuthContext = {
  token?: string;
  logout: () => void;
  user?: UserWithId;
  userHasWriteScopes?: boolean;
  fetchWithAuth: typeof fetch;
};

const AuthContext = createContext<T_AuthContext>({
  token: undefined,
  logout: () => null,
  user: undefined,
  userHasWriteScopes: false,
  fetchWithAuth: fetch,
});

export const AuthProvider = ({
  egoJwt,
  children,
}: {
  egoJwt?: string;
  children: ReactElement;
}): ReactElement => {
  const { NEXT_PUBLIC_KEYCLOAK } = getConfig();
  const router = useRouter();
  // TODO: typing this state as `string` causes a compiler error. the same setup exists in argo but does not cause
  // a type issue. using `any` for now
  const [token, setTokenState] = useState(egoJwt);
  const removeToken = () => {
    localStorage.removeItem(EGO_JWT_KEY);
    setTokenState('');
  };

  const logout = () => {
    removeToken();
    router.push(`${NEXT_PUBLIC_KEYCLOAK}logout?redirect_uri=${window.location.origin}`);
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

  const userHasWriteScopes = user?.scope.some((scope) => scope.toLowerCase().includes('write'));

  const authData = {
    token,
    logout,
    user,
    userHasWriteScopes,
    fetchWithAuth,
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

const useAuthContext = (): T_AuthContext => useContext(AuthContext);
export default useAuthContext;
