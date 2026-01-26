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
import { getPaginationRange, PaginationToolBar } from '#components/Pagination';
import useAuthContext from '#global/hooks/useAuthContext';
import useEnvironmentalData, {
	SubmissionStatus,
	type SubmissionOverview,
	type SubmissionFile,
	type UploadData,
} from '#global/hooks/useEnvironmentalData';
import type { SubmissionManifest } from '#global/utils/fileManifest';

import FileUploadInstructionsModal from '../NewSubmissions/FileUploadInstructionsModal';

import columns from './columns';
import Overview from './Overview';
import { uploadsStatusDictionary, uploadsStatusReducer } from './submissionStatusHelpers';
import { SubmissionDetailsProps, UploadDetailsAction, UploadStatus } from './types';

const wait = (delay: number) => {
	return new Promise((resolve) => setTimeout(resolve, delay));
};

/**
 * Return files that have not been uploaded
 * @param files
 * @returns
 */
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
	const theme = useTheme();
	const [submissionOverview, setSubmissionOverview] = useState<SubmissionOverview>();
	const [dataIsPending, setDataIsPending] = useState(false);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [firstRecord, setFirstRecord] = useState(1);
	const [lastRecord, setLastRecord] = useState(1);
	const [submissionRecords, submissionRecordsDispatch] = useReducer(uploadsStatusReducer, uploadsStatusDictionary);
	const [openGuideModal, setOpenGuideModal] = useState(false);
	const [pendingUploadManifests, setPendingUploadManifests] = useState<SubmissionManifest[]>([]);

	const { token } = useAuthContext();
	const {
		awaitingResponse,
		fetchSubmissionRecords,
		fetchSubmissionSummaryById,
		formatUploadData,
		commitSubmission,
		getAnalysisIds,
	} = useEnvironmentalData('SubmissionsDetails');

	const pageSize = 50;

	/**
	 * Marks all records with `PROCESSING` status as `COMPLETE` in the submission details.
	 */
	const completeAllProcessingRecords = useCallback(() => {
		Object.values(submissionRecords)
			.flat()
			.filter(({ status }) => status === UploadStatus.PROCESSING)
			.forEach((analysis) => {
				analysis.status = UploadStatus.COMPLETE;
				submissionRecordsDispatch({
					type: UploadDetailsAction.UPDATE,
					upload: analysis,
				});
			});
	}, [submissionRecords, submissionRecordsDispatch]);

	/**
	 * Commit submission to Submission Service.
	 * If the Submission is successfully commited (i.e. 'PROCESSING' status)
	 * this function will update the submission status to `COMMITTED` and clears the list
	 * of pending upload file manifests.
	 */
	const commit = useCallback(
		async (signal?: AbortSignal) => {
			const commitSubmissionResponse = await commitSubmission(ID, { signal });
			if (commitSubmissionResponse.status === UploadStatus.PROCESSING) {
				setSubmissionOverview((prev) => (prev ? { ...prev, status: SubmissionStatus.COMMITTED } : prev));
				setPendingUploadManifests([]);
			}
		},
		[commitSubmission, ID],
	);

	/**
	 * Fetches and initializes submission details from the backend.
	 * This function:
	 * - Retrieves the submission by ID with retry and abort support.
	 * - Formats and stores data for both overview and detailed upload views.
	 * - Automatically commits the submission if its status is `VALID`.
	 * - Initializes state such as organization, total records count, upload status,
	 *   and pending file upload manifests.
	 *
	 * If the fetch fails, it sets the submission status to `INVALID`.
	 */
	const loadSubmissionInformation = useCallback(async () => {
		const controller = new AbortController();
		async function getDetailsSubmission() {
			try {
				const submissionResponse = await fetchSubmissionSummaryById(ID, {
					signal: controller.signal,
					tries: 3,
				});

				const { organization, createdAt, id, status, files, data } = submissionResponse;
				const totalRecordsCount = data.total;

				// Data to display in Overview table
				setSubmissionOverview({
					createdAt,
					submissionFiles: files || [],
					submissionId: id.toString(),
					totalRecords: totalRecordsCount,
					organization,
					status,
				});

				const filesNotUploaded = getPendingUploadFileManifests(files);

				setPendingUploadManifests(filesNotUploaded);

				// Total amount of records uploading
				const totalPages = Math.ceil(totalRecordsCount / pageSize);
				setLastPage(totalPages);
			} catch (error) {
				setSubmissionOverview((prev) => (prev ? { ...prev, status: SubmissionStatus.INVALID } : prev));
				console.error('Error fetching submission:', error);
			}
		}

		if (token && !submissionOverview) {
			getDetailsSubmission();
		}
		return () => {
			// Abort the request when the component unmounts or when a dependency changes
			controller.abort();
		};
	}, [token, ID, submissionOverview]);

	const trackPendingData = useCallback(
		async ({ tries = 1, delay = 1000, signal }: { tries?: number; delay?: number; signal?: AbortSignal }) => {
			const failedGetSystemId: UploadData[] = [];
			try {
				const processingRecords = Object.values(submissionRecords)
					.flat()
					.filter(({ status }) => status !== UploadStatus.COMPLETE);

				// Filter out records to get their analysis IDs
				const recordsMissingSystemId = processingRecords.filter(({ systemId }) => !systemId).slice(0, pageSize);

				if (recordsMissingSystemId.length) {
					const resultRecordsWithSystemId = await getAnalysisIds(
						submissionOverview?.organization || '',
						recordsMissingSystemId,
						{
							signal,
						},
					);

					resultRecordsWithSystemId.forEach((record) => {
						submissionRecordsDispatch({
							type: UploadDetailsAction.UPDATE,
							upload: record,
						});
					});

					// Records that failed to get System IDs
					failedGetSystemId.push(...resultRecordsWithSystemId.filter((record) => !record.systemId));
				}

				// Check if there are any records to process in the next batch
				const remainingToProcess = processingRecords.filter(
					// Include only records that are still processing or errored
					({ status }) => status !== UploadStatus.COMPLETE,
				);

				setDataIsPending(remainingToProcess.length > 0);

				if (failedGetSystemId.length > 0 && tries > 1) {
					// There are records that failed to get IDs. Retry getting IDs for the failed records
					const triesLeft = tries - 1;
					await wait(delay);
					trackPendingData({ tries: triesLeft, delay });
				} else if (remainingToProcess.length) {
					// There are still records to process
					trackPendingData({ tries, delay });
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
		},
		[submissionRecords, getAnalysisIds, submissionRecordsDispatch, setDataIsPending, completeAllProcessingRecords],
	);

	// gets the initial status for all the uploads
	useEffect(() => {
		if (token && !submissionOverview) {
			loadSubmissionInformation();
		}
	}, [token, ID, submissionOverview]);

	// get status updates if any are available from Submission Service
	useEffect(() => {
		const controller = new AbortController();
		if (dataIsPending && submissionOverview) {
			switch (submissionOverview?.status) {
				case SubmissionStatus.VALID:
				case SubmissionStatus.OPEN:
					// Trigger submission commit when the current status is 'VALID' or 'OPEN'
					commit(controller.signal);
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
	}, [dataIsPending, submissionOverview]);

	useEffect(() => {
		const controller = new AbortController();
		async function loadPage() {
			try {
				const submissionRecordsResponse = await fetchSubmissionRecords(ID, {
					signal: controller.signal,
					tries: 3,
					page,
					pageSize,
				});
				const formattedData = formatUploadData({
					records: submissionRecordsResponse,
					submissionId: ID,
					organization: submissionOverview?.organization || '',
					submissionStatus: submissionOverview?.status || SubmissionStatus.INVALID,
					files: submissionOverview?.submissionFiles,
				});

				const { first, last } = getPaginationRange(page, pageSize, submissionRecordsResponse.data.length || 0);
				setFirstRecord(first);
				setLastRecord(last);

				submissionRecordsDispatch({
					type: UploadDetailsAction.NEW,
					uploads: formattedData,
				});
				// Track update status
				setDataIsPending(formattedData.some(({ status }: UploadData) => status === UploadStatus.PROCESSING));
			} catch (error) {
				if (!controller.signal.aborted) {
					// optional: dispatch error state or log
					console.error('Failed to load submission records', error);
				}
			}
		}

		if (page && submissionOverview) {
			loadPage();
		}

		return () => {
			// Abort the request when the component unmounts or when a dependency changes
			controller.abort();
		};
	}, [page, submissionOverview, ID]);

	return (
		<article
			css={css`
				width: 100%;
			`}
		>
			<Overview
				createdAt={submissionOverview?.createdAt}
				loading={awaitingResponse}
				totalRecords={submissionOverview?.totalRecords.toString() || '0'}
				id={ID}
				missingUploadFiles={pendingUploadManifests.map((f) => f.fileName)}
				handleMissingUploadFiles={() => setOpenGuideModal(true)}
				status={submissionOverview?.status.toString()}
			/>

			<LoaderWrapper
				loading={awaitingResponse}
				size="10px"
			>
				{submissionOverview && submissionOverview.totalRecords > 0 && (
					<>
						<p
							css={css`
								display: block;
								font-size: 13px;
								margin: 10px 0;
							`}
						>
							{firstRecord} - {lastRecord} of {submissionOverview.totalRecords} Viral Genomes
						</p>
						<GenericTable
							columns={columns}
							data={Object.values(submissionRecords).flat()}
							emptyValue={'-'}
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
						<PaginationToolBar
							goToFirstPage={() => {
								setPage(1);
							}}
							goToPrevPage={() => {
								setPage((currentPage) => currentPage - 1);
							}}
							goToNextPage={() => {
								setPage((currentPage) => currentPage + 1);
							}}
							goToLastPage={() => {
								setPage(lastPage);
							}}
							isFirst={page === 1}
							isLast={lastPage === page}
							page={page}
						/>
					</>
				)}
				{openGuideModal && (
					<FileUploadInstructionsModal
						submissionManifest={pendingUploadManifests}
						submissionId={ID}
						onClose={() => {
							setOpenGuideModal(false);
							// Closing the modal will trigger submission commit to verify if
							// files have been uploaded.
							commit();
						}}
					/>
				)}
			</LoaderWrapper>
		</article>
	);
};

export default SubmissionDetails;
