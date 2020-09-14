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

import jwtDecode from 'jwt-decode';
import { memoize } from 'lodash';
import jwt from 'jsonwebtoken';

import { getConfig } from '../config';
import { EgoJwtData, UserWithId } from '../types';

const { NEXT_PUBLIC_EGO_PUBLIC_KEY } = getConfig();

const verifyJwt: (egoPublicKey: string) => (egoJwt?: string) => boolean = (egoPublicKey) => (
  egoJwt,
) => {
  try {
    if (!egoJwt || !egoPublicKey) {
      return false;
    } else {
      return jwt.verify(egoJwt, egoPublicKey, { algorithms: ['RS256'] }) && true;
    }
  } catch (err) {
    return false;
  }
};

export const isValidJwt = verifyJwt(NEXT_PUBLIC_EGO_PUBLIC_KEY);

export const decodeToken: (egoJwt?: string) => EgoJwtData | null = memoize((egoJwt) =>
  egoJwt && isValidJwt(egoJwt) ? jwtDecode(egoJwt) : null,
);

export const extractUser: (decodedToken: EgoJwtData) => UserWithId | undefined = (decodedToken) => {
  if (decodedToken) {
    return {
      ...decodedToken?.context.user,
      scope: decodedToken?.context.scope || [],
      id: decodedToken?.sub,
    };
  }
  return undefined;
};

export enum AccessLevel {
  READ = 'READ',
  WRITE = 'WRITE',
  DENY = 'DENY',
}

export type ScopeObj = {
  policy: string;
  accessLevel: AccessLevel;
};

export const isAccessLevel = (str: any): str is AccessLevel =>
  Object.values(AccessLevel).includes(str);

export const parseScope = (scope: string): ScopeObj => {
  const splitScope = scope.split('.');
  const accessLevel = splitScope[1];
  if (isAccessLevel(accessLevel)) {
    return {
      policy: splitScope[0],
      accessLevel,
    };
  } else {
    throw new Error(`invalid scope: ${scope}`);
  }
};
