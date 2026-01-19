/*
 *
 * Copyright (c) 2026 The Ontario Institute for Cancer Research. All rights reserved
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

// randomly named "sections/categories", in case the FAQs grows that much
import ABC from './abc'; // will need actual name eventually
// import DEF from './def';

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
					max-width: 870px;
					padding: 40px;
					width: 100%;
					${theme.shadow.default};

					.bold {
						font-weight: bold;
					}

					h2 {
						font-size: 24px;
						font-weight: normal;
						margin: 0;
					}

					h3 {
						${theme.typography.subheading};
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

					section:not(:first-of-type) {
						margin-top: 40px;
					}
				`}
			>
				<h1
					css={css`
						${theme.typography.baseFont};
						color: ${theme.colors.primary};
						font-size: 28px;
						font-weight: normal;
					`}
				>
					Frequently Asked Questions
				</h1>
				<ABC />
				{/* <DEF /> */}
			</article>
		</main>
	);
};

export default PageContent;
