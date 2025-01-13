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
import { ReactElement, useEffect, useReducer, useState } from 'react';

import GenericTable from '@/components/GenericTable';
import { LoaderWrapper } from '@/components/Loader';
import defaultTheme from '@/components/theme';
import useAuthContext from '@/global/hooks/useAuthContext';
import useEnvironmentalData, {
	SubmissionStatus,
	type SubmissionData,
	type UploadData,
} from '@/global/hooks/useEnvironmentalData';

import columns from './columns';
import Overview from './Overview';
import { uploadsStatusDictionary, uploadsStatusReducer } from './submissionStatusHelpers';
import { SubmissionDetailsProps, UploadDetailsAction, UploadStatus } from './types';

const SubmissionDetails = ({ ID }: SubmissionDetailsProps): ReactElement => {
	const theme: typeof defaultTheme = useTheme();
	const [totalUploads, setTotalUploads] = useState(0);
	const [submissionData, setSubmissionData] = useState<SubmissionData>();
	const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>();
	const [organization, setOrganization] = useState('');
	const [dataIsPending, setDataIsPending] = useState(false);
	const [submissionDetails, submissionDetailsDispatch] = useReducer(
		uploadsStatusReducer,
		uploadsStatusDictionary,
	);

	const { token } = useAuthContext();
	const {
		awaitingResponse,
		fetchSubmissionById,
		formatUploadData,
		commitSubmission,
		getAnalysisIds,
	} = useEnvironmentalData('SubmissionsDetails');

	// gets the initial status for all the uploads
	useEffect(() => {
		const controller = new AbortController();
		async function getDetailsSubmission() {
			try {
				const submissionResponse = await fetchSubmissionById(ID, { signal: controller.signal });

				if (!submissionResponse?.data || !('inserts' in submissionResponse.data)) {
					console.error('Unexpected response getting submission details', submissionResponse);
					return;
				}

				const { organization, createdAt, id, status, data } = submissionResponse;
				const formattedData = formatUploadData(submissionResponse);
				const sampleInserts = data.inserts?.sample;
				const totalRecords = sampleInserts?.records.length || 0;

				// Set organization
				setOrganization(organization);

				// Data to display in Overview table
				setSubmissionData({
					createdAt,
					originalFileNames: [sampleInserts?.batchName],
					submissionId: id.toString(),
					totalRecords: totalRecords,
				});

				// Data to display in Main Table
				submissionDetailsDispatch({
					type: UploadDetailsAction.NEW,
					uploads: formattedData,
				});

				// Total amount of records uploading
				setTotalUploads(totalRecords);

				// Submission validity
				setSubmissionStatus(status);

				// Track update status
				setDataIsPending(
					formattedData.some(({ status }: UploadData) => status === UploadStatus.PROCESSING),
				);
			} catch (error) {
				console.error('Error fetching submission:', error);
			}
		}

		if (token && totalUploads === 0) {
			getDetailsSubmission();
		}
		return () => {
			// Abort the request when the component unmounts or when a dependency changes
			controller.abort();
		};
	}, [token, ID]);

	// get status updates if any are available from Submission Service
	useEffect(() => {
		const controller = new AbortController();
		async function commit() {
			// Commit submission
			const commitSubmissionResponse = await commitSubmission(ID, { signal: controller.signal });
			if (commitSubmissionResponse.status === UploadStatus.PROCESSING) {
				setSubmissionStatus(SubmissionStatus.COMMITTED);
			}
		}

		async function trackPendingData() {
			try {
				const analysisIds = await getAnalysisIds(organization, submissionDetails.PROCESSING, {
					signal: controller.signal,
				});

				analysisIds.forEach((analysis) => {
					submissionDetailsDispatch({
						type: UploadDetailsAction.UPDATE,
						upload: analysis,
					});
				});

				setDataIsPending(
					Object.values(submissionDetails)
						.flat()
						.some(({ status }) => status === UploadStatus.PROCESSING),
				);
			} catch (error) {
				console.error('Error handling submission:', error);
			}
		}

		if (dataIsPending) {
			switch (submissionStatus) {
				case SubmissionStatus.VALID:
				case SubmissionStatus.OPEN:
					commit();
					break;

				case SubmissionStatus.COMMITTED:
					trackPendingData();
					break;
			}
		}
		return () => {
			// Abort the request when the component unmounts or when a dependency changes
			controller.abort();
		};
	}, [dataIsPending, submissionStatus, ID]);

	return (
		<article
			css={css`
				width: 100%;
			`}
		>
			<Overview
				createdAt={submissionData?.createdAt}
				loading={awaitingResponse}
				totalRecords={totalUploads.toString()}
				id={ID}
				originalFileNames={submissionData?.originalFileNames}
			/>

			<LoaderWrapper loading={awaitingResponse} size="10px">
				{totalUploads > 0 && (
					<>
						<p
							css={css`
								display: block;
								font-size: 13px;
								margin: 10px 0;
							`}
						>
							1 - {totalUploads} of {totalUploads} Viral Genomes
						</p>
						<GenericTable
							columns={columns}
							data={Object.values(submissionDetails).flat()}
							sortable={{
								defaultSortBy: [
									{
										id: 'status',
									},
								],
							}}
							style={css`
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

									&:last-of-type {
										svg {
											margin-top: 2px;
											position: absolute;
										}
									}

									&:not(:last-of-type) {
										max-width: 250px;
										white-space: normal;
										width: 250px;
									}
								}
							`}
						/>
					</>
				)}
			</LoaderWrapper>
		</article>
	);
};

export default SubmissionDetails;
