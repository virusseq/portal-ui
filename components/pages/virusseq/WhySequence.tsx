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

const WhySequence = (): ReactElement => (
	<section
		css={(theme) => css`
			margin: 0 50px;

			> * {
				margin: 25px 0;
			}

			@media (min-width: 900px) {
				max-width: calc(65% - 75px);
				margin-left: 25px;
			}

			@media (min-width: 960px) {
				max-width: calc(60% - 75px);
			}
		`}
	>
		<h2
			css={(theme) => css`
				color: ${theme.colors.primary};
				font-size: 26px;
				font-weight: normal;
				position: relative;
			`}
		>
			Why Sequence this Virus?
		</h2>

		<figure
			css={(theme) => css`
				display: flex;
				flex-wrap: wrap;
				max-width: 744px;

				figcaption {
					${theme.typography.label};
					flex-basis: calc(33% - 20px);
					padding: 10px;
					text-align: center;
				}
			`}
		>
			<img
				src="images/about-why_sequence.png"
				alt="image representing the three steps of DNA sequencing"
				width="100%"
				style={{ maxHeight: '200px' }}
			/>
			<figcaption>
				Identify and track transmission trends at the regional, provincial, national and
				international scales.
			</figcaption>
			<figcaption>Aid detection of new clusters of cases/outbreaks.</figcaption>
			<figcaption>Discover evolving viral characteristics that might impact.</figcaption>
		</figure>
	</section>
);

export default WhySequence;
