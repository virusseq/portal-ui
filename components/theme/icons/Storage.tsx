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

import { css } from '@emotion/react';
import { ReactElement } from 'react';

import { IconProps } from './types';

const Storage = ({ fill = '#6885BA', height = 15, width = 15, style }: IconProps): ReactElement => {
  return (
    <svg
      css={css`
        ${style};
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
                  <g>
                    <path
                      d="M14.154 12c-.51 0-.923.412-.923.923 0 .51.412.923.923.923.51 0 .923-.412.923-.923 0-.51-.412-.923-.923-.923zM8 16.308c-5.175 0-8-1.32-8-2V9.852c1.683 1.01 4.855 1.533 8 1.533 3.145 0 6.317-.523 8-1.533v4.456c0 .68-2.825 2-8 2zm6.154-10.462c-.51 0-.923.412-.923.923 0 .511.412.923.923.923.51 0 .923-.412.923-.923 0-.51-.412-.923-.923-.923zM8 10.154c-5.175 0-8-1.32-8-2V3.698c1.683 1.01 4.855 1.533 8 1.533 3.145 0 6.317-.523 8-1.533v4.456c0 .68-2.825 2-8 2zM8 0c4.418 0 8 .895 8 2s-3.582 2-8 2-8-.895-8-2 3.582-2 8-2z"
                      transform="translate(-630 -437) translate(-31 -9) translate(0 73) translate(659 255) translate(2 109) translate(0 9)"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Storage;
