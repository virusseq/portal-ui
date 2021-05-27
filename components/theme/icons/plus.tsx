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

const PlusIcon = ({ width = 12, height = 12, style }: IconProps): ReactElement => {
  return (
    <svg
      css={css`
        ${style};
        height: ${height}px;
        width: ${width}px;
      `}
      height={height}
      width={width}
      viewBox={`0 0 12 13`}
    >
      <g fill="none" fill-rule="evenodd">
        <g fill="#28519D">
          <path
            d="M8.331 6.577H6.583v1.76c0 .318-.262.577-.583.577-.32 0-.583-.26-.583-.577v-1.76H3.67c-.321 0-.583-.26-.583-.577 0-.317.262-.577.583-.577h1.748v-1.76c0-.318.262-.577.583-.577.32 0 .583.26.583.577v1.76H8.33c.321 0 .583.26.583.577 0 .317-.262.577-.583.577M6 0C2.686 0 0 2.686 0 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6"
            transform="translate(-414 -477) translate(0 -1) translate(383 98) translate(20.5 123.67) translate(.5 129) translate(0 121) translate(10 7)"
          />
        </g>
      </g>
    </svg>
  );
};

export default PlusIcon;
