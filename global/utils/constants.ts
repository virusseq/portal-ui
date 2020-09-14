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

import urlJoin from 'url-join';

import { getConfig } from '../config';

const { NEXT_PUBLIC_EGO_API_ROOT } = getConfig();

export const EGO_JWT_KEY = 'EGO_JWT';
export const EGO_API_KEY_ENDPOINT = `${NEXT_PUBLIC_EGO_API_ROOT}/o/api_key`;

export const EXPLORER_PATH = '/explorer';
export const USER_PATH = '/user';
export const LOGIN_PATH = '/login';

// external docs links
const OVERTURE_DMS_DOCS_ROOT = 'https://overture.bio/documentation/dms/';
export const DMS_HELP_URL = urlJoin(OVERTURE_DMS_DOCS_ROOT, 'user-guide');
export const DMS_INSTALLATION_URL = urlJoin(OVERTURE_DMS_DOCS_ROOT, 'installation');
export const DMS_EMAIL_SETTING_URL = urlJoin(DMS_INSTALLATION_URL, 'configuration/prereq/emails');
