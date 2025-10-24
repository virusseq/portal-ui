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

import { css, useTheme } from '@emotion/react';
import { ReactElement } from 'react';

import StyledLink from '#components/Link';
import defaultTheme from '#components/theme';

const Partners = (): ReactElement => {
	const theme: typeof defaultTheme = useTheme();
	return (
		<section
			css={css`
				margin: 5px 0 10px;
			`}
		>
			<h2
				css={css`
					${theme.typography.subheading};
				`}
			>
				Technology Partners
			</h2>

			<p>
				The development and implementation of the Canadian VirusSeq Data Portal is led by{' '}
				<StyledLink
					href="https://www.computationalgenomics.ca/c3g-montreal-node/"
					rel="noopener noreferrer"
					target="_blank"
				>
					Dr. Guillaume Bourque (McGill University) and his team
				</StyledLink>
				. This team, in collaboration with CanCOGeN and world-leading genomics scientists specializing in data
				science and policy, including Drs. Fiona Brinkman (Simon Fraser University), William Hsiao (Simon Fraser
				University), Lincoln Stein and Mélanie Courtot (Ontario Institute for Cancer Research) and Yann Joly
				(McGill University), oversees the technical interactions with the National Microbiology Laboratory and
				provincial public health laboratories across the country.
			</p>
		</section>
	);
};
export default Partners;
