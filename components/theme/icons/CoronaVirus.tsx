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

const CoronaVirus = ({ fill = '#6885BA', size = 16, style }: IconProps): ReactElement => {
  return (
    <svg
      css={css`
        ${style};
        height: ${size}px;
        width: ${size}px;
      `}
      width={size}
      height={size}
      viewBox={`0 0 16 16`}
    >
      <g fill="none" fillRule="evenodd">
        <g fill={fill}>
          <path
            d="M15.502 9.903c-.533.258-.759-.936-1.63-1.162-.129 1-.516 1.953-1.113 2.775.742.452 1.694-.242 1.872.436.193.742-2.001 2.937-2.695 2.695-.565-.194.129-1.194-.323-1.953-.823.646-1.807 1.05-2.856 1.178.226.855 1.404 1.081 1.146 1.614-.307.661-3.42.661-3.808 0-.355-.613.807-.79 1.017-1.63-1-.145-1.953-.549-2.743-1.178-.452.759.225 1.759-.323 1.953-.678.258-2.872-1.937-2.679-2.679.178-.678 1.13.016 1.872-.436-.597-.806-.984-1.758-1.113-2.775-.871.226-1.081 1.42-1.63 1.162-.661-.307-.661-3.42 0-3.808.613-.355.79.823 1.646 1.017.145-1 .549-1.937 1.178-2.743-.775-.484-1.775.225-1.985-.34-.242-.677 1.953-2.871 2.695-2.678.694.178-.033 1.146.452 1.904.774-.58 1.694-.952 2.662-1.097C6.95 1.287 5.756 1.11 6.11.496c.387-.661 3.501-.661 3.808 0 .258.549-.952.759-1.162 1.646 1 .129 1.953.516 2.76 1.113.483-.758-.226-1.726.451-1.904.742-.193 2.937 2.001 2.695 2.695-.21.565-1.21-.13-1.969.339.613.79 1.033 1.742 1.178 2.743.855-.21 1.033-1.372 1.646-1.017.645.371.645 3.485-.016 3.792z"
            transform="translate(-630 -365) translate(-31 -9) translate(0 73) translate(659 255) translate(2 36) translate(0 10)"
          />
        </g>
      </g>
    </svg>
  );
};

export default CoronaVirus;
