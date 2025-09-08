/*
 *
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
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

import GenericTable from '#components/GenericTable';
import { LoaderWrapper } from '#components/Loader';
import NoScopes from '#components/NoScopes';
import { PaginationToolBar } from '#components/Pagination';
import defaultTheme from '#components/theme';
import { CoronaVirus } from '#components/theme/icons';
import useAuthContext from '#global/hooks/useAuthContext';
import useEnvironmentalData from '#global/hooks/useEnvironmentalData';

import columns from './columns';
import { SubmissionPaginatedResponse } from './types';

const PreviousSubmissions = ({
	pageSize = 20,
	paginationEnabled = true,
}: {
	pageSize?: number;
	paginationEnabled?: boolean;
}): ReactElement => {
	const theme: typeof defaultTheme = useTheme();
	const { token, userHasEnvironmentalAccess, user } = useAuthContext();
	const { awaitingResponse, fetchPreviousSubmissions } =
		useEnvironmentalData('PreviousSubmissions');
	const [previousSubmissions, setPreviousSubmissions] = useState<SubmissionPaginatedResponse>({
		data: [],
		first: true,
		last: true,
		page: 1,
		size: 0,
		totalPages: 1,
		totalRecords: 0,
	});

	useEffect(() => {
		const controller = new AbortController();
		token &&
			userHasEnvironmentalAccess &&
			fetchPreviousSubmissions({ username: user?.email, signal: controller.signal, pageSize })
				.then(setPreviousSubmissions)
				.catch((error) => {
					console.error('Error fetching previous submissions:', error);
				});

		return () => {
			// Abort the request when the component unmounts or when a dependency changes
			controller.abort();
		};
	}, [token, userHasEnvironmentalAccess]);

	const goToFirstPage = () => {
		if (previousSubmissions.first) return;
		fetchPreviousSubmissions({ username: user?.email, page: 1, pageSize }).then(
			setPreviousSubmissions,
		);
	};

	const goToPrevPage = () => {
		if (previousSubmissions.first || previousSubmissions.page === undefined) return;
		fetchPreviousSubmissions({
			username: user?.email,
			page: previousSubmissions.page - 1,
			pageSize,
		}).then(setPreviousSubmissions);
	};

	const goToNextPage = () => {
		if (previousSubmissions.last || previousSubmissions.page === undefined) return;
		fetchPreviousSubmissions({
			username: user?.email,
			page: previousSubmissions.page + 1,
			pageSize,
		}).then(setPreviousSubmissions);
	};

	const goToLastPage = () => {
		if (previousSubmissions.last || previousSubmissions.totalPages === undefined) return;
		fetchPreviousSubmissions({
			username: user?.email,
			page: previousSubmissions.totalPages,
			pageSize,
		}).then(setPreviousSubmissions);
	};

	return (
		<article
			css={css`
				width: 100%;
			`}
		>
			{userHasEnvironmentalAccess ? (
				<LoaderWrapper loading={awaitingResponse} message="Retrieving your submissions.">
					{previousSubmissions.size > 0 ? (
						<>
							<GenericTable
								caption="Submissions made by you in the past"
								columns={columns}
								data={previousSubmissions.data}
								sortable={{
									defaultSortBy: [
										{
											id: 'createdAt',
										},
									],
								}}
								style={css`
									margin-top: 35px;
									max-height: 315px;

									&.sortable {
										th.asc {
											border-top-color: ${theme.colors.accent};
										}

										th.desc {
											border-bottom-color: ${theme.colors.accent};
										}
									}

									td {
										vertical-align: top;
									}

									.tableColumnHeader-id {
										width: 242px;
									}

									.tableColumnHeader-createdAt,
									.tableColumnHeader-data {
										width: 115px;
									}
								`}
							/>
							{paginationEnabled && (
								<div
									css={css`
										display: flex;
										justify-content: space-between;
									`}
								>
									<div
										css={css`
											display: inline-flex;
											align-items: center;
											column-gap: 10px;
										`}
									>
										<PaginationToolBar
											goToFirstPage={goToFirstPage}
											goToPrevPage={goToPrevPage}
											goToNextPage={goToNextPage}
											goToLastPage={goToLastPage}
											isFirst={previousSubmissions.first}
											isLast={previousSubmissions.last}
											page={previousSubmissions.page ?? 1}
										/>
									</div>
								</div>
							)}
						</>
					) : (
						<figure
							css={css`
								align-items: center;
								border: 1px solid ${theme.colors.grey_4};
								display: flex;
								flex-direction: column;
								font-size: 14px;
								height: 315px;
								justify-content: center;
								margin: 40px 0 0;
								text-align: center;
							`}
						>
							<CoronaVirus
								fill={theme.colors.grey_6}
								size={25}
								style={css`
									margin-bottom: 10px;
								`}
							/>
							<figcaption>
								You have not submitted any data yet.
								<br />
								Get started by starting a new submission.
							</figcaption>
						</figure>
					)}
				</LoaderWrapper>
			) : (
				<NoScopes />
			)}
		</article>
	);
};

export default PreviousSubmissions;
