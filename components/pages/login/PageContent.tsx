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
import { ReactElement, useEffect, useState } from 'react';
import urlJoin from 'url-join';

import StyledLink, { StyledLinkAsButton } from '#components/Link';
import { getConfig } from '#global/config';

const PageContent = (): ReactElement => {
	const [origin, setOrigin] = useState('');
	const theme = useTheme();
	const {
		NEXT_PUBLIC_EGO_API_URL,
		NEXT_PUBLIC_EGO_CLIENT_ID,
		NEXT_PUBLIC_ENABLE_LOGIN,
		NEXT_PUBLIC_ENABLE_REGISTRATION,
		NEXT_PUBLIC_KEYCLOAK,
	} = getConfig();

	useEffect(() => {
		window && setOrigin(window.location.origin);
	}, []);

	return (
		<main
			css={css`
				align-items: center;
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding: 40px 0 calc(${theme.dimensions.footer.height}px + 30px);
				width: 100vw;
			`}
		>
			<article
				css={css`
					background-color: ${theme.colors.white};
					border-radius: 5px;
					box-sizing: border-box;
					max-width: 770px;
					padding: 40px;
					width: 100%;
					${theme.shadow.default};
				`}
			>
				<h1
					css={css`
						color: ${theme.colors.primary};
						margin: 0 0 30px;
					`}
				>
					Data Submission
				</h1>
				<p
					css={css`
						font-weight: bold;
						margin-bottom: 25px;
					`}
				>
					Viral genomes are submitted to this portal by approved users.
				</p>
				<ul
					css={css`
						display: flex;
						flex-wrap: wrap;
						list-style: none;
						margin: 0;
						padding: 0;
						width: 100%;

						li {
							box-sizing: border-box;
							display: flex;
							flex-basis: 50%;
							flex-direction: column;
							justify-content: space-between;
							padding: 10px 0;

							&:first-of-type {
								padding-right: 40px;
							}

							&:not(:first-of-type) {
								border-left: 1px solid ${theme.colors.grey_4};
								padding-left: 40px;
							}
						}

						p {
							margin: 0 0 20px;
						}
					`}
				>
					{NEXT_PUBLIC_ENABLE_REGISTRATION && (
						<li>
							<p>
								To be granted a data submission account for your organization, please contact{' '}
								<StyledLink
									href="mailto:imicroseq-dataportal@lists.sfu.ca"
									rel="noopener noreferrer"
									target="_blank"
								>
									imicroseq-dataportal@lists.sfu.ca
								</StyledLink>{' '}
								with an account request.
							</p>
							<StyledLinkAsButton
								css={css`
									${theme.typography.button};
									background-color: ${theme.colors.primary_dark};
									border-color: ${theme.colors.primary_dark};
									line-height: 20px;
									padding: 8px 20px;
									width: fit-content;
								`}
								href={`${NEXT_PUBLIC_KEYCLOAK}registrations?client_id=ego&response_type=code&redirect_uri=${origin}`}
								rel="noopener noreferrer"
								target="_blank"
							>
								Request an Account
							</StyledLinkAsButton>
						</li>
					)}

					{NEXT_PUBLIC_ENABLE_LOGIN && (
						<li>
							<p>If you already have an authorized account, please log in to submit your data.</p>
							<StyledLinkAsButton
								css={css`
									${theme.typography.button};
									background-color: ${theme.colors.primary_dark};
									border-color: ${theme.colors.primary_dark};
									line-height: 20px;
									padding: 8px 20px;
									width: fit-content;
								`}
								href={urlJoin(
									NEXT_PUBLIC_EGO_API_URL,
									`/oauth/login/keycloak?client_id=${NEXT_PUBLIC_EGO_CLIENT_ID}`,
								)}
							>
								Log in to Submit Data
							</StyledLinkAsButton>
						</li>
					)}
				</ul>
			</article>

			{/*token ? 'yuss' : 'Big nope'*/}
		</main>
	);
};

export default PageContent;
