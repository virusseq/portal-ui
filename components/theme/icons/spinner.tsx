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

import { css, keyframes } from '@emotion/core';
import { IconProps } from './types';

// Animation
const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = ({ fill, height, width }: IconProps) => {
  return (
    <svg
      viewBox={'0 0 20 20'}
      width={width}
      height={height}
      css={css`
        height: 20px;
        animation: ${spin} 1.4s linear infinite;
      `}
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="M10.455 0c1.003 0 1.818.779 1.818 1.74 0 .96-.815 1.738-1.818 1.738-1.004 0-1.819-.779-1.819-1.739C8.636.78 9.451 0 10.455 0zm0 18.26c.502 0 .909.39.909.87s-.407.87-.91.87c-.502 0-.909-.39-.909-.87s.407-.87.91-.87zM5.073 1.519c.797-.44 1.816-.179 2.276.584.46.763.187 1.737-.61 2.178-.797.44-1.816.179-2.276-.584-.46-.762-.187-1.737.61-2.178zm9.55 15.824a.777.777 0 0 1 1.035.266c.21.346.085.79-.277.99a.776.776 0 0 1-1.035-.266.708.708 0 0 1 .278-.99zM1.267 5.367c.419-.693 1.345-.93 2.07-.53.725.4.973 1.286.555 1.98-.419.693-1.346.93-2.07.53-.725-.4-.973-1.287-.555-1.98zm16.54 9.122a.621.621 0 0 1 .827-.212c.29.16.39.514.222.791a.621.621 0 0 1-.828.212.566.566 0 0 1-.222-.791zM1.363 9.13c.753 0 1.363.584 1.363 1.305 0 .72-.61 1.304-1.363 1.304S0 11.155 0 10.435c0-.72.61-1.305 1.364-1.305zm18.181.87c.251 0 .455.194.455.435 0 .24-.204.435-.455.435a.445.445 0 0 1-.454-.435c0-.24.204-.435.454-.435zM1.97 13.78c.58-.32 1.321-.13 1.656.425.335.555.136 1.264-.444 1.584-.58.32-1.32.13-1.655-.424-.335-.555-.136-1.264.443-1.584zm16.21-7.947a.31.31 0 0 1 .414.106.283.283 0 0 1-.11.396.31.31 0 0 1-.414-.106.283.283 0 0 1 .11-.396zM4.995 17.462c.293-.486.942-.652 1.449-.372.507.28.68.9.388 1.386-.293.485-.941.651-1.449.371a.99.99 0 0 1-.388-1.385z"
      />
    </svg>
  );
};

export default Spinner;
