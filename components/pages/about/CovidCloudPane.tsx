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

import { ReactElement } from 'react';
import { css, useTheme } from '@emotion/react';

import StyledLink from '../../Link';
import defaultTheme from '../../theme';
import { ChevronDown } from '../../theme/icons';

const CovidCloudPane = (): ReactElement => {
	const theme: typeof defaultTheme = useTheme();

	return (
		<article
			css={css`
				align-items: center;
				background-color: ${theme.colors.grey_2};
				border: 1px solid ${theme.colors.grey_3};
				border-radius: 5px;
				box-sizing: border-box;
				color: ${theme.colors.accent_dark};
				display: flex;
				flex-direction: column;
				margin: 50px;
				padding: 30px;
				text-align: center;
				width: calc(100% - 100px);
			`}
		>
			<img src="/images/viral-ai.png" alt="logo for Viral AI" width="180" />
			<p
				css={css`
					margin: 20px 0;
					max-width: 900px;
				`}
			>
				Genome Canada has also partnered with DNAstack to share{' '}
				<StyledLink
					href="https://viral.ai/collections/virusseq/overview"
					rel="noopener noreferrer"
					target="_blank"
				>
					VirusSeq data on Viral AI
				</StyledLink>{' '}
				, a federated network for genomic variant surveillance and infectious disease research.
				Viral AI was designed to deliver equitable access to software infrastructure, accelerate
				international data sharing, and empower scientists and public health officials with globally
				representative datasets they need to mitigate current and future infectious disease
				outbreaks.
			</p>
			<a
				css={css`
					align-items: center;
					color: ${theme.colors.primary};
					display: flex;
					font-weight: bold;
					text-decoration: none;
				`}
				href="https://viral.ai/collections/virusseq/overview"
				rel="noopener noreferrer"
				target="_blank"
			>
				Explore VirusSeq Data on Viral AI
				<ChevronDown
					fill={theme.colors.primary}
					height={11}
					width={10}
					style={css`
						margin-left: 3px;
						transform: rotate(-90deg);
					`}
				/>
			</a>
		</article>
	);
};

export default CovidCloudPane;
