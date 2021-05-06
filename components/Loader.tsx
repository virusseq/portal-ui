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

import { ReactElement, ReactNode, ReactNodeArray } from 'react';
import { css, SerializedStyles } from '@emotion/react';

const Loader = ({
  inline = false,
  margin = 'auto',
  message = '',
  overlay = false,
  size = '120px',
}): ReactElement => {
  const unit = size.replace(/\d+/, '');
  const stroke = `${Number(size.match(/\d+/)?.pop()) * 0.35}${unit}`;

  return (
    <div
      css={(theme) => css`
        border: ${stroke} solid ${theme.colors.grey_3};
        border-top: ${stroke} solid ${theme.colors.secondary_dark};
        border-radius: 50%;
        display: ${inline ? 'inline-' : ''}block;
        // height: min(100%, ${size});
        height: ${size};
        width: ${size};
        margin: ${margin};
        animation: spin 2s linear infinite;
        z-index: 1;

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        ${overlay &&
        `
          position: absolute;
          top: 50%;
          left: 50%;
          margin: calc(-${size} / 2) 0 0 calc(-${size} / 2);
        `}
      `}
    />
  );
};

export const LoaderMessage = ({
  inline = false,
  margin = '0',
  message = 'Loading...',
  size = '20px',
}: {
  inline?: boolean;
  margin?: string;
  message?: string;
  size?: string;
}): ReactElement => (
  <div
    css={(theme) => css`
      align-items: center;
      display: flex;
      flex-direction: ${inline ? 'row' : 'column'}
      justify-content: center;
      width: fit-content;
    `}
  >
    <Loader inline margin={inline ? '0 10px 0 0' : '0 0 10px'} size={size} />
    <span>{message}</span>
  </div>
);

export const LoaderWrapper = ({
  children,
  loaderSize,
  loading = false,
  message = '',
  size = '30px',
  style,
}: {
  children?: ReactNode | ReactNodeArray;
  loaderSize?: string;
  loading?: boolean;
  message?: ReactNode | ReactNodeArray;
  size?: string;
  style?: SerializedStyles;
}): ReactElement => (
  <div
    css={(theme) => css`
      position: relative;
      ${style}

      &::after {
        background: ${theme.colors.white};
        ${loading && 'content: "";'}
        height: 100%;
        opacity: 80%;
        position: absolute;
        top: 0;
        width: 100%;
      }
    `}
  >
    {children}

    {loading &&
      (message ? (
        <figure
          css={(theme) => css`
            background: ${theme.colors.white};
            border: 1px solid ${theme.colors.grey_3};
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            left: 50%;
            margin: 0;
            max-height: 100%;
            max-width: 400px;
            padding: 20px;
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            z-index: 1;

            figcaption {
              box-sizing: border-box;
              color: ${theme.colors.primary};
              font-size: 14px;
              margin: 20px 0 0;
              overflow: auto;
              text-align: center;
              width: 100%;
            }
          `}
        >
          <Loader size={size} />
          <figcaption>{message}</figcaption>
        </figure>
      ) : (
        <Loader overlay size={size} />
      ))}
  </div>
);

export default Loader;
