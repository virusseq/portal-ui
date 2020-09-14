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
import styled from '@emotion/styled';
import React from 'react';
import IconButton from './IconButton';

import defaultTheme from './theme';
import { Error as ErrorIcon } from './theme/icons';
import DismissIcon from './theme/icons/dismiss';

type ErrorSize = 'lg' | 'md' | 'sm';

const ERROR_SIZES = {
  LG: 'lg' as ErrorSize,
  MD: 'md' as ErrorSize,
  SM: 'sm' as ErrorSize,
};

const getIconDimensions = (size: ErrorSize) =>
  ({
    [ERROR_SIZES.LG]: { width: 26, height: 27 },
    [ERROR_SIZES.MD]: { width: 21, height: 22 },
    [ERROR_SIZES.SM]: { width: 18, height: 18 },
  }[size]);

const getContainerStyles = (size: ErrorSize) =>
  ({
    [ERROR_SIZES.LG]: `
      padding: 1rem 2rem;
      line-height: 26px;
    `,
    [ERROR_SIZES.MD]: `
      padding: 1rem;
      line-height: 24px;
    `,
    [ERROR_SIZES.SM]: `
      padding: 0.5rem;
      line-height: 20px;
      display: flex;
      align-items: center;
    `,
  }[size]);

const ErrorContentContainer = styled('div')`
  ${({ theme, size }: { theme: typeof defaultTheme; size: ErrorSize }) => css`
    border: 1px solid ${theme.colors.error_2};
    border-radius: 5px;
    ${theme.shadow.default};
    ${theme.typography.subheading};
    font-weight: normal;
    background-color: ${theme.colors.error_1};
    color: ${theme.colors.accent_dark};
    ${getContainerStyles(size)};
    max-width: 600px;
  `}
`;

const getIconStyle = (size: ErrorSize) =>
  ({
    [ERROR_SIZES.LG]: 'padding-right: 15px',
    [ERROR_SIZES.MD]: 'padding-right: 15px',
    [ERROR_SIZES.SM]: '',
  }[size]);

const getTitleStyle = (size: ErrorSize) =>
  ({
    [ERROR_SIZES.LG]: `
      margin: 0.5rem 0 1rem;
      font-size: 24px;
      line-height: 38px;
    `,
    [ERROR_SIZES.MD]: `
      margin: 0rem;
      padding-bottom: 0.4rem;
      font-size: 18px;
      line-height: 20px;
    `,
    [ERROR_SIZES.SM]: `
      margin: 0rem,
      line-height: 16px;
    `,
  }[size]);

const ErrorTitle = styled('h1')`
  ${({ size }: { size: ErrorSize }) => css`
    display: flex;
    align-items: center;
    ${getTitleStyle(size)}
  `}
`;

const ErrorNotification = ({
  children,
  title,
  size,
  styles = '',
  onDismiss,
  dismissible = false,
}: {
  children: React.ReactNode;
  title?: string;
  size: ErrorSize;
  styles?: string;
  onDismiss?: Function;
  dismissible?: boolean;
}) => (
  <div
    css={css`
      display: flex;
      flex: 1;
      ${styles}
    `}
  >
    <ErrorContentContainer size={size}>
      {title ? (
        <div>
          <ErrorTitle size={size}>
            <ErrorIcon
              {...getIconDimensions(size)}
              style={css`
                ${getIconStyle(size)}
              `}
            />{' '}
            {title}
            {dismissible && (
              <DismissIcon height={15} width={15} fill={defaultTheme.colors.error_dark} />
            )}
          </ErrorTitle>
          {children}
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
              {...getIconDimensions(size)}
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
              onClick={(e: React.MouseEvent) => (onDismiss ? onDismiss() : () => null)}
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
