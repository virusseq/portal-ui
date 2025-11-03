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

import { InternalLink as Link, StyledLinkAsButton } from '#components/Link';
import { MapleLeaf } from '#components/theme/icons';
import { INTERNAL_PATHS } from '#global/utils/constants';

import ReleaseData from './ReleaseData';

/** Layout notes:
  - Article is the full-width background for the hero banner
  - Section centers the content in larger screens
 ** */

const HeroBanner = (): ReactElement => {
	const theme = useTheme();

	return (
		<article
			css={css`
				background-color: ${theme.colors.primary_dark};
				box-sizing: border-box;
				color: ${theme.colors.white};
				display: flex;
				padding: 45px 50px;
				width: 100%;

				@media (min-width: 1270px) {
					background-image: url('/images/about-hero.png');
					background-repeat: no-repeat;
					background-size: 589px;
					height: 400px;
					padding-left: 630px;
				}

				@media (min-width: 2165px) {
					padding-left: 50px;
					justify-content: center;
				}

				@media (min-width: 2170px) {
				}

				@media (min-width: 2880px) {
					padding-left: 50px;
				}
			`}
		>
			<section
				css={css`
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					max-width: 1550px;
					width: 100%;

					> * {
						margin: 0;

						&:not(h1) {
							margin-top: 20px;
						}
					}
				`}
			>
				<h1
					css={css`
						font-size: 30px;
						font-weight: normal;
						position: relative;

						@media (min-width: 1345px) {
							font-size: 34px;
						}
					`}
				>
					<MapleLeaf
						style={css`
							left: -42px;
							position: absolute;
						`}
					/>
					Canadian VirusSeq Data Portal
				</h1>

				<p
					css={css`
						${theme.typography.subheading}
						font-weight: normal;
					`}
				>
					The goal of the CanCOGeN VirusSeq project was to sequence up to 150,000 viral samples from Canadians
					testing positive for COVID-19. The VirusSeq Data Portal is an open-source and open-access data
					portal for all Canadian SARS-CoV-2 sequences and associated non-personal contextual data. It
					harmonizes, validates and automates submission to international databases.
				</p>

				<p>
					The expansion of the VirusSeq Data Portal that includes environmental Wastewater data is available
					at the iMicroSeq Data portal
				</p>

				<ReleaseData />

				<div
					css={css`
						display: flex;
					`}
				>
					<Link path={INTERNAL_PATHS.EXPLORER}>
						<StyledLinkAsButton
							css={css`
								${theme.typography.button};
								background-color: ${theme.colors.accent3};
								border-color: ${theme.colors.accent3};
								line-height: 20px;
								margin-right: 15px;
								padding: 8px 20px;
								width: fit-content;

								&:hover {
									color: ${theme.colors.white};
									background-color: ${theme.colors.accent3_dark};
								}
							`}
						>
							Explore the Data
						</StyledLinkAsButton>
					</Link>

					<Link path={INTERNAL_PATHS.RELEASES}>
						<StyledLinkAsButton
							css={css`
								${theme.typography.button};
								background-color: ${theme.colors.accent3};
								border-color: ${theme.colors.accent3};
								line-height: 20px;
								margin-right: 15px;
								padding: 8px 20px;
								width: fit-content;

								&:hover {
									color: ${theme.colors.white};
									background-color: ${theme.colors.accent3_dark};
								}
							`}
						>
							Download the Data
						</StyledLinkAsButton>
					</Link>
				</div>
			</section>
		</article>
	);
};

export default HeroBanner;
