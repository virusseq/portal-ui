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

const LinkedInLogo = ({ width, height, style }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    css={css`
      width: ${width};
      height: ${height};
      ${style};
    `}
    width={width}
    height={height}
    viewBox="0 0 20 19"
  >
    <g fill="none" fillRule="evenodd">
      <g fill="#0077B5">
        <g>
          <g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        d="M7.143 5.714h3.952V7.74h.057c.55-.987 1.897-2.026 3.903-2.026C19.228 5.714 20 8.311 20 11.69v6.882h-4.121v-6.1c0-1.454-.03-3.326-2.143-3.326-2.146 0-2.475 1.583-2.475 3.22v6.206H7.143V5.714zM4.286 2.143c0 1.183-.96 2.143-2.143 2.143C.96 4.286 0 3.326 0 2.143 0 .96.96 0 2.143 0c1.183 0 2.143.96 2.143 2.143zM0 5.714h4.286v12.857H0V5.714z"
                        transform="translate(-391 -490) translate(120 -25) translate(10) translate(0 273) translate(0 164) translate(249 66) translate(12 12)"
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

export default LinkedInLogo;
