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

import { css } from '@emotion/react';
import { ReactElement } from 'react';

import theme from '#components/theme';

import { IconProps } from './types';

const Info = ({ fill = theme.colors.error_dark, size = 16, style }: IconProps): ReactElement => {
	return (
		<svg
			css={css`
				${style}
				height: ${size};
				width: ${size};
			`}
			width={size}
			height={size}
			viewBox={'0 0 30 30'}
		>
			<g fill="none" fillRule="evenodd">
				<g fill={fill}>
					<path d="M15 0c8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15C0 6.716 6.716 0 15 0z" />
					<path
						d="M14.62 10.985c1.104 0 2.019-.888 2.019-1.992S15.724 7 14.619 7c-1.103 0-2.019.889-2.019 1.993s.916 1.992 2.02 1.992zM12.6 21.083c0 1.023.916 1.858 2.02 1.858s2.019-.835 2.019-1.858v-7.217c0-1.023-.915-1.858-2.02-1.858-1.103 0-2.019.835-2.019 1.858v7.217z"
						fill="white"
					/>
				</g>
			</g>
		</svg>
	);
};

export default Info;
