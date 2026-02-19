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

import StyledLink from '#components/Link.tsx';

import IMicroSeqPolicies from './imicroseq/index';
import VirusSeqPolicies from './virusseq/index';

const anchors = {
	imicroseq: 'imicroseq-policies',
	virusseq: 'virusseq-policies',
};

const PageContent = (): ReactElement => {
	const theme = useTheme();

	return (
		<main
			css={css`
				align-items: center;
				display: flex;
				flex-direction: column;
				padding-bottom: 30px;
			`}
		>
			<article
				css={css`
					box-sizing: border-box;
					margin: 30px 0;
					max-width: 800px;
					padding: 40px;
					width: 100%;
					${theme.shadow.default};

					h1 {
						color: ${theme.colors.primary};
						font-size: 1.8rem;
						font-weight: normal;
						margin: 0;
					}

					h2 {
						${theme.typography.subheading};
						font-size: 1.3rem;
					}

					h3 {
						${theme.typography.subheading2};
						font-size: 1rem;
					}

					ol,
					ul {
						padding-left: 30px;

						li {
							&:not(:last-of-type) {
								margin-bottom: 5px;
							}

							ol,
							ul {
								margin-top: 5px;
							}
						}
					}

					section {
						margin-top: 40px;
					}
				`}
			>
				<h1
					css={css`
						color: ${theme.colors.primary};
						font-size: 26px;
						font-weight: normal;
						margin: 0;
					`}
				>
					Website and Data Usage Policies
				</h1>

				<p
					css={css`
						font-style: italic;
						margin-top: 10px;
					`}
				>
					Updated on 2026/02/19, at 9:00:00
				</p>

				<nav>
					<StyledLink
						css={css`
							font-weight: bold;
						`}
						href={`#${anchors.imicroseq}`}
						rel="noopener noreferrer"
					>
						Policies for iMicroSeq environmental data
					</StyledLink>

					<br />

					<StyledLink
						css={css`
							font-weight: bold;
						`}
						href={`#${anchors.virusseq}`}
						rel="noopener noreferrer"
					>
						Policies for VirusSeq Data Portal / iMicroSeq clinical case data
					</StyledLink>
				</nav>

				<section>
					<h1
						css={css`
							font-size: 1.5rem !important;
							scroll-margin-top: 65px;
						`}
						id={`${anchors.imicroseq}`}
					>
						Policies for iMicroSeq Data Portal environmental data
					</h1>
					<IMicroSeqPolicies />
				</section>

				<section>
					<h1
						css={css`
							font-size: 1.5rem !important;
							scroll-margin-top: 65px;
						`}
						id={`${anchors.virusseq}`}
					>
						Policies for VirusSeq Data Portal / iMicroSeq clinical case data
					</h1>

					<VirusSeqPolicies />
				</section>
			</article>
		</main>
	);
};

export default PageContent;
