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

export enum UserStatus {
  APPROVED = 'APPROVED',
  DISABLED = 'DISABLED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

export enum UserType {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum Language {
  ENGLISH = 'English',
  FRENCH = 'French',
  SPANISH = 'Spanish',
}

export enum ProviderType {
  GOOGLE = 'GOOGLE',
  // FACEBOOK = 'FACEBOOK', // hide from allowed types, related to https://github.com/overture-stack/ego/issues/555
  GITHUB = 'GITHUB',
  LINKEDIN = 'LINKEDIN',
  ORCID = 'ORCID',
}

export interface User {
  email: string;
  type: UserType;
  status: UserStatus;
  firstName: string;
  lastName: string;
  createdAt: number;
  lastLogin: number;
  preferredLanguage?: Language;
  providerType: ProviderType;
  providerSubjectId: string;
  scope: string[];
}

export type EgoJwtData = {
  iat: number;
  exp: number;
  sub: string;
  iss: string;
  aud: string[];
  jti: string;
  context: {
    scope: string[];
    user: User;
  };
};

export interface UserWithId extends User {
  id: string;
}
