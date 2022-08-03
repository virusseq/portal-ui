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

import { ReactElement } from 'react';
import { css } from '@emotion/react';

import { IconProps } from './types';

const MapleLeaf = ({
  fill = '#D93738',
  height = 35,
  width = 31,
  style,
}: IconProps): ReactElement => {
  return (
    <svg
      css={css`
        ${style};
        height: ${height};
        width: ${width};
      `}
      width={width}
      height={height}
      viewBox={'0 0 31 35'}
    >
      <g fill="none" fillRule="evenodd">
        <g fill={fill}>
          <g>
            <g>
              <g>
                <g>
                  <path
                    d="M15.5 0l-2.708 5.278c-.307.574-.857.52-1.408.2l-1.96-1.06 1.46 8.107c.308 1.481-.678 1.481-1.164.841L6.3 9.363l-.556 2.033c-.064.267-.345.547-.768.48l-4.325-.95 1.136 4.318c.243.96.433 1.358-.245 1.612L0 17.613l7.445 6.323c.295.239.444.669.34 1.058l-.653 2.236c2.564-.31 4.863-.586 7.426-.894.228-.003.605.2.604.474l-.34 8.19h1.247l-.196-8.173c-.002-.274.34-.494.568-.491l7.426.894-.651-2.236c-.105-.39.044-.82.338-1.058L31 17.613l-1.542-.757c-.678-.254-.489-.652-.245-1.612l1.136-4.318-4.325.95c-.423.067-.704-.213-.768-.48L24.7 9.363l-3.42 4.003c-.487.64-1.472.64-1.165-.84l1.461-8.109-1.96 1.062c-.55.32-1.1.373-1.408-.2L15.5 0z"
                    transform="translate(-590 -115) translate(-31 -9) translate(0 73) translate(621 47) translate(0 4)"
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

export default MapleLeaf;
