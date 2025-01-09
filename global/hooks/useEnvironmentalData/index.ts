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

import { UploadStatus } from '@/components/pages/submission/Environmental/Details/types';

import { getConfig } from '../../config';
import processStream from '../../utils/processStream';
import useAuthContext from '../useAuthContext';

import type { ErrorDetails, Submission, UploadData } from './types';

const useEnvironmentalData = (origin: string) => {
	const {
		NEXT_PUBLIC_ENVIRONMENTAL_SUBMISSION_API_URL,
		NEXT_PUBLIC_ENVIRONMENTAL_SUBMISSION_CATEGORY_ID,
	} = getConfig();
	const { fetchWithAuth } = useAuthContext();
	const [awaitingResponse, setAwaitingResponse] = useState(false);
	const sampleIdFieldName = 'specimen collector sample ID';

	// For reference: https://submission-service.dev.virusseq-dataportal.ca/api-docs/
	const handleRequest = async ({
		url,
		method = 'GET',
		headers,
		body,
	}: {
		url: string;
		headers?: HeadersInit;
		method: string;
		body?: BodyInit;
	}) => {
		setAwaitingResponse(true);

		try {
			const response = await fetchWithAuth(url, {
				headers,
				method,
				body,
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
			console.error('error', err);
			return await Promise.reject(err);
		}
	};

	const commitSubmission = async (id: string) => {
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
		});
	};

	/**
	 * Fetch Submission details by its unique ID
	 * @param id
	 * @returns
	 */
	const fetchSubmissionById = async (id: string): Promise<Submission> => {
		return handleRequest({
			url: urlJoin(NEXT_PUBLIC_ENVIRONMENTAL_SUBMISSION_API_URL, 'submission', id),
			method: 'GET',
		});
	};

	const fetchPreviousSubmissions = async (): Promise<{ data: any }> => {
		const response = await handleRequest({
			url: urlJoin(
				NEXT_PUBLIC_ENVIRONMENTAL_SUBMISSION_API_URL,
				'submission',
				'category',
				NEXT_PUBLIC_ENVIRONMENTAL_SUBMISSION_CATEGORY_ID,
			),
			method: 'GET',
		});

		return { data: response.records };
	};

	/**
	 * Formats the submission data into an array  of`UploadData` objects
	 * representing the formatted upload data
	 *
	 * @param submission
	 * @returns
	 */
	const formatUploadData = (submission: Submission): UploadData[] => {
		const fileName = [submission.data.inserts?.sample.batchName];
		const organization = submission.organization;
		const submissionId = submission.id.toString();
		return submission.data.inserts?.sample.records.reduce<UploadData[]>((acc, item, index) => {
			// Retrieve the first error and indicate the number of additional errors if any
			const errors = submission.errors.inserts?.sample || [];
			const { status, message } = getErrorDetailsMessage(errors, index);
			acc.push({
				submitterSampleId: item[sampleIdFieldName]?.toString() || '',
				submissionId: submissionId,
				error: message,
				organization: organization,
				originalFilePair: fileName,
				status: status,
				systemId: '',
			});
			return acc;
		}, []);
	};

	/**
	 * Gets the Active Submission for this user
	 * @param organization
	 * @returns
	 */
	const getActiveSubmission = async (organization: string) => {
		const responseActiveSubmission = await handleRequest({
			url: urlJoin(
				NEXT_PUBLIC_ENVIRONMENTAL_SUBMISSION_API_URL,
				'submission',
				'category',
				NEXT_PUBLIC_ENVIRONMENTAL_SUBMISSION_CATEGORY_ID,
				'organization',
				organization,
			),
			method: 'GET',
		});

		return responseActiveSubmission.id;
	};

	/**
	 * Fetches and updates analysis IDs and status for the provided records
	 * @param organization
	 * @param records
	 * @returns
	 */
	const getAnalysisIds = async (organization: string, records: UploadData[]) => {
		// Construct query parameters
		const queryParams = new URLSearchParams({
			entityName: 'sample',
		});

		// Extract sample IDs from records
		const sampleIds = records.map((record) => record.submitterSampleId);

		const sqonFilter = {
			op: 'and',
			content: [
				{
					op: 'in',
					content: {
						fieldName: sampleIdFieldName,
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
		});

		if (!queryResponse.records) {
			throw new Error('Invalid response: "records" field is missing in the API response.');
		}

		// Map records to include `systemId` and update status
		return records.map((record) => {
			const matchingRecord = queryResponse.records.find(
				(resp: any) => resp.data[sampleIdFieldName] === record.submitterSampleId,
			);
			if (matchingRecord) {
				record.status = UploadStatus.COMPLETE;
				record.systemId = matchingRecord.systemId;
			}
			return record;
		});
	};

	/**
	 * Retrieves the status and formatted error message for a specific index from a list of errors
	 * @param errors
	 * @param index
	 * @returns
	 */
	const getErrorDetailsMessage = (
		errors: ErrorDetails[],
		index: number,
	): { status: UploadStatus; message: string } => {
		const errorDetails = errors.filter((error) => error.index === index);

		const status = errorDetails.length > 0 ? UploadStatus.ERROR : UploadStatus.PROCESSING;
		let message = '';

		if (errorDetails.length > 0) {
			const [firstError] = errorDetails;
			const { reason, fieldName, errors: errorMessages } = firstError;

			message = `${reason} - Field: ${fieldName}`;
			if (errorMessages?.length) {
				message += ` - Details: ${errorMessages[0].message.replace(/\.+$/, '')}`;
			}
			if (errorDetails.length > 1) {
				message += `. Found ${errorDetails.length - 1} more errors`;
			}
		}

		return { status, message };
	};

	/**
	 * Submit files for processing as part of a Submission
	 * If an Active Submission already exists it will be closed
	 * @param param0
	 * @returns
	 */
	const submitData = async ({ body }: { body: FormData }) => {
		const organization = body.get('organization')?.toString();
		if (!organization) throw new Error('Organization is required field');

		const activeSubmissionId = await getActiveSubmission(organization);

		if (activeSubmissionId) {
			// need to delete previous active Submission
			await handleRequest({
				url: urlJoin(
					NEXT_PUBLIC_ENVIRONMENTAL_SUBMISSION_API_URL,
					'submission',
					activeSubmissionId.toString(),
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
