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

const File = ({ fill = '#6885BA', height = 16, width = 16, style }: IconProps): ReactElement => {
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
          <path
            d="M10.626.41l2.871 2.872h-2.871V.41zM1.6 0h8.205v3.692c0 .215.196.41.41.41h3.693V16H1.6V0z"
            transform="translate(-630 -327) translate(-31 -9) translate(0 73) translate(659 255) translate(2) translate(0 8)"
          />
        </g>
      </g>
    </svg>
  );
};

export default File;
