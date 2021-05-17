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

import getNextConfig from 'next/config';

export const getConfig = (): Record<string, string> => {
  const publicConfig: { [k: string]: string } = getNextConfig()?.publicRuntimeConfig || {};

  return {
    NEXT_PUBLIC_EGO_API_ROOT: publicConfig.NEXT_PUBLIC_EGO_API_ROOT || 'http://localhost:8088',
    NEXT_PUBLIC_EGO_CLIENT_ID: publicConfig.NEXT_PUBLIC_EGO_CLIENT_ID || '',
    NEXT_PUBLIC_EGO_PUBLIC_KEY:
      publicConfig.EGO_PUBLIC_KEY ||
      `-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0lOqMuPLCVusc6szklNXQL1FHhSkEgR7An+8BllBqTsRHM4bRYosseGFCbYPn8r8FsWuMDtxp0CwTyMQR2PCbJ740DdpbE1KC6jAfZxqcBete7gP0tooJtbvnA6X4vNpG4ukhtUoN9DzNOO0eqMU0Rgyy5HjERdYEWkwTNB30i9I+nHFOSj4MGLBSxNlnuo3keeomCRgtimCx+L/K3HNo0QHTG1J7RzLVAchfQT0lu3pUJ8kB+UM6/6NG+fVyysJyRZ9gadsr4gvHHckw8oUBp2tHvqBEkEdY+rt1Mf5jppt7JUV7HAPLB/qR5jhALY2FX/8MN+lPLmb/nLQQichVQIDAQAB\r\n-----END PUBLIC KEY-----`,
    NEXT_PUBLIC_KEYCLOAK: publicConfig.NEXT_PUBLIC_KEYCLOAK || '',
    NEXT_PUBLIC_ARRANGER_PROJECT_ID: publicConfig.NEXT_PUBLIC_ARRANGER_PROJECT_ID || '',
    NEXT_PUBLIC_ARRANGER_GRAPHQL_FIELD: publicConfig.NEXT_PUBLIC_ARRANGER_GRAPHQL_FIELD || '',
    NEXT_PUBLIC_ARRANGER_INDEX: publicConfig.NEXT_PUBLIC_ARRANGER_INDEX || '',
    NEXT_PUBLIC_ARRANGER_API: publicConfig.NEXT_PUBLIC_ARRANGER_API || 'http://localhost:5050',
    NEXT_PUBLIC_ARRANGER_ADMIN_UI: publicConfig.NEXT_PUBLIC_ARRANGER_ADMIN_UI,
    NEXT_PUBLIC_ARRANGER_MANIFEST_COLUMNS: publicConfig.NEXT_PUBLIC_ARRANGER_MANIFEST_COLUMNS || '',
    NEXT_PUBLIC_BASE_PATH: publicConfig.NEXT_PUBLIC_BASE_PATH || '',
    NEXT_PUBLIC_ADMIN_EMAIL: publicConfig.NEXT_PUBLIC_ADMIN_EMAIL,
    NEXT_PUBLIC_LAB_NAME: publicConfig.NEXT_PUBLIC_LAB_NAME || 'Data Management System',
    NEXT_PUBLIC_LOGO_FILENAME: publicConfig.NEXT_PUBLIC_LOGO_FILENAME,
    NEXT_PUBLIC_MUSE_API: publicConfig.NEXT_PUBLIC_MUSE_API || '',
    NEXT_PUBLIC_SSO_PROVIDERS: publicConfig.NEXT_PUBLIC_SSO_PROVIDERS || '',
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: publicConfig.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
    NEXT_PUBLIC_SYSTEM_ALERT: publicConfig.NEXT_PUBLIC_SYSTEM_ALERT || '[]'    
  } as {
    NEXT_PUBLIC_EGO_API_ROOT: string;
    NEXT_PUBLIC_EGO_CLIENT_ID: string;
    NEXT_PUBLIC_EGO_PUBLIC_KEY: string;
    NEXT_PUBLIC_KEYCLOAK: string;
    NEXT_PUBLIC_ARRANGER_PROJECT_ID: string;
    NEXT_PUBLIC_ARRANGER_GRAPHQL_FIELD: string;
    NEXT_PUBLIC_ARRANGER_INDEX: string;
    NEXT_PUBLIC_ARRANGER_API: string;
    NEXT_PUBLIC_ARRANGER_ADMIN_UI: string;
    NEXT_PUBLIC_ARRANGER_MANIFEST_COLUMNS: string;
    NEXT_PUBLIC_BASE_PATH: string;
    NEXT_PUBLIC_ADMIN_EMAIL: string;
    NEXT_PUBLIC_LAB_NAME: string;
    NEXT_PUBLIC_LOGO_FILENAME: string;
    NEXT_PUBLIC_MUSE_API: string;
    NEXT_PUBLIC_SSO_PROVIDERS: string;
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: string;
    NEXT_PUBLIC_SYSTEM_ALERT: string
  };
};
