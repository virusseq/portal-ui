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
import { format } from 'date-fns';
import { ReactElement } from 'react';

import Navigator from '#components//Navigator';
import { LoaderMessage } from '#components/Loader';
import defaultTheme from '#components/theme';
import { Calendar, CoronaVirus, File, Info, Spinner, Success } from '#components/theme/icons';
import useAuthContext from '#global/hooks/useAuthContext';
import { SubmissionStatus } from '#global/hooks/useEnvironmentalData/types';

const Overview = ({
	createdAt,
	id,
	loading,
	originalFileNames,
	status,
	totalRecords,
}: {
	createdAt?: string;
	id: string;
	loading: boolean;
	originalFileNames?: string[];
	status?: string;
	totalRecords: string;
}): ReactElement => {
	const theme: typeof defaultTheme = useTheme();
	const { userHasClinicalAccess, userHasEnvironmentalAccess } = useAuthContext();

	return (
		<header
			css={css`
				border-bottom: 1px solid ${theme.colors.grey_3};
				padding-bottom: 10px;
			`}
		>
			{userHasClinicalAccess && userHasEnvironmentalAccess ? (
				<section
					css={css`
						align-items: flex-start;
						display: flex;
						flex-wrap: wrap;
					`}
				>
					<Navigator path="/submission" text="All Submissions" />
					&nbsp;/&nbsp;
					<Navigator path="/submission/environmental" text="New Submission" />
				</section>
			) : (
				<Navigator path="/submission/environmental" text="New Submission" />
			)}

			<section
				css={css`
					align-items: flex-start;
					display: flex;
					flex-wrap: wrap;
				`}
			>
				<h1
					className="view-title"
					css={css`
						font-size: 26px;
						margin: 0 60px 15px 0 !important;
						white-space: nowrap;
					`}
				>
					Data Submission: {id}
				</h1>

				{loading || (
					<div
						css={css`
							display: flex;
							font-weight: bold;
							margin-top: 9px;

							p {
								align-items: center;
								display: flex;
								margin: 0 60px 0 0;
							}

							svg {
								margin-right: 5px;
							}
						`}
					>
						{createdAt && (
							<p>
								<Calendar size={16} />
								{`Submitted on: ${format(new Date(createdAt), 'yyyy-MM-dd')}`}
							</p>
						)}
						{totalRecords && (
							<p>
								<CoronaVirus size={16} />
								{`Viral Genomes: ${totalRecords}`}
							</p>
						)}
						{status &&
							(status === SubmissionStatus.CLOSED || status === SubmissionStatus.INVALID) && (
								<p>
									<Info size={16} />
									{`Status: Submission failed. Data has errors`}
								</p>
							)}
						{status && (status === SubmissionStatus.OPEN || status === SubmissionStatus.VALID) && (
							<p>
								<Spinner size={16} />
								{`Status: Submission incomplete`}
							</p>
						)}
						{status && status === SubmissionStatus.COMMITTED && (
							<p>
								<Success size={16} />
								{`Status: Submission complete`}
							</p>
						)}
					</div>
				)}
			</section>

			{loading ? (
				<LoaderMessage inline message="Loading data..." size="20px" />
			) : (
				originalFileNames &&
				originalFileNames?.length > 0 && (
					<ul
						css={css`
							font-size: 13px;
							list-style: none;
							margin: 0;
							padding: 0;

							li {
								align-items: center;
								display: flex;
								margin-bottom: 10px;
							}

							svg {
								margin-right: 5px;
							}
						`}
					>
						{originalFileNames?.map((fileName: string) => (
							<li key={`submission-fileName-${fileName}`}>
								<File fill={theme.colors.secondary_dark} />
								{`${fileName}`}
							</li>
						))}
					</ul>
				)
			)}
		</header>
	);
};

export default Overview;
