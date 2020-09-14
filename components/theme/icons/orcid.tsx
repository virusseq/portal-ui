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

const OrcidLogo = ({ width, height, style }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    css={css`
      width: ${width};
      height: ${height};
      ${style}
    `}
    width={width}
    height={height}
    viewBox="0 0 22 22"
  >
    <g fill="none" fillRule="evenodd">
      <g>
        <g>
          <g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <g fillRule="nonzero">
                        <path
                          fill="#A6CE39"
                          d="M22 11c0 6.076-4.924 11-11 11S0 17.076 0 11 4.924 0 11 0s11 4.924 11 11z"
                          transform="translate(-141 -488) translate(120 -25) translate(10) translate(0 273) translate(0 164) translate(0 66) translate(11 10)"
                        />
                        <g fill="#FFF">
                          <path
                            d="M1.573 12.048L.249 12.048.249 2.845 1.573 2.845 1.573 7.004 1.573 12.048zM3.515 2.845H7.09c3.403 0 4.898 2.432 4.898 4.606 0 2.363-1.847 4.606-4.881 4.606H3.515V2.845zm1.323 8.018h2.106c2.999 0 3.686-2.278 3.686-3.412 0-1.848-1.177-3.412-3.755-3.412H4.838v6.824zM1.779.928c0 .473-.387.868-.868.868S.043 1.401.043.928C.043.447.43.06.911.06s.868.395.868.868z"
                            transform="translate(-141 -488) translate(120 -25) translate(10) translate(0 273) translate(0 164) translate(0 66) translate(11 10) translate(5.844 3.953)"
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
      </g>
    </g>
  </svg>
);

export default OrcidLogo;
