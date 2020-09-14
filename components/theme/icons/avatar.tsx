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

const Avatar = ({ fill, height, width, style }: IconProps) => {
  return (
    <svg
      css={css`
        ${style};
        height: ${height};
        width: ${width};
      `}
      width={width}
      height={height}
      viewBox={'0 0 20 20'}
    >
      <g fill={'none'} fillRule={'evenodd'}>
        <path fill={'none'} d={'M0 0h20v20H0z'} />
        <path
          fill={fill || '#d0d1d8'}
          d={
            'M14.695 2.694a5.215 5.215 0 0 0-9.13 5.043A5.134 5.134 0 0 0 7.608 9.78C3.782 10.476 1 12.65 1 15.39v3.565c.043.608.565 1.087 1.174 1.043H18.13a1.051 1.051 0 0 0 1.13-1.043v-3.565c0-2.696-2.74-4.913-6.609-5.609a5.215 5.215 0 0 0 2.044-7.086z'
          }
        />
      </g>
    </svg>
  );
};

export default Avatar;
