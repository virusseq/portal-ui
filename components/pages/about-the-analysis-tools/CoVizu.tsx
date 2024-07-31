/*
 *
 * Copyright (c) 2024 The Ontario Institute for Cancer Research. All rights reserved
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
import { css, useTheme } from '@emotion/react';

import StyledLink from '@/components/Link';
import defaultTheme from '@/components/theme';

const Portal = (): ReactElement => {
	const theme: typeof defaultTheme = useTheme();

	return (
		<section>
			<div
				css={css`
					display: flex;
				`}
			>
				<span>
					<h2
						css={css`
							${theme.typography.subheading};
						`}
					>
						CoVizu
					</h2>

					<p
						css={css`
							margin-bottom: 0;
						`}
					>
						<StyledLink
							css={css`
								font-weight: bold;
							`}
							href="https://virusseq-dataportal.ca/visualization"
							rel="noopener noreferrer"
							target="_blank"
						>
							CoVizu
						</StyledLink>{' '}
						(
						<StyledLink
							href="https://academic.oup.com/ve/article/7/2/veab092/6431771"
							rel="noopener noreferrer"
							target="_blank"
						>
							Ferreira et al, 2021
						</StyledLink>
						), an{' '}
						<StyledLink
							href="https://github.com/PoonLab/CoVizu"
							rel="noopener noreferrer"
							target="_blank"
						>
							open source
						</StyledLink>{' '}
						SARS-CoV-2 genome analysis and visualization system, is used to visualize Canadian
						VirusSeq data colocalized with international GenBank data in a time-scaled phylogenetic
						tree to highlight potential cases of importation from other countries or ongoing
						community transmission.
					</p>
				</span>

				<span
					css={css`
						width: 190px;
						margin: 30px 0 0 30px;
						padding: 20px 20px;
						border-radius: 10px;
						border: solid 1px #dfdfe1;
					`}
				>
					<StyledLink
						href="https://virusmvp.org/covid-mvp/"
						rel="noopener noreferrer"
						target="_blank"
					>
						<img alt="COVID-MVP logo" src="/images/covizu-logo.png" width="60" />
					</StyledLink>
				</span>
			</div>

			<p>
				The web page provides two interactive visualizations of these data. On the left, it displays
				a phylogenetic tree summarizing the evolutionary relationships among different SARS-CoV-2
				lineages (groupings of viruses with similar genomes, useful for linking outbreaks in
				different places;{' '}
				<StyledLink
					href="https://www.nature.com/articles/s41564-020-0770-5"
					rel="noopener noreferrer"
					target="_blank"
				>
					Rambaut et al. 2020
				</StyledLink>
				).
			</p>

			<p>
				You can navigate between different lineages by clicking on their respective boxes. Selecting
				a lineage displays a "beadplot" visualization in the center of the page. Each horizontal
				line represents one or more samples of SARS-CoV-2 that share the same genome sequence. Beads
				along the line represent the dates that this variant was sampled.
			</p>
		</section>
	);
};

export default Portal;
