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

import { ReactElement, useEffect, useState } from 'react';
import { css, Global, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { isEmpty } from 'lodash';
import { Tooltip } from 'react-tippy';

import useAuthContext from '../../../global/hooks/useAuthContext';
import Button from '../../Button';
import DMSAdminContact, { GenericHelpMessage } from '../../DMSAdminContact';
import ErrorNotification from '../../ErrorNotification';
import NoScopes from '../../NoScopes';
import defaultTheme from '../../theme';
import { Checkmark } from '../../theme/icons';
import sleep from '../../utils/sleep';

const TooltipContainer = styled('div')`
  ${({ theme }: { theme?: typeof defaultTheme }) => css`
    ${theme?.typography.label};
    background: ${theme?.colors.grey_6};
    border-radius: 2px;
    padding: 2px 4px;
    color: white;
    font-weight: normal;
    margin-bottom: 10%;
    &:before {
      content: '';
      display: block;
      position: absolute;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      pointer-events: none;
      right: 50%;
      top: 79%;
      border-top-color: ${theme?.colors.grey_6};
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      margin-right: -5px;
    }
  `}
`;

enum TokenErrorType {
  SCOPES_ERROR = 'scopes_error',
  GENERATE_TOKEN_ERROR = 'generate_token_error',
  REVOKE_TOKEN_ERROR = 'revoke_token_error',
  FETCH_TOKENS_ERROR = 'fetch_tokens_error',
  NO_VALID_PERMISSIONS_ERROR = 'no_valid_permissions_error',
}

type ErrorResponse = {
  type: TokenErrorType;
  statusCode?: number;
};

const WithGenericHelpMessage = ({ requestError }: { requestError: string }) => {
  return (
    <span>
      {requestError}
      <GenericHelpMessage />
    </span>
  );
};

const getErrorMessage = ({ type, statusCode }: ErrorResponse) => {
  switch (type) {
    case TokenErrorType.SCOPES_ERROR:
      return (
        <WithGenericHelpMessage
          requestError={`HTTP error ${statusCode}: Error fetching current permissions. Your Access token could not be generated. `}
        />
      );
    case TokenErrorType.GENERATE_TOKEN_ERROR:
      return (
        <WithGenericHelpMessage
          requestError={`HTTP error ${statusCode}: Your Access token could not be generated. `}
        />
      );
    case TokenErrorType.REVOKE_TOKEN_ERROR:
      return (
        <WithGenericHelpMessage
          requestError={`HTTP error ${statusCode}: Your Access token could not be revoked. `}
        />
      );
    case TokenErrorType.FETCH_TOKENS_ERROR:
      return (
        <WithGenericHelpMessage
          requestError={`HTTP error ${statusCode}: Your existing Access tokens could not be fetched. `}
        />
      );
    case TokenErrorType.NO_VALID_PERMISSIONS_ERROR:
      return (
        <span>
          You do not have permissions to generate an Access token. Your permissions may have changed
          recently. Please contact the <DMSAdminContact /> to gain the correct permissions.
        </span>
      );
    default:
      return <WithGenericHelpMessage requestError={`Your request could not be completed. `} />;
  }
};

const ApiTokenInfo = (): ReactElement => {
  const { token, userHasWriteScopes } = useAuthContext();
  const [existingToken, setExistingToken] = useState<string | null>(null);
  const [isCopyingToken, setIsCopyingToken] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [requestError, setRequestError] = useState<ErrorResponse | null>(null);
  const theme: typeof defaultTheme = useTheme();

  // still need to display any errors for the generate request, as permissions may have changed in between
  // the time a user signed in and when they attempted to generate a token

  const copyApiToken = (text: string) => {
    setIsCopyingToken(true);
    navigator.clipboard
      .writeText(text)
      .then(async () => {
        await setIsCopyingToken(false);
        await setCopySuccess(true);
        await sleep();
        setCopySuccess(false);
      })
      .catch((err) => {
        console.warn('Failed to copy token! ', err);
        setIsCopyingToken(false);
      });
  };

  useEffect(() => {
    if (token) {
      setExistingToken(token);
    }
  }, [token]);

  return (
    <div>
      <h2
        css={css`
          ${theme.typography.regular};
          font-size: 24px;
          line-height: 40px;
          color: ${theme.colors.primary};
        `}
      >
        Access Token
      </h2>

      <div
        css={css`
          margin-bottom: 1rem;
          margin-top: 0.5rem;
        `}
      >
        {!userHasWriteScopes && <NoScopes />}
      </div>

      <ol
        css={css`
          ${theme.typography.subheading};
          font-weight: normal;
          color: ${theme.colors.accent_dark};
          margin-bottom: 1rem;
        `}
      >
        <li>Your access token is used to submit data through a command line client.</li>
        <li>
          Your access token is associated with your user credentials and should NEVER be shared with
          anyone.
        </li>
        <li>Your access token lasts only for 24 hours.</li>
      </ol>

      {requestError?.type && (
        <div
          css={css`
            margin: 1.5rem 0;
          `}
        >
          <ErrorNotification
            size="sm"
            css={css`
              background-color: ${theme.colors.error_1};
              color: ${theme.colors.accent_dark};
            `}
            dismissible
            onDismiss={() => setRequestError(null)}
          >
            <span
              css={css`
                font-size: 14px;
                display: block;
              `}
            >
              {getErrorMessage(requestError)}
            </span>
          </ErrorNotification>
        </div>
      )}

      <div
        css={css`
          position: relative;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-bottom: 1rem;
          margin-top: 1rem;
          max-width: 600px;
        `}
      >
        <div
          css={css`
            border: 1px solid ${theme.colors.grey_5};
            border-radius: 5px 0px 0px 5px;
            border-right: 0px;
            color: ${isEmpty(existingToken) ? theme.colors.grey_6 : theme.colors.black};
            width: 100%;
            display: flex;
            align-items: center;
            padding-left: 5px;
          `}
        >
          <span
            css={css`
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              ${theme.typography.subheading}
              font-weight: normal;
              padding-right: 5px;
              padding-left: 5px;
            `}
          >
            {existingToken || 'You have no Access token...'}
          </span>
        </div>
        <>
          <Global
            styles={css`
              .tippy-popper .leave {
                opacity: 0;
              }
            `}
          />
          <Tooltip
            unmountHTMLWhenHide
            open={copySuccess}
            arrow
            html={
              <TooltipContainer theme={theme} id="tooltip">
                Copied!
              </TooltipContainer>
            }
            position="top"
          >
            <Button
              disabled={isEmpty(existingToken) || isCopyingToken}
              css={() =>
                css`
                  border-radius: 0px 5px 5px 0px;
                  width: 69px;
                  height: 36px;
                  position: relative;
                `
              }
              onClick={() => token && copyApiToken(token)}
            >
              <span
                css={css`
                  position: absolute;
                  top: 8px;
                  left: 24px;
                  visibility: ${copySuccess ? 'visible' : 'hidden'};
                `}
              >
                <Checkmark size={20} fill={theme.colors.white} />
              </span>
              <span
                css={css`
                  visibility: ${copySuccess ? 'hidden' : 'visible'};
                `}
              >
                Copy
              </span>
            </Button>
          </Tooltip>
        </>
      </div>
    </div>
  );
};

export default ApiTokenInfo;
