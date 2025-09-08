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

import { useState } from 'react';
import urlJoin from 'url-join';

import {
	EventType,
	EventTypeToKey,
	UploadStatus,
} from '#components/pages/submission/Environmental/Details/types';
import type { CreateSubmissionResult } from '#components/pages/submission/Environmental/NewSubmissions/types';
import type { SubmissionPaginatedResponse } from '#components/pages/submission/Environmental/PreviousSubmissions/types';
import { getConfig } from '#global/config';
import useAuthContext from '#global/hooks/useAuthContext';
import processStream from '#global/utils/processStream';

import {
	SubmissionStatus,
	type CommitSubmissionResult,
	type ErrorDetails,
	type Submission,
	type SubmissionSummary,
	type UploadData,
} from './types';

const useEnvironmentalData = (origin: string) => {
	const {
		NEXT_PUBLIC_ENVIRONMENTAL_SUBMISSION_API_URL,
		NEXT_PUBLIC_ENVIRONMENTAL_SUBMISSION_CATEGORY_ID,
		NEXT_PUBLIC_ENVIRONMENTAL_SAMPLE_ID_FIELD_NAME,
	} = getConfig();
	const { fetchWithAuth, user } = useAuthContext();
	const [awaitingResponse, setAwaitingResponse] = useState(false);

	// For reference: https://submission-service.dev.virusseq-dataportal.ca/api-docs/
	const handleRequest = async ({
		url,
		method = 'GET',
		headers,
		body,
		signal,
	}: {
		url: string;
		headers?: HeadersInit;
		method: string;
		body?: BodyInit;
		signal?: AbortSignal;
	}) => {
		setAwaitingResponse(true);

		try {
			const response = await fetchWithAuth(url, {
				headers,
				method,
				body,
				signal,
			});
			const stream = response?.body;
			return stream?.constructor?.name === 'ReadableStream'
				? processStream(origin, stream.getReader())()
						.then((parsedStream: string) => {
							setAwaitingResponse(false);
							return parsedStream && JSON.parse(parsedStream);
						})
						.catch((error: Error | string) => {
							console.log(`Offending stream at ${origin}`, stream);
							console.error(error);
							return error;
						})
				: (console.error(stream), new Error(`Unspecified error at ${origin}`));
		} catch (err) {
			setAwaitingResponse(false);
			console.error('error', err);
			return err;
		}
	};

	/**
	 * Sends a POST request to Submission Service to commit Submission
	 * @param id - ID of the Submission to commit
	 * @param signal - A signal object that allows to abort request if required
	 * @returns
	 */
	const commitSubmission = async (
		id: string,
		{ signal }: { signal?: AbortSignal } = {},
	): Promise<CommitSubmissionResult> => {
		return handleRequest({
			url: urlJoin(
				NEXT_PUBLIC_ENVIRONMENTAL_SUBMISSION_API_URL,
				'submission',
				'category',
				NEXT_PUBLIC_ENVIRONMENTAL_SUBMISSION_CATEGORY_ID,
				'commit',
				id,
			),
			method: 'POST',
			signal,
		});
	};

	const wait = (delay: number) => {
		return new Promise((resolve) => setTimeout(resolve, delay));
	};

	/**
	 * Fetch Submission details by its unique ID
	 * @param id
	 * @returns
	 */
	const fetchSubmissionById = async (
		id: string,
		{
			signal,
			tries = 1,
			delay = 1000,
		}: { signal?: AbortSignal; tries?: number; delay?: number } = {},
	): Promise<Submission> => {
		const onError = async (err: unknown) => {
			const triesLeft = tries - 1;
			if (!triesLeft) {
				throw err;
			}
			await wait(delay);
			return fetchSubmissionById(id, { signal, tries: triesLeft, delay });
		};

		try {
			const submissionResponse = await handleRequest({
				url: urlJoin(NEXT_PUBLIC_ENVIRONMENTAL_SUBMISSION_API_URL, 'submission', id),
				method: 'GET',
				signal,
			});

			if (
				!submissionResponse?.data ||
				!Object.values(EventTypeToKey).some((status) => status in submissionResponse.data)
			) {
				throw new Error('Unexpected response getting submission details', submissionResponse);
			}
			return submissionResponse;
		} catch (error) {
			return onError(error);
		}
	};

	const fetchPreviousSubmissions = async ({
		username,
		signal,
		page = 1,
		pageSize = 20,
	}: {
		username?: string;
		signal?: AbortSignal;
		page?: number;
		pageSize?: number;
	} = {}): Promise<SubmissionPaginatedResponse> => {
		const response = await handleRequest({
			url: urlJoin(
				NEXT_PUBLIC_ENVIRONMENTAL_SUBMISSION_API_URL,
				'submission',
				'category',
				NEXT_PUBLIC_ENVIRONMENTAL_SUBMISSION_CATEGORY_ID,
				`?page=${page}`,
				`&pageSize=${pageSize}`,
				username ? `&username=${username}` : '',
			),
			method: 'GET',
			signal,
		});

		return {
			data: response.records,
			first: response.pagination.currentPage === 1,
			last: response.pagination.currentPage === response.pagination.totalPages,
			page: response.pagination.currentPage,
			size: response.records.length,
			totalPages: response.pagination.totalPages,
			totalRecords: response.pagination.totalRecords,
		};
	};

	/**
	 * Formats the submission data into an array  of`UploadData` objects
	 * representing the formatted upload data
	 *
	 * @param submission
	 * @returns
	 */
	const formatUploadData = (submission: Submission): UploadData[] => {
		const organization = submission.organization;
		const submissionId = submission.id.toString();

		const isUploadPending = submission.files?.some((f) => !f.isUploaded) ?? false;

		const incompleteStatuses: SubmissionStatus[] = [
			SubmissionStatus.CLOSED,
			SubmissionStatus.INVALID,
		];

		// Formatting Insert records
		const insertRecords =
			submission.data[EventTypeToKey.INSERT]?.sample?.records?.map<UploadData>((item, index) => {
				const fileName = [submission.data[EventTypeToKey.INSERT]?.sample.batchName];
				const errors = submission.errors[EventTypeToKey.INSERT]?.sample || [];
				const errorDetails = getErrorDetailsMessage(errors, index);
				const identifier = item[NEXT_PUBLIC_ENVIRONMENTAL_SAMPLE_ID_FIELD_NAME]?.toString();

				let recordStatus: UploadStatus = UploadStatus.PROCESSING;
				if (errorDetails.length) {
					recordStatus = UploadStatus.ERROR;
				} else if (incompleteStatuses.includes(submission.status)) {
					recordStatus = UploadStatus.INCOMPLETE;
				}

				if (isUploadPending) {
					errorDetails.push('File upload is still pending');
					recordStatus = UploadStatus.ERROR;
				}

				return {
					submitterSampleId: identifier || '',
					submissionId: submissionId,
					eventType: EventType.INSERT,
					details: errorDetails,
					organization: organization,
					originalFilePair: fileName,
					status: recordStatus,
					systemId: '',
				};
			}) ?? [];

		// Formatting Update records
		const updateRecords =
			submission.data[EventTypeToKey.UPDATE]?.sample?.map<UploadData>((item, index) => {
				const errors = submission.errors[EventTypeToKey.UPDATE]?.sample || [];
				const errorDetails = getErrorDetailsMessage(errors, index);
				const updateDetails = [
					JSON.stringify({ old: item.old }),
					JSON.stringify({ new: item.new }),
				];

				let recordStatus: UploadStatus = UploadStatus.PROCESSING;
				if (errorDetails.length) {
					recordStatus = UploadStatus.ERROR;
				} else if (incompleteStatuses.includes(submission.status)) {
					recordStatus = UploadStatus.INCOMPLETE;
				}

				return {
					submitterSampleId: '', // Sample ID will be retrieved later
					submissionId: submissionId,
					eventType: EventType.UPDATE,
					details: recordStatus === UploadStatus.PROCESSING ? updateDetails : errorDetails,
					organization: organization,
					originalFilePair: [''],
					status: recordStatus,
					systemId: item.systemId,
				};
			}) ?? [];

		// Formatting Delete records
		const deleteRecords =
			submission.data[EventTypeToKey.DELETE]?.sample?.map<UploadData>((item, index) => {
				const identifier = item.data[NEXT_PUBLIC_ENVIRONMENTAL_SAMPLE_ID_FIELD_NAME]?.toString();
				const errors = submission.errors[EventTypeToKey.DELETE]?.sample || [];
				const errorDetails = getErrorDetailsMessage(errors, index);

				let recordStatus: UploadStatus = UploadStatus.PROCESSING;
				if (errorDetails.length) {
					recordStatus = UploadStatus.ERROR;
				} else if (incompleteStatuses.includes(submission.status)) {
					recordStatus = UploadStatus.INCOMPLETE;
				} else if (submission.status === SubmissionStatus.COMMITTED) {
					recordStatus = UploadStatus.COMPLETE;
				}

				return {
					submitterSampleId: identifier || '',
					submissionId: submissionId,
					eventType: EventType.DELETE,
					details: errorDetails,
					organization: organization,
					originalFilePair: [''],
					status: recordStatus,
					systemId: item.systemId,
				};
			}) ?? [];

		return [...insertRecords, ...updateRecords, ...deleteRecords];
	};

	/**
	 * Gets the Active Submission for this user
	 * @param organization
	 * @returns
	 */
	const getActiveSubmission = async (
		organization: string,
		username?: string,
	): Promise<Promise<SubmissionSummary | undefined>> => {
		const queryParams = new URLSearchParams({
			organization,
			pageSize: '1',
			onlyActive: 'true',
		});

		if (username) {
			queryParams.append('username', username);
		}

		const responseActiveSubmission = await handleRequest({
			url: urlJoin(
				NEXT_PUBLIC_ENVIRONMENTAL_SUBMISSION_API_URL,
				'submission',
				'category',
				NEXT_PUBLIC_ENVIRONMENTAL_SUBMISSION_CATEGORY_ID,
				`?${queryParams.toString()}`,
			),
			method: 'GET',
		});

		if (responseActiveSubmission.records) {
			// By design, only 1 active submission can exists by user and organization
			return responseActiveSubmission.records[0];
		} else {
			return;
		}
	};

	/**
	 * Fetches and updates analysis IDs and status for the provided records
	 * @param organization
	 * @param records
	 * @returns
	 */
	const getAnalysisIds = async (
		organization: string,
		records: UploadData[],
		{ signal }: { signal?: AbortSignal } = {},
	) => {
		// Construct query parameters
		const queryParams = new URLSearchParams({
			entityName: 'sample',
			pageSize: records.length.toString(),
		});

		// Extract sample IDs from records
		const sampleIds = records.map((record) => record.submitterSampleId);

		const sqonFilter = {
			op: 'and',
			content: [
				{
					op: 'in',
					content: {
						fieldName: NEXT_PUBLIC_ENVIRONMENTAL_SAMPLE_ID_FIELD_NAME,
						value: sampleIds,
					},
				},
			],
		};

		const queryResponse = await handleRequest({
			url: urlJoin(
				NEXT_PUBLIC_ENVIRONMENTAL_SUBMISSION_API_URL,
				'data',
				'category',
				NEXT_PUBLIC_ENVIRONMENTAL_SUBMISSION_CATEGORY_ID,
				'organization',
				organization,
				'query',
				`?${queryParams.toString()}`,
			),
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(sqonFilter),
			signal,
		});

		if (!queryResponse.records) {
			throw new Error('Invalid response: "records" field is missing in the API response.');
		}

		// Map records to include `systemId` and update status
		return records.map((record) => {
			const matchingRecord = queryResponse.records.find(
				(resp: any) =>
					resp.data[NEXT_PUBLIC_ENVIRONMENTAL_SAMPLE_ID_FIELD_NAME] === record.submitterSampleId,
			);
			if (matchingRecord) {
				record.status = UploadStatus.COMPLETE;
				record.systemId = matchingRecord.systemId;
				record.details = [];
			}
			return record;
		});
	};

	/**
	 * Retrieves formatted error message for a specific index from a list of errors
	 * @param errors
	 * @param index
	 * @returns An array of formatted error messages
	 */
	const getErrorDetailsMessage = (errors: ErrorDetails[], index: number): string[] => {
		const errorDetails = errors.filter((error) => error.index === index);

		const message = errorDetails.map((err) => {
			const valuePart = err.fieldValue ? `- Value: '${err.fieldValue}'` : '';
			const errorsPart = err.errors
				? `- Details: '${err.errors[0].message.replace(/\.+$/, '')}'`
				: '';

			return `${err.reason} - Field: '${err.fieldName}' ${valuePart} ${errorsPart}`;
		});

		return message;
	};

	/**
	 * Submit files for processing as part of a Submission
	 * If an Active Submission already exists it will be closed
	 * @param param0
	 * @returns
	 */
	const submitData = async ({ body }: { body: FormData }): Promise<CreateSubmissionResult> => {
		const organization = body.get('organization')?.toString();
		if (!organization) throw new Error('Organization is required field');

		const activeSubmission = await getActiveSubmission(organization, user?.email);

		if (activeSubmission) {
			// need to delete previous active Submission
			await handleRequest({
				url: urlJoin(
					NEXT_PUBLIC_ENVIRONMENTAL_SUBMISSION_API_URL,
					'submission',
					activeSubmission.id.toString(),
				),
				method: 'DELETE',
				body: body,
			});
		}

		return handleRequest({
			url: urlJoin(
				NEXT_PUBLIC_ENVIRONMENTAL_SUBMISSION_API_URL,
				'submission',
				'category',
				NEXT_PUBLIC_ENVIRONMENTAL_SUBMISSION_CATEGORY_ID,
				'data',
			),
			method: 'POST',
			body: body,
		});
	};

	return {
		awaitingResponse,
		commitSubmission,
		fetchPreviousSubmissions,
		fetchSubmissionById,
		formatUploadData,
		getActiveSubmission,
		getAnalysisIds,
		setAwaitingResponse,
		submitData,
	};
};

export default useEnvironmentalData;

export * from './types';
