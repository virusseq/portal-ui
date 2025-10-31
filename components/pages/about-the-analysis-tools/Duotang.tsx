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

import { css, useTheme } from '@emotion/react';
import { ReactElement } from 'react';

import StyledLink from '#components/Link';
import defaultTheme from '#components/theme';

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
						Duotang
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
							href="https://covarr-net.github.io/duotang/duotang.html"
							rel="noopener noreferrer"
							target="_blank"
						>
							Duotang
						</StyledLink>{' '}
						(
						<StyledLink
							href="https://arxiv.org/pdf/2405.04734"
							rel="noopener noreferrer"
							target="_blank"
						>
							Gill et al., 2024
						</StyledLink>
						) is an online web notebook that was built to explore Canadian SARS-CoV-2 genomic and
						epidemiological data with the aim of investigating viral evolution and spread. It was dubbed
						‘Duotang’, in reference to Canadian slang (a generalized trademark in Canada) for ‘workbook’
						used in schools.
					</p>
				</span>

				<span
					css={css`
						width: 190px;
						margin: 30px 0 0 30px;
						padding: 20px 20px 15px;
						border-radius: 10px;
						border: solid 1px #dfdfe1;
					`}
				>
					<StyledLink
						href="https://covarr-net.github.io/duotang/duotang.html/"
						rel="noopener noreferrer"
						target="_blank"
					>
						<img
							alt="Duotang logo"
							src="/images/duotang-logo.png"
							width="60"
						/>
					</StyledLink>
				</span>
			</div>

			<p>
				It was developed by the{' '}
				<StyledLink
					href="https://covarrnet.ca/computational-analysis-modelling-and-evolutionary-outcomes-cameo/"
					rel="noopener noreferrer"
					target="_blank"
				>
					CAMEO
				</StyledLink>{' '}
				team (Computational Analysis, Modelling and Evolutionary Outcomes Group) associated with the Coronavirus
				Variants Rapid Response Network (
				<StyledLink
					href="https://covarrnet.ca/"
					rel="noopener noreferrer"
					target="_blank"
				>
					CoVaRR-Net
				</StyledLink>
				) for sharing with collaborators, including public health labs and industry.
			</p>

			<p>
				These analyses are freely available and open source, enabling code reuse by public health authorities
				and other researchers for their own use. Canadian genomic data is pulled from the VirusSeq Data Portal
				and ViralAI, coupled with additional epidemiological data obtained from various public sources, to keep
				these analyses up-to-date. Updates are transparently made available through the Duotang{' '}
				<StyledLink
					href="https://github.com/CoVaRR-NET/duotang"
					rel="noopener noreferrer"
					target="_blank"
				>
					GitHub repository
				</StyledLink>
				, and any issues can be posted there.
			</p>
		</section>
	);
};

export default Portal;
