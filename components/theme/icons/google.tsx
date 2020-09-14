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

import { css, SerializedStyles } from '@emotion/core';

const GoogleLogo = ({
  width,
  height,
  style,
}: {
  width: number;
  height: number;
  style?: SerializedStyles;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      css={css`
        width: ${width};
        height: ${height};
        ${style}
      `}
      width={width}
      height={height}
      viewBox="0 0 20 20"
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
                        <g>
                          <path
                            fill="#FBBB00"
                            d="M4.424 12.065l-.695 2.594-2.54.054c-1.56-2.905-1.587-6.391-.073-9.32l2.261.415.99 2.247c-.446 1.303-.426 2.72.055 4.01h.002z"
                            transform="translate(-142 -423) translate(120 -25) translate(10) translate(0 273) translate(0 164) translate(12 11)"
                          />
                          <path
                            fill="#518EF8"
                            d="M19.787 8.119c.69 3.626-.679 7.337-3.558 9.647l-2.846-.145-.403-2.516c1.176-.69 2.08-1.761 2.559-3.037h-5.34v-3.95h9.588z"
                            transform="translate(-142 -423) translate(120 -25) translate(10) translate(0 273) translate(0 164) translate(12 11)"
                          />
                          <path
                            fill="#28B446"
                            d="M16.228 17.766c-4.3 3.45-10.584 2.762-14.035-1.538-.38-.474-.716-.98-1.004-1.515l3.236-2.648c1.15 3.07 4.572 4.626 7.642 3.475.315-.118.62-.264.912-.434l3.249 2.66z"
                            transform="translate(-142 -423) translate(120 -25) translate(10) translate(0 273) translate(0 164) translate(12 11)"
                          />
                          <path
                            fill="#F14336"
                            d="M16.35 2.3l-3.232 2.648c-2.782-1.734-6.443-.884-8.176 1.898-.237.38-.43.785-.576 1.209L1.115 5.393C3.65.497 9.675-1.415 14.57 1.12c.634.328 1.231.724 1.78 1.18"
                            transform="translate(-142 -423) translate(120 -25) translate(10) translate(0 273) translate(0 164) translate(12 11)"
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
    </svg>
  );
};

export default GoogleLogo;
