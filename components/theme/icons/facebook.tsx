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

const FacebookLogo = ({ width, height, style }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    css={css`
      width: ${width};
      height: ${height};
      ${style};
    `}
    width={width}
    height={height}
    viewBox="0 0 11 20"
  >
    <g fill="none" fillRule="evenodd">
      <g fill="#3C5A9A" fillRule="nonzero">
        <g>
          <g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        d="M6.712 19.912v-9.083H9.76l.456-3.54H6.712V5.03c0-1.024.285-1.723 1.754-1.723h1.875V.138C10.016.096 8.904 0 7.609 0 4.907 0 3.057 1.65 3.057 4.679v2.61H0v3.54h3.057v9.083h3.655z"
                        transform="translate(-396 -423) translate(120 -25) translate(10) translate(0 273) translate(0 164) translate(249) translate(17.041 11.08)"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default FacebookLogo;
