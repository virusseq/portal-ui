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

import defaultTheme from '#components/theme';

const Impact = (): ReactElement => {
	const theme: typeof defaultTheme = useTheme();
	return (
		<section
			className="Impact"
			css={css`
				> * {
					margin: 25px 0;
				}
			`}
		>
			<h2
				css={css`
					color: ${theme.colors.primary};
					font-size: 26px;
					font-weight: normal;
					position: relative;
				`}
			>
				Impact on Canadians
			</h2>

			<p>
				Genomic-based tracking and analysis of microbes, including viruses, across Canada provides critical
				information for:
			</p>

			<ul>
				<li>Early detection of emerging pathogens and outbreaks.</li>
				<li>Accurate microbial detection methods.</li>
				<li>Understanding transmission dynamics of infectious diseases.</li>
				<li>Improving detection, source attribution, surveillance, and control strategies.</li>
				<li>Enhancing public health decisions through real-time data integration.</li>
				<li>
					Monitoring antimicrobial resistance trends and variant evolution, relevant for public health and
					agriculture.
				</li>
				<li>
					Modeling microbial changes in the environment needed for environmental risk assessment and
					predicting climate change impacts.
				</li>
			</ul>
		</section>
	);
};

export default Impact;
