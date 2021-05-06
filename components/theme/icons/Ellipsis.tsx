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
import { css } from '@emotion/react';

import { IconProps } from './types';

const Ellipsis = ({ fill = '#FE7B46', size = 12, style }: IconProps): ReactElement => (
  <svg
    css={css`
      ${style};
      height: ${size};
      width: ${size};
    `}
    width={size}
    height={size}
    viewBox={'0 0 12 12'}
  >
    <g fill="none" fillRule="evenodd">
      <g fill={fill}>
        <path
          d="M10.667 7.699c-.737 0-1.334-.65-1.334-1.45 0-.8.597-1.449 1.334-1.449.736 0 1.333.649 1.333 1.45 0 .8-.597 1.449-1.333 1.449M6 7.699c-.736 0-1.333-.65-1.333-1.45 0-.8.597-1.449 1.333-1.449s1.333.649 1.333 1.45c0 .8-.597 1.449-1.333 1.449m-4.667 0C.597 7.699 0 7.049 0 6.249 0 5.45.597 4.8 1.333 4.8c.737 0 1.334.649 1.334 1.45 0 .8-.597 1.449-1.334 1.449"
          transform="translate(-1014 -337) translate(59 78) translate(0 23.811) translate(0 100.109) translate(15 10.75) translate(938 69.362) translate(2 55)"
        />
      </g>
    </g>
  </svg>
);

export default Ellipsis;
