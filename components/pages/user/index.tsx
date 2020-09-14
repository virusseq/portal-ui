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
import React from 'react';
import { isEmpty } from 'lodash';
import styled from '@emotion/styled';

import PageLayout from '../../PageLayout';
import { OvertureUser } from '../../theme/icons';
import defaultTheme from '../../theme';
import useAuthContext from '../../../global/hooks/useAuthContext';
import AuthenticatedBadge from './AuthenticatedBadge';
import ApiTokenInfo from './ApiTokenInfo';

const StyledPageLayout = styled(PageLayout)`
  ${({ theme }: { theme: typeof defaultTheme }) =>
    css`
      background-color: ${theme.colors.white};
    `}
`;

const FlexDiv = styled('div')`
  display: flex;
`;

const UserInfoContainer = styled(FlexDiv)`
  ${({ theme }: { theme: typeof defaultTheme }) => css`
    flex-direction: row;
    justify-content: space-between;
    width: 800px;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    padding-bottom: 2.5rem;
    border-bottom: 1px solid ${theme.colors.grey_3};
  `}
`;

const UserTitle = styled('h1')`
  ${({ theme }: { theme: typeof defaultTheme }) => css`
    ${theme.typography.regular};
    font-size: 30px;
    line-height: 36px;
    color: ${theme.colors.accent_dark};
    margin-bottom: 0.5rem;
    margin-top: 0.1rem;
  `}
`;

const UserEmail = styled('div')`
  ${({ theme }: { theme: typeof defaultTheme }) => css`
    ${theme.typography.subheading};
    color: ${theme.colors.accent_dark};
    font-weight: normal;
    padding-left: 0.2rem;
  `}
`;

const UserComponent = () => {
  const { user } = useAuthContext();
  return (
    <StyledPageLayout subtitle="User Profile & Token">
      <FlexDiv
        css={css`
          justify-content: center;
        `}
      >
        {user && (
          <FlexDiv
            css={css`
              flex-direction: column;
              margin: 1rem 2rem;
              width: 800px;
            `}
          >
            <UserInfoContainer>
              <FlexDiv
                css={css`
                  flex-direction: row;
                `}
              >
                <OvertureUser width={75} height={84} />
                <div
                  css={css`
                    margin-left: 1rem;
                  `}
                >
                  <UserTitle>{`${user.firstName} ${user.lastName}`}</UserTitle>
                  <UserEmail>{user.email || ''}</UserEmail>
                </div>
              </FlexDiv>
              <AuthenticatedBadge provider={user.providerType} />
            </UserInfoContainer>
            <ApiTokenInfo />
          </FlexDiv>
        )}
      </FlexDiv>
    </StyledPageLayout>
  );
};

export default UserComponent;
