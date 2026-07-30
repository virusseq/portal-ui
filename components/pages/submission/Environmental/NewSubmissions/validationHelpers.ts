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

import { Dispatch } from 'react';

import type { SubmissionSummary } from '#global/hooks/useEnvironmentalData';
import type { SubmissionManifest } from '#global/utils/fileManifest';

import {
	acceptedFileExtensions,
	type BatchError,
	ValidationAction,
	ValidationParameters,
	type SubmissionFile,
} from './types';

export const validationParameters = {
	oneCsv: [],
	oneOrMoreTar: [],
	readyToUpload: false, // true when: exactly one CSV is present, or zero CSV + at least one tar.xz is present
};

// Constants for submit parms
export const SubmitParams = {
	ORGANIZATION: 'organization' as const,
	ENTITY_NAME: 'entityName' as const,
	SUBMISSION_FILE: 'submissionFile' as const,
	SEQUENCING_METADATA: 'sequencingMetadata' as const,
};

// Constants for file metadata
export const SequencingMetadataDefaults = {
	FILE_ACCESS: 'open' as const,
	FILE_TYPE: 'TAR' as const,
};

export const buildFormData = (
	organizationName: string,
	selectedCsv: SubmissionFile | undefined,
	oneOrMoreTar: SubmissionFile[],
) => {
	const formData = new FormData();
	formData.append(SubmitParams.ORGANIZATION, organizationName);
	formData.append(SubmitParams.ENTITY_NAME, 'sample');

	if (selectedCsv) {
		formData.append(SubmitParams.SUBMISSION_FILE, selectedCsv);
	}

	if (oneOrMoreTar.length > 0) {
		formData.append(
			SubmitParams.SEQUENCING_METADATA,
			JSON.stringify(
				oneOrMoreTar.map((tarFile: SubmissionFile) => ({
					fileName: tarFile.name,
					fileSize: tarFile.size,
					fileMd5sum: tarFile.md5,
					fileAccess: SequencingMetadataDefaults.FILE_ACCESS,
					fileType: SequencingMetadataDefaults.FILE_TYPE,
				})),
			),
		);
	}
	return formData;
};

const overwriteIfExists = (existingFiles: SubmissionFile[], file: SubmissionFile) =>
	existingFiles.filter((old) => old.name !== file.name).concat(file);

export const isSubmissionReadyForUpload = ({
	oneCsv,
	oneOrMoreTar,
	isTarOnlySubmissionEligible,
}: {
	oneCsv: SubmissionFile[];
	oneOrMoreTar: SubmissionFile[];
	isTarOnlySubmissionEligible: boolean;
}): boolean => oneCsv.length === 1 || (oneOrMoreTar.length > 0 && isTarOnlySubmissionEligible);

export const validationReducer = (state: ValidationParameters, action: ValidationAction): ValidationParameters => {
	switch (action.type) {
		case 'add csv': {
			const oneCsv = [action.file];
			return {
				...state,
				oneCsv,
				readyToUpload: false,
			};
		}

		case 'remove csv': {
			const oneCsv = state.oneCsv.filter((tarFile: SubmissionFile) => tarFile.name !== action.file);
			return {
				...state,
				oneCsv,
				readyToUpload: false,
			};
		}

		case 'add tar.xz': {
			const oneOrMoreTar = overwriteIfExists(state.oneOrMoreTar, action.file);
			return {
				...state,
				oneOrMoreTar,
				readyToUpload: false,
			};
		}

		case 'remove tar.xz': {
			const oneOrMoreTar = state.oneOrMoreTar.filter((tarFile: SubmissionFile) => tarFile.name !== action.file);
			return {
				...state,
				oneOrMoreTar,
				readyToUpload: false,
			};
		}

		case 'is ready': {
			return {
				...state,
				readyToUpload: state.oneCsv.length === 1 || state.oneOrMoreTar.length > 0,
			};
		}

		case 'clear all':
			return validationParameters;

		default:
			console.log('dispatched nothing', action);
			return state;
	}
};

export const getFileExtension = (file: SubmissionFile | string = ''): string => {
	const parsedFileName = (typeof file === 'string' ? file : file.name).toLowerCase().split('.');

	// get the compound extension (e.g., tar.xz) or a single part extension (e.g., csv)
	return parsedFileName
		.slice(
			-(parsedFileName?.[parsedFileName.length - 1] === acceptedFileExtensions.TAR_XZ.split('.').pop() ? 2 : 1),
		)
		.join('.');
};

// Returns true if any files are present
export const hasFiles = ({ oneCsv, oneOrMoreTar }: ValidationParameters): boolean =>
	oneCsv.length > 0 || oneOrMoreTar.length > 0;

// Returns true if csv-less submisison is eligible
export const isTarOnlySubmissionEligible = (previousSubmission: SubmissionSummary | undefined): boolean => {
	return !!(previousSubmission && previousSubmission.status === 'VALID');
};

// Returns true if a CSV is required and is missing.
// Checks the previousSubmission to see if the submission is eligible for a tar-only submission.
// If it is, then a CSV is not required.
export const isCsvRequiredButMissing = ({
	oneCsv,
	isTarOnlySubmissionEligible,
}: {
	oneCsv: SubmissionFile[];
	isTarOnlySubmissionEligible: boolean;
}): boolean => !isTarOnlySubmissionEligible && oneCsv.length !== 1;

// Returns true if there are submission blocking issues
export const hasSubmissionBlockingIssues = ({
	uploadError,
	filesSubmissionInstructions,
	isCsvRequiredButMissing,
}: {
	uploadError: BatchError[];
	filesSubmissionInstructions: SubmissionManifest[];
	isCsvRequiredButMissing: boolean;
}) => {
	return uploadError.length > 0 || filesSubmissionInstructions.length > 0 || isCsvRequiredButMissing;
};

// This function returns true when the "Submit" button should be enabled.
// It makes sure the button is enabled only when the submission is ready to upload.
export const shouldEnableSubmitButton = ({
	isSubmissionReadyForUpload,
	hasSubmissionBlockingIssues,
}: {
	isSubmissionReadyForUpload: boolean;
	hasSubmissionBlockingIssues: boolean;
}): boolean => {
	return isSubmissionReadyForUpload && !hasSubmissionBlockingIssues;
};

const pluralize = (count: number, noun: string): string => `${count} ${noun}${count === 1 ? '' : 's'}`;

/**
 * Builds the confirmation message shown before submitting, naming how many files of each
 * type are about to be submitted so the user can double-check their selection.
 */
export const getConfirmSubmissionMessage = (
	{ oneCsv, oneOrMoreTar }: ValidationParameters,
	previousSubmission?: SubmissionSummary,
): string => {
	if (oneCsv.length === 0 && oneOrMoreTar.length > 0 && previousSubmission?.status === 'VALID') {
		return `Please confirm you want to add ${pluralize(
			oneOrMoreTar.length,
			'sequence file',
		)} to your active submission ID ${previousSubmission.id} for study ${previousSubmission.organization}.`;
	}

	return `Please confirm that your selection (${pluralize(oneCsv.length, '.csv file')} and ${pluralize(
		oneOrMoreTar.length,
		'sequence file',
	)}) is ready for submission${oneCsv[0] ? ` for study ${oneCsv[0].name.split('.')[0].toUpperCase()}` : ''}.`;
};

export const validator =
	(state: ValidationParameters, dispatch: Dispatch<ValidationAction>) =>
	(file: SubmissionFile): void => {
		switch (getFileExtension(file)) {
			case acceptedFileExtensions.CSV: {
				return dispatch({
					type: `add ${acceptedFileExtensions.CSV}`,
					file: file,
				});
			}

			case acceptedFileExtensions.TAR_XZ: {
				return dispatch({
					type: `add ${acceptedFileExtensions.TAR_XZ}`,
					file: file,
				});
			}

			default: {
				return console.log(`We do not accept this type of file: ${file.name}`);
			}
		}
	};

export * as validationTypes from './types';
