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
import { IconProps } from './types';
import theme from '../';

const Warning = ({ height, width, style, fill = theme.colors.error_dark }: IconProps) => {
  return (
    <svg
      css={css`
        ${style}
        height: ${height};
        width: ${width};
      `}
      width={width}
      height={height}
      viewBox={'0 0 16 16'}
    >
      <g fill="none" fillRule="evenodd">
        <g fill={fill}>
          <g>
            <g>
              <g>
                <g>
                  <path
                    d="M7.843 12.556c-1.239 0-2.243.994-2.243 2.222C5.6 16.005 6.604 17 7.843 17c1.239 0 2.242-.995 2.242-2.222 0-1.228-1.003-2.222-2.242-2.222M7.843 1C6.604 1 5.6 1.995 5.6 3.222l.449 6.667c0 .982.803 1.778 1.794 1.778.99 0 1.794-.796 1.794-1.778l.448-6.667C10.085 1.995 9.082 1 7.843 1"
                    transform="translate(-392 -458) translate(367 271.17) translate(25 186)"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Warning;
