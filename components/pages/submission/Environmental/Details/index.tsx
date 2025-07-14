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
import { ReactElement, useCallback, useEffect, useReducer, useState } from 'react';

import GenericTable from '#components/GenericTable';
import { LoaderWrapper } from '#components/Loader';
import defaultTheme from '#components/theme';
import useAuthContext from '#global/hooks/useAuthContext';
import useEnvironmentalData, {
	SubmissionStatus,
	type SubmissionData,
	type SubmissionFile,
	type UploadData,
} from '#global/hooks/useEnvironmentalData';

import FileUploadInstructionsModal from '../NewSubmissions/FileUploadInstructionsModal';
import type { SubmissionManifest } from '../NewSubmissions/types';

import columns from './columns';
import Overview from './Overview';
import { uploadsStatusDictionary, uploadsStatusReducer } from './submissionStatusHelpers';
import { SubmissionDetailsProps, UploadDetailsAction, UploadStatus } from './types';

const wait = (delay: number) => {
	return new Promise((resolve) => setTimeout(resolve, delay));
};

const getPendingUploadFileManifests = (files?: SubmissionFile[]) => {
	return (files || [])
		?.filter((file) => !file.isUploaded)
		.map(({ objectId, fileName, md5Sum }) => ({
			objectId,
			fileName,
			md5Sum,
		}));
};

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
	const [openGuideModal, setOpenGuideModal] = useState(false);
	const [pendingUploadManifests, setPendingUploadManifests] = useState<SubmissionManifest[]>([]);

	const { token } = useAuthContext();
	const {
		awaitingResponse,
		fetchSubmissionById,
		formatUploadData,
		commitSubmission,
		getAnalysisIds,
		getSampleId,
	} = useEnvironmentalData('SubmissionsDetails');

	const fetchSubmissionDetails = useCallback(async () => {
		const controller = new AbortController();
		async function getDetailsSubmission() {
			try {
				const submissionResponse = await fetchSubmissionById(ID, {
					signal: controller.signal,
					tries: 3,
				});

				const { organization, createdAt, id, status, files } = submissionResponse;
				const formattedData = formatUploadData(submissionResponse);
				const totalRecordsCount = formattedData.length;

				// Set organization
				setOrganization(organization);

				// Data to display in Overview table
				setSubmissionData({
					createdAt,
					submissionFiles: files?.map(({ fileName }) => fileName),
					submissionId: id.toString(),
					totalRecords: totalRecordsCount,
					status,
				});

				const pendingUploadManifests = getPendingUploadFileManifests(files);

				setPendingUploadManifests(pendingUploadManifests);

				if (pendingUploadManifests.length) {
					setOpenGuideModal(true);
				}

				// Data to display in Main Table
				submissionDetailsDispatch({
					type: UploadDetailsAction.NEW,
					uploads: formattedData,
				});

				// Total amount of records uploading
				setTotalUploads(totalRecordsCount);

				// Submission validity
				setSubmissionStatus(status);

				// Track update status
				setDataIsPending(
					formattedData.some(({ status }: UploadData) => status === UploadStatus.PROCESSING),
				);
			} catch (error) {
				setSubmissionStatus(SubmissionStatus.INVALID);
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

	// gets the initial status for all the uploads
	useEffect(() => {
		if (token && totalUploads === 0) {
			fetchSubmissionDetails();
		}
	}, [token, ID, totalUploads, fetchSubmissionDetails]);

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

		function completeAllProcessingRecords() {
			Object.values(submissionDetails)
				.flat()
				.filter(({ status }) => status === UploadStatus.PROCESSING)
				.forEach((analysis) => {
					analysis.status = UploadStatus.COMPLETE;
					submissionDetailsDispatch({
						type: UploadDetailsAction.UPDATE,
						upload: analysis,
					});
				});
		}

		async function trackPendingData({
			tries = 1,
			delay = 1000,
		}: {
			tries?: number;
			delay?: number;
		}) {
			const pageSize = 20;
			const failedGetSystemId: UploadData[] = [];
			const failedGetSampleId: UploadData[] = [];
			try {
				const processingRecords = Object.values(submissionDetails)
					.flat()
					.filter(({ status }) => status === UploadStatus.PROCESSING);

				// Filter out records to get their analysis IDs
				const recordsMissingSystemId = processingRecords
					.filter(({ systemId }) => !systemId)
					.slice(0, pageSize);

				if (recordsMissingSystemId.length) {
					const resultRecordsWithSystemId = await getAnalysisIds(
						organization,
						recordsMissingSystemId,
						{
							signal: controller.signal,
						},
					);

					resultRecordsWithSystemId.forEach((record) => {
						submissionDetailsDispatch({
							type: UploadDetailsAction.UPDATE,
							upload: record,
						});
					});

					// Records that failed to get System IDs
					failedGetSystemId.push(...resultRecordsWithSystemId.filter((record) => !record.systemId));
				}

				// Filter out records to get their analysis IDs
				const recordsMissingSampleId = processingRecords
					.filter(({ submitterSampleId }) => !submitterSampleId)
					.slice(0, pageSize);

				if (recordsMissingSampleId.length) {
					const resultRecordsWithSampleId = await getSampleId(recordsMissingSampleId, {
						signal: controller.signal,
					});

					resultRecordsWithSampleId.forEach((record) => {
						submissionDetailsDispatch({
							type: UploadDetailsAction.UPDATE,
							upload: record,
						});
					});

					failedGetSampleId.push(
						// Records that failed to get Sample IDs
						...resultRecordsWithSampleId.filter((record) => !record.submitterSampleId),
					);
				}

				const recordsMissingIds = recordsMissingSampleId.length + recordsMissingSystemId.length;
				if (recordsMissingIds === 0) {
					// No more records left to process
					setDataIsPending(false);
					completeAllProcessingRecords();
					return;
				}

				// Check if there are any records to process in the next batch
				const remainingToProcess = processingRecords
					.filter(
						// Exclude records that failed to retrieve submitterSampleId, by matching systemIds
						({ systemId }) =>
							!failedGetSampleId.some((failedRecord) => failedRecord.systemId === systemId),
					)
					.filter(
						// Exclude records that failed to retrieve systemId, by matching submitterSampleIds
						({ submitterSampleId }) =>
							!failedGetSystemId.some(
								(failedGetSampleId) => failedGetSampleId.submitterSampleId === submitterSampleId,
							),
					);

				const failedGettingIds = failedGetSystemId.length + failedGetSampleId.length;

				setDataIsPending(remainingToProcess.length > 0 || failedGettingIds > 0);

				if (remainingToProcess.length) {
					// There are still records to process
					trackPendingData({ tries, delay });
				} else if (failedGettingIds > 0 && tries > 1) {
					// There are only records that failed to get IDs. Retry getting IDs for the failed records
					const triesLeft = tries - 1;
					await wait(delay);
					trackPendingData({ tries: triesLeft, delay });
				} else {
					// Set all records as complete
					completeAllProcessingRecords();
				}
			} catch (error) {
				console.error('Error handling submission:', error);
				const triesLeft = tries - 1;
				if (triesLeft) {
					await wait(delay);
					trackPendingData({ tries: triesLeft, delay });
				} else {
					// Set all records as complete
					completeAllProcessingRecords();
				}
			}
		}

		if (dataIsPending) {
			switch (submissionStatus) {
				case SubmissionStatus.VALID:
				case SubmissionStatus.OPEN:
					// If all required files have been uploaded, proceed to commit the submission.
					if (pendingUploadManifests.length === 0) {
						commit();
					}
					break;

				case SubmissionStatus.COMMITTED:
					trackPendingData({ tries: 3 });
					break;
			}
		}
		return () => {
			// Abort the request when the component unmounts or when a dependency changes
			controller.abort();
		};
	}, [
		dataIsPending,
		submissionStatus,
		pendingUploadManifests,
		ID,
		commitSubmission,
		getAnalysisIds,
		getSampleId,
		organization,
		submissionDetails,
	]);

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
				missingUploadFiles={pendingUploadManifests.map((f) => f.fileName)}
				handleMissingUploadFiles={() => setOpenGuideModal(true)}
				status={submissionStatus}
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
				{openGuideModal && (
					<FileUploadInstructionsModal
						submissionManifest={pendingUploadManifests}
						submissionId={ID}
						onClose={() => {
							setOpenGuideModal(false);
							fetchSubmissionDetails();
						}}
					/>
				)}
			</LoaderWrapper>
		</article>
	);
};

export default SubmissionDetails;
