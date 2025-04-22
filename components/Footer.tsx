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

import { getConfig } from '../global/config';
import useAuthContext from '../global/hooks/useAuthContext';
import { INTERNAL_PATHS } from '../global/utils/constants';

import StyledLink, { InternalLink } from './Link';
import defaultTheme from './theme';
import { GenomeCanadaLogo, GitHubLogo, OvertureLogoWithText } from './theme/icons';

const Footer = (): ReactElement => {
	const { NEXT_PUBLIC_ENABLE_LOGIN, NEXT_PUBLIC_ENABLE_REGISTRATION } = getConfig();
	const theme: typeof defaultTheme = useTheme();
	const { token } = useAuthContext();

	return (
		<footer
			css={css`
				height: ${theme.dimensions.footer.height}px;
				background-color: ${theme.colors.white};
				border-top: 1px solid ${theme.colors.grey_3};
				${theme.shadow.default};
				display: flex;
				justify-content: space-between;
				align-items: center;
				z-index: 10;
				overflow: hidden;
				padding: 0 15px;
				position: fixed;
				bottom: 0px;
				left: 0px;
				right: 0px;
			`}
		>
			<section
				css={css`
					align-items: center;
					display: flex;

					> :not(:last-of-type) {
						margin-right: 0.5rem;
					}
				`}
			>
				<a href="https://www.genomecanada.ca/" rel="noopener noreferrer" target="_blank">
					<GenomeCanadaLogo height={60} width={80} viewBox="0 15 94 26" />
				</a>
				<img src="/images/cancogen-logo.png" alt="Cancogen logo" width="85" />
				<a
					css={css`
						margin-left: 1rem;
					`}
					href="https://covarrnet.ca/"
					rel="noopener noreferrer"
					target="_blank"
				>
					<img src="/images/covarrnet-logo.png" alt="CoVaRRNet logo" width="100" />
				</a>
			</section>

			<section
				css={css`
					display: flex;
					flex-direction: column;
					height: 60%;
					justify-content: space-between;
					align-items: center;

					& a,
					& span {
						${theme.typography.subheading2};
						font-weight: normal;
					}
				`}
			>
				<span
					css={css`
						text-align: center;
					`}
				>
					If you use the VirusSeq Data Portal, please cite{' '}
					<span css={css``}>Gill et al (2024) Microbial Genomics.</span>{' '}
					<StyledLink
						href="https://doi.org/10.1099/mgen.0.001293"
						rel="noopener noreferrer"
						target="_blank"
					>
						10.1099/mgen.0.001293
					</StyledLink>
				</span>

				<ul
					css={css`
						display: flex;
						margin: 0;
						padding: 0;

						& li {
							display: inline;
							padding: 0 20px;
							position: relative;
							text-align: center;

							&:not(:first-of-type)::before {
								color: ${theme.colors.accent};
								content: '•';
								left: -3px;
								position: absolute;
								top: 5px;
							}
						}
					`}
				>
					<li>
						<span>Contact us at </span>
						<StyledLink
							href="mailto:info@virusseq-dataportal.ca"
							rel="noopener noreferrer"
							target="_blank"
						>
							info@virusseq-dataportal.ca
						</StyledLink>
					</li>

					<li>
						<InternalLink path={INTERNAL_PATHS.POLICIES}>
							<StyledLink>Policies</StyledLink>
						</InternalLink>
					</li>

					{(NEXT_PUBLIC_ENABLE_LOGIN || NEXT_PUBLIC_ENABLE_REGISTRATION) && !token && (
						<li>
							<InternalLink path={INTERNAL_PATHS.LOGIN}>
								<StyledLink>Submitter Login</StyledLink>
							</InternalLink>
						</li>
					)}
				</ul>

				<span>
					&#169;
					{` 2021 - ${new Date().toISOString().slice(0, 4)} Canadian VirusSeq Data Portal.`}
				</span>
			</section>

			<section
				css={css`
					display: flex;
				`}
			>
				<span
					css={css`
						display: flex;
						justify-content: center;
						align-items: center;
					`}
				>
					<span
						css={css`
							color: ${theme.colors.accent_dark};
							${theme.typography.subheading2}
							font-size: 0.8rem;
							font-weight: normal;
							padding-right: 0.2rem;
							width: 4.4rem;
						`}
					>
						Powered by:
					</span>

					<a
						css={css`
							margin-top: 5px;
						`}
						href="https://www.overture.bio/"
						rel="noopener noreferrer"
						target="_blank"
					>
						<OvertureLogoWithText width={90} height={18} />
					</a>
				</span>

				<a
					css={css`
						align-items: center;
						color: ${theme.colors.primary};
						display: flex;
						font-weight: bold;
						justify-content: center;
						margin-left: 0.8rem;
						margin-top: -0.1rem;
						text-decoration: none;
					`}
					href="https://github.com/virusseq"
					rel="noopener noreferrer"
					target="_blank"
				>
					<GitHubLogo height={15} width={15} />
					<span
						css={css`
							margin-left: 0.3rem;
							width: 4rem;
						`}
					>
						GitHub
					</span>
				</a>
			</section>
		</footer>
	);
};

export default Footer;
