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
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import defaultTheme from '@/components/theme';

import SubmissionDetails from './Details';
import NewSubmissions from './NewSubmissions';
import PreviousSubmissions from './PreviousSubmissions';

const PageContent = (): ReactElement => {
	const {
		query: { slug = [] },
	} = useRouter();
	const theme: typeof defaultTheme = useTheme();

	// Submission ID
	const submissionId = Array.isArray(slug) ? slug[0] : slug;

	return (
		<main
			css={css`
				padding: 40px 30px calc(${theme.dimensions.footer.height}px + 30px);
				position: relative;

				.view-title {
					color: ${theme.colors.primary};
					font-weight: normal;
					margin: 0;
				}
			`}
		>
			{submissionId ? (
				<SubmissionDetails ID={submissionId} />
			) : (
				<>
					<h1 className="view-title">Environmental Data Submissions</h1>

					<section
						css={css`
							display: flex;
							padding: 40px 0 calc(${theme.dimensions.footer.height}px + 30px);
							position: relative;

							> * {
								flex-basis: 50%;
								padding: 0 30px;
							}
						`}
					>
						<PreviousSubmissions />
						<NewSubmissions />
					</section>
				</>
			)}
		</main>
	);
};

export default PageContent;
