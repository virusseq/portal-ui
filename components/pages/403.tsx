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

import React from 'react';

import { DMS_EMAIL_SETTING_URL } from '../../global/utils/constants';
import providerMap from '../../global/utils/providerTypeMap';
import StyledLink from '../Link';
import { ErrorPageLayout } from '../PageLayout';
import { ProviderType } from '../../global/types';
import DMSAdminContact from '../DMSAdminContact';

enum EgoLoginError {
  NO_PRIMARY_EMAIL = 'no_primary_email',
  ACCESS_DENIED = 'access_denied',
}

const errorSubtitles: { [k in EgoLoginError]: string } = {
  no_primary_email: 'No Primary Email Found',
  access_denied: 'Unable to log in',
};

const isValidProviderType = (providerType: ProviderType) =>
  Object.values(ProviderType).includes(providerType);

const Error403 = ({ query }: { query: { error_type: EgoLoginError; provider_type?: string } }) => {
  const { error_type: errorType, provider_type: providerType } = query;
  const providerTypeDisplayName = isValidProviderType(providerType as ProviderType)
    ? providerMap[providerType as ProviderType].displayName
    : 'identity provider';

  switch (errorType) {
    case EgoLoginError.NO_PRIMARY_EMAIL:
      return (
        <ErrorPageLayout
          subtitle={`Error 403 - ${errorSubtitles[errorType]}`}
          errorTitle={`${errorSubtitles[errorType]}`}
        >
          No primary email could be found on your {providerTypeDisplayName} profile. An email is
          required to log in to the Data Explorer. Make sure an email exists on your{' '}
          {providerTypeDisplayName} profile and that it is accessible by external parties (i.e. not
          private). See{' '}
          <StyledLink href={DMS_EMAIL_SETTING_URL} target="_blank">
            here
          </StyledLink>{' '}
          for instructions on how to do this.
        </ErrorPageLayout>
      );
    case EgoLoginError.ACCESS_DENIED:
      return (
        <ErrorPageLayout
          subtitle={`Error 403 - ${errorSubtitles[errorType]}`}
          errorTitle={`${errorSubtitles[errorType]}`}
        >
          You have denied the DMS access to your {providerTypeDisplayName} profile or cancelled your
          log in attempt. Please try again and approve access for {providerTypeDisplayName}, or log
          in with a different provider for which you would prefer to allow access.
        </ErrorPageLayout>
      );
    default:
      return (
        <ErrorPageLayout
          subtitle="Error 403 - Permission required"
          errorTitle="Permission required"
        >
          You do not have permission to access the requested page. Please check that you have
          entered the correct URL. If the problem persists, contact the <DMSAdminContact /> for
          help.
        </ErrorPageLayout>
      );
  }
};

export default Error403;
