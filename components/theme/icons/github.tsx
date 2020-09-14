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

const GitHubLogo = ({ width, height, style }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    css={css`
      width: ${width};
      height: ${height};
      ${style};
    `}
    width={width}
    height={height}
    viewBox="0 0 20 20"
  >
    <g fill="none" fillRule="evenodd">
      <g fill="#04518C">
        <g>
          <g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        d="M7.504 19.486v-1.743c-2.77.618-3.36-1.374-3.36-1.374-.173-.612-.556-1.143-1.08-1.5-.902-.633.07-.622.07-.622.646.094 1.21.485 1.529 1.055.534 1.03 1.798 1.43 2.826.897l.075-.042c.046-.517.27-1.003.632-1.374-2.215-.255-4.543-1.137-4.543-5.061-.018-1.014.35-1.997 1.026-2.75-.3-.884-.263-1.848.103-2.707 0 0 .837-.276 2.739 1.05 1.633-.462 3.363-.462 4.997 0 1.901-1.326 2.739-1.05 2.739-1.05.368.859.402 1.824.097 2.707.677.753 1.043 1.736 1.026 2.75 0 3.935-2.333 4.8-4.554 5.055.483.509.728 1.2.676 1.9v2.81c0 .335.178.59.686.492 4.115-1.455 6.853-5.37 6.811-9.743C20.065 4.649 15.6.066 10.023 0L9.973 0C4.396.071-.068 4.658.001 10.247c-.041 4.376 2.702 8.293 6.823 9.743.497.07.68-.244.68-.504"
                        transform="translate(-142 -555) translate(120 -25) translate(10) translate(0 273) translate(0 164) translate(0 132) translate(12 11)"
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

export default GitHubLogo;
