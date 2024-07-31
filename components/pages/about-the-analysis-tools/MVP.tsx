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
						COVID-MVP
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
							href="https://virusmvp.org/covid-mvp/"
							rel="noopener noreferrer"
							target="_blank"
						>
							COVID-MVP
						</StyledLink>{' '}
						(
						<StyledLink
							href="https://www.biorxiv.org/content/10.1101/2022.06.07.493653v1"
							rel="noopener noreferrer"
							target="_blank"
						>
							Anwar et al., 2022
						</StyledLink>
						) a part of the VIRUS-MVP framework, connects mutations with their functional impact. It
						includes an interactive heatmap-based visualization that allows users to explore the
						mutational profile of a set of SARS-CoV-2 genomes or wastewater sequencing data,
						including the underlying literature on the functional impact linked with each mutation.
						In case of genomes, data can be grouped by any variable in provided metadata file (e.g.,
						lineages, time, geographical location).
					</p>
				</span>

				<span
					css={css`
						width: 190px;
						margin: 30px 0 40px 30px;
						padding: 20px 20px 15px;
						border-radius: 10px;
						border: solid 1px #dfdfe1;
					`}
				>
					<StyledLink
						href="https://virusmvp.org/covid-mvp/"
						rel="noopener noreferrer"
						target="_blank"
					>
						<img alt="COVID-MVP logo" src="/images/covid-mvp-logo.png" width="65" />
					</StyledLink>
				</span>
			</div>

			<p>
				Functional annotation is a standardized and a continuous effort that is primarily performed
				by curators with help from the Computational Analysis, Modelling and Evolutionary Outcomes
				Group (
				<StyledLink
					href="https://covarrnet.ca/computational-analysis-modelling-and-evolutionary-outcomes-cameo/"
					rel="noopener noreferrer"
					target="_blank"
				>
					CAMEO
				</StyledLink>
				) initiative of the Coronavirus Variants Rapid Response Network (
				<StyledLink href="https://covarrnet.ca/" rel="noopener noreferrer" target="_blank">
					CoVaRR-Net
				</StyledLink>
				), however, the scientific community can also provide input by using the issue tracking
				system of the{' '}
				<StyledLink
					href="https://github.com/nodrogluap/pokay"
					rel="noopener noreferrer"
					target="_blank"
				>
					GitHub repository
				</StyledLink>
				, where the annotations are maintained.
			</p>
		</section>
	);
};

export default Portal;
