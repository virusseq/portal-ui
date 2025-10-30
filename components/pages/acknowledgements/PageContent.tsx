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
import { format } from 'date-fns';
import { ReactElement } from 'react';

import StyledLink from '#components/Link';

import { iMicroSeqPolicy, virusSeqPolicy } from './constants';
import Contributors from './Contributors';
import Individuals from './Individuals';
import Policy from './Policy';

const PageContent = (): ReactElement => {
	const theme = useTheme();

	return (
		<main
			css={css`
				align-items: center;
				display: flex;
				flex-direction: column;
				padding-bottom: ${theme.dimensions.footer.height}px;
			`}
		>
			<article
				css={css`
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					margin: 30px 0;
					max-width: 800px;
					padding: 40px;
					width: 100%;
					${theme.shadow.default};
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
					Acknowledgement of Contributions
				</h1>

				<p
					css={css`
						font-style: italic;
						margin-top: 10px;
					`}
				>
					Updated at {format(Date.parse('27 Oct 2025 11:00:00'), 'MM/dd/yyyy, h:mm:ss aa')}
				</p>

				<section>
					<h2
						css={css`
							${theme.typography.subheading};
						`}
					>
						How to cite
					</h2>
					<p>
						If you use the iMicroSeq Data Portal or the VirusSeq Data Portal, please cite the following,
						pending further publication of this resource:{' '}
						<span
							css={css`
								display: inline;
								font-style: italic;
							`}
						>
							Gill et al 2024. The Canadian VirusSeq Data Portal and Duotang: open resources for
							SARS-CoV-2 viral sequences and genomic epidemiology. Microbial Genomics.{' '}
							<StyledLink
								href="https://doi.org/10.1099/mgen.0.001293"
								rel="noopener noreferrer"
								target="_blank"
							>
								doi.org/10.1099/mgen.0.001293
							</StyledLink>
						</span>
					</p>
				</section>
				<a
					css={css`
						font-weight: bold;
					`}
					href={`#${iMicroSeqPolicy.anchor}`}
				>
					Acknowledgements for iMicroSeq Environmental data
				</a>
				<a
					css={css`
						font-weight: bold;
					`}
					href={`#${virusSeqPolicy.anchor}`}
				>
					Acknowledgements for VirusSeq Data Portal / iMicroSeq clinical case data
				</a>
				<Policy policy={iMicroSeqPolicy} />
				<Contributors />
				<Policy policy={virusSeqPolicy} />
				<Individuals />
				<p>
					Funding for the VirusSeq Data Portal has been provided by The Canadian COVID Genomics Network
					(CanCOGeN), supported by Genome Canada and Innovation, Science and Economic Development Canada
					(ISED), plus the Canadian Institutes of Health Research(CIHR) - Coronavirus Variants Rapid Response
					Network (CoVaRR-Net)
				</p>
			</article>
		</main>
	);
};

export default PageContent;
