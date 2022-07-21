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

import { MouseEvent, ReactElement } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import IconButton from '../IconButton';

import defaultTheme from '../theme';
import { Error as ErrorIcon } from '../theme/icons';
import DismissIcon from '../theme/icons/dismiss';

import { ErrorSize, getContainerStyles, getIconSize, getIconStyle, getTitleStyle } from './helpers';

const ErrorContentContainer = styled('div')`
  ${({ theme, size }: { theme?: typeof defaultTheme; size: ErrorSize }) => css`
    border-radius: 5px;
    ${theme?.typography.subheading};
    font-weight: normal;
    background-color: ${theme?.colors.error_1};
    color: ${theme?.colors.accent_dark};
    ${getContainerStyles(size)};
    max-width: 600px;
  `}
`;

const ErrorTitle = styled('h1')`
  ${({ size }: { size: ErrorSize }) => css`
    display: flex;
    align-items: center;
    ${getTitleStyle(size)}
  `}
`;

const ErrorNotification = ({
  children,
  className,
  title,
  size,
  styles = '',
  onDismiss = () => null,
  dismissible = false,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  size: ErrorSize;
  styles?: string;
  onDismiss?: (event: MouseEvent) => void;
  dismissible?: boolean;
}): ReactElement => (
  <div
    className={className}
    css={css`
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `}
  >
    <ErrorContentContainer
      css={css`
        ${styles}
      `}
      size={size}
    >
      {title ? (
        <div>
          <ErrorTitle size={size}>
            <ErrorIcon
              {...getIconSize(size)}
              style={css`
                ${getIconStyle(size)}
              `}
            />{' '}
            {title}
            {dismissible && (
              <DismissIcon height={15} width={15} fill={defaultTheme.colors.error_dark} />
            )}
          </ErrorTitle>

          <section
            css={css`
              padding-left: 40px;
            `}
          >
            {children}
          </section>
        </div>
      ) : (
        <div
          css={css`
            display: flex;
            flex-direction: row;
          `}
        >
          <span>
            <ErrorIcon
              {...getIconSize(size)}
              style={css`
                ${getIconStyle(size)}
              `}
            />
          </span>
          <div
            css={css`
              margin-left: 10px;
              margin-right: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            {children}
          </div>
          {dismissible && (
            <IconButton
              onClick={onDismiss}
              Icon={DismissIcon}
              height={12}
              width={12}
              fill={defaultTheme.colors.error_dark}
            />
          )}
        </div>
      )}
    </ErrorContentContainer>
  </div>
);

export default ErrorNotification;
