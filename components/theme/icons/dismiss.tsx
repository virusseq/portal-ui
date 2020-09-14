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
import theme from '..';
import { IconProps } from './types';

const Dismiss = ({ height, width, style, fill }: IconProps) => {
  return (
    <svg
      css={css`
        ${style};
        height: ${height}px;
        width: ${width}px;
      `}
      width={width}
      height={height}
      viewBox={'0 0 20 20'}
    >
      <path
        fill={fill || theme.colors.black}
        fillRule="evenodd"
        d="M9.993 13.502l-5.74 5.74c-2.306 2.306-5.79-1.203-3.51-3.484L6.51 9.993.743 4.253c-2.28-2.307 1.204-5.79 3.51-3.51l5.74 5.765L15.758.743c2.281-2.28 5.79 1.203 3.484 3.51l-5.74 5.74 5.74 5.765c2.306 2.28-1.203 5.79-3.484 3.484l-5.765-5.74z"
      />
    </svg>
  );
};

export default Dismiss;
