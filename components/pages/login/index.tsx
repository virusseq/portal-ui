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

import { css } from '@emotion/core';
import urlJoin from 'url-join';

import PageLayout from '../../PageLayout';
import { Illustration } from '../../theme/icons';

import { IconProps } from '../../theme/icons/types';
import { getConfig } from '../../../global/config';

import { usePageQuery } from '../../../global/hooks/usePageContext';
import { trim } from 'lodash';
import ErrorNotification from '../../ErrorNotification';
import providerMap, { ProviderDetail } from '../../../global/utils/providerTypeMap';
import { ProviderType } from '../../../global/types';

const LoginButton = ({
  Icon,
  title,
  path,
}: {
  Icon: React.ComponentType<IconProps>;
  title: string;
  path: string;
}) => {
  const { NEXT_PUBLIC_EGO_API_ROOT, NEXT_PUBLIC_EGO_CLIENT_ID } = getConfig();
  const url = `${urlJoin(
    NEXT_PUBLIC_EGO_API_ROOT,
    '/oauth/login',
    path,
  )}?client_id=${NEXT_PUBLIC_EGO_CLIENT_ID}`;
  const disabled = !path;
  return (
    <a
      href={url}
      css={css`
        text-decoration: none;
      `}
    >
      <div
        css={(theme) => css`
          display: flex;
          width: 225px;
          height: 42px;
          border-radius: 5px;
          border: 1px solid ${theme.colors.accent};
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          opacity: ${disabled ? 0.4 : 1};
          &:hover {
            border: 1px solid ${theme.colors.accent_dark};
          }
        `}
      >
        <span
          css={css`
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
          `}
        >
          <Icon width={20} height={20} />
        </span>
        <span
          css={(theme) =>
            css`
              display: flex;
              flex: 4;
              justify-content: center;
              align-items: center;
              background-color: ${theme.colors.accent};
              color: ${theme.colors.white};
              ${theme.typography.button}
              border-radius: 0 3px 3px 0;
              &:hover {
                background-color: ${theme.colors.accent_dark};
                color: ${theme.colors.white};
              }
            `
          }
        >
          {title}
        </span>
      </div>
    </a>
  );
};

const LoginPage = () => {
  const query = usePageQuery();
  const { NEXT_PUBLIC_SSO_PROVIDERS } = getConfig();

  const configuredProviders = NEXT_PUBLIC_SSO_PROVIDERS.length
    ? NEXT_PUBLIC_SSO_PROVIDERS.split(',').map((p: string) => trim(p))
    : [];
  // typing p arg as 'any' because typescript complains with 'string'
  // check configured providers are valid ProviderTypes
  const providers: ProviderDetail[] = configuredProviders
    .filter((p: any) => Object.values(ProviderType).includes(p))
    .map((provider: string) => providerMap[provider as ProviderType]);

  return (
    <PageLayout subtitle="Login">
      <div
        css={css`
          display: flex;
          flex: 1;
          flex-direction: row;
          position: relative;
        `}
      >
        <div
          css={(theme) =>
            css`
              display: flex;
              flex: 3;
              background-color: ${theme.colors.white};
              flex-direction: column;
              justify-content: center;
              padding-left: 5rem;
            `
          }
        >
          <h1
            css={(theme) =>
              css`
                ${theme.typography.heading}
                font-size: 40px;
                line-height: 0;
                color: ${theme.colors.accent_dark};
              `
            }
          >
            Log in
          </h1>
          {query.session_expired && (
            <div
              css={css`
                height: 70px;
                margin: 1rem 0;
              `}
            >
              <ErrorNotification size="md" title="Session Expired">
                Your session has expired. Please log in again.
              </ErrorNotification>
            </div>
          )}
          <span
            css={(theme) => css`
              display: block;
              max-width: 475px;
              ${theme.typography.heading}
              color: ${theme.colors.accent_dark};
              margin: 10px 0;
              font-weight: normal;
            `}
          >
            Please choose one of the following log in methods to access your API token for data
            download:
          </span>
          {providers.length ? (
            <ul
              css={css`
                width: 400px;
                max-height: 400px;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                row-gap: 15px;
                column-gap: 15px;
                padding-inline-start: 0;
              `}
            >
              {providers.map(({ displayName, icon, path }) => {
                return (
                  <li
                    key={displayName}
                    css={css`
                      list-style: none;
                    `}
                  >
                    <LoginButton Icon={icon} title={`Log in with ${displayName}`} path={path} />
                  </li>
                );
              })}
            </ul>
          ) : (
            <div
              css={css`
                height: 50px;
                width: 400px;
              `}
            >
              <ErrorNotification size="md" title="No Configured Providers">
                No identity providers have been configured. Please check you dms configuration file.
              </ErrorNotification>
            </div>
          )}
        </div>
        <div
          css={css`
            display: flex;
            flex: 2;
            @media screen and (max-width: 1250px) {
              display: none;
            }
          `}
        >
          <div
            css={(theme) => css`
              flex: 1;
              background-color: ${theme.colors.primary};
            `}
          />
          <div
            css={css`
              position: absolute;
              right: 190px;
              top: 50px;
            `}
          >
            <Illustration width={559} height={538} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LoginPage;
