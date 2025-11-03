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

const Portal = (): ReactElement => {
	const theme = useTheme();

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
						Viral-AI
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
							href="https://viral.ai/collections/virusseq/overview"
							rel="noopener noreferrer"
							target="_blank"
						>
							Viral-AI
						</StyledLink>{' '}
						makes data uniformly accessible through a user-friendly graphical interface and powerful
						programmatic interfaces, integrating data across different sources from around the world
						alongside VirusSeq, such as NCBI Sequence Read Archive (SRA) and European Center for Disease
						Prevention and Control, among others.
					</p>
				</span>

				<span
					css={css`
						width: 190px;
						margin: 50px 0 40px 30px;
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
						<img
							alt="COVID-MVP logo"
							src="/images/viral-ai.png"
							width="90"
						/>
					</StyledLink>
				</span>
			</div>

			<p>
				Over one million viral sequences have been added with corresponding assemblies, variant calls, and
				lineage assignments, all harmonized through an open source bioinformatics pipeline. The Viral AI
				platform includes Explorer, a federated data hub that makes it easier for researchers to find, access,
				and analyze shared data.
			</p>

			<p>
				With Explorer, researchers can search and perform analyses across a universe of connected datasets
				through a single user interface. The VirusSeq Data Portal data is made available in Explorer for
				researchers to discover, access, and analyze alongside the other connected data sets.
			</p>
		</section>
	);
};

export default Portal;
