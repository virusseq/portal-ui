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

import { ReactElement } from 'react';
import { css } from '@emotion/core';

import { IconProps } from './types';
import theme from '../';

const DragAndDrop = ({
  fill = theme.colors.primary,
  height = 34,
  width = 37,
  style,
}: IconProps): ReactElement => (
  <svg
    css={css`
      ${style};
      height: ${height}px;
      width: ${width}px;
    `}
    height={height}
    width={width}
    viewBox={`0 0 37 34`}
  >
    <g fill="none" fillRule="evenodd">
      <g fill={fill}>
        <path
          d="M19.481 29.499v-1.823h1.32v1.823h-1.32zm0 1.822h1.32v1.961h-1.98v-1.308h.66v-.653zm-5.472 1.961v-1.307h2.407v1.307h-2.407zm-9.624 0v-1.307H6.79v1.307H4.385zm4.812 0v-1.307h2.407v1.307H9.197zM0 31.321h1.32v.653h.659v1.308H0v-1.961zm0-11.922v-2.385h1.32v2.385H0zm0 4.768v-2.384h1.32v2.384H0zm0 4.77v-2.385h1.32v2.384H0zm0-16.269h1.979v1.308h-.66v.654H0v-1.962zm4.206 1.307v-1.307h2.228v1.307H4.206zm23.847 4.09V7.943h-4.58c-.364-.002-.66-.294-.66-.654v-4.54H10.64v21.143h14.432l-2.055-6.25c-.042-.125-.044-.261-.006-.388.104-.347.472-.544.82-.441l4.222 1.252zM24.132 3.582v3.053h3.077l-3.077-3.053zM36.839 21.01c.055.226-.015.464-.184.624l-2.751 2.619 2.421 2.402c.125.121.195.287.194.46 0 .175-.07.342-.194.465l-2.111 2.091c-.258.255-.675.255-.933 0l-2.487-2.464-2.77 2.638c-.124.117-.288.182-.459.182-.053 0-.107-.006-.158-.019-.22-.056-.397-.218-.468-.431L25.5 25.199h-4.7v.654h-1.32V25.2H9.322V13.976h-.66v-1.307h.66V2.095c0-.36.295-.652.66-.653h13.584c.174 0 .342.069.465.193l5.148 5.105c.125.121.195.287.195.46v11.257l7.014 2.079c.224.068.396.247.452.473zM25.527 10.067c0 .27-.22.49-.493.49H13.406c-.273 0-.493-.221-.493-.491.001-.27.222-.488.493-.49h11.627c.272 0 .493.22.494.49v.001zm0 2.373c0 .27-.22.49-.493.49H13.406c-.273 0-.495-.218-.496-.489 0-.27.22-.49.494-.492H25.033c.272 0 .493.219.494.49zm0 2.376c0 .27-.22.49-.493.49H13.406c-.273 0-.493-.22-.493-.492.001-.27.222-.488.493-.489h11.627c.272 0 .493.22.494.49z"
          transform="translate(-862 -306) translate(60 103) translate(667) translate(0 170) translate(135 33)"
        />
      </g>
    </g>
  </svg>
);

export default DragAndDrop;
