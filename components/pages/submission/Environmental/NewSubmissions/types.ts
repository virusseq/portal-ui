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

/**
 * Enum used in the Reponse on Create new Submissions
 */
export const CreateSubmissionStatus = {
	PROCESSING: 'PROCESSING',
	INVALID_SUBMISSION: 'INVALID_SUBMISSION',
	PARTIAL_SUBMISSION: 'PARTIAL_SUBMISSION',
} as const;
export type CreateSubmissionStatus = keyof typeof CreateSubmissionStatus;

/**
 * BatchErrors returned from the submission service
 */
export const BatchErrorType = {
	FILE_READ_ERROR: 'FILE_READ_ERROR',
	INVALID_FILE_EXTENSION: 'INVALID_FILE_EXTENSION',
	INVALID_FILE_NAME: 'INVALID_FILE_NAME',
	MULTIPLE_TYPED_FILES: 'MULTIPLE_TYPED_FILES',
	UNRECOGNIZED_HEADER: 'UNRECOGNIZED_HEADER',
	MISSING_REQUIRED_HEADER: 'MISSING_REQUIRED_HEADER',
	INCORRECT_SECTION: 'INCORRECT_SECTION',
} as const;
export type BatchErrorType = keyof typeof BatchErrorType;

export type BatchError = {
	batchName: string;
	message: string;
	type: BatchErrorType;
};

/**
 * Error Response from the submission service
 */
export type NoUploadError = {
	batchErrors?: BatchError[];
	description?: string;
	status: string;
};

export type CreateSubmissionResult = {
	submissionId?: number;
	status: CreateSubmissionStatus;
	description: string;
	inProcessEntities: string[];
	batchErrors: BatchError[];
};

export type ValidationAction =
	| {
			type: 'add csv';
			file: File;
	  }
	| {
			type: 'remove csv';
			file: string;
	  }
	| {
			type: 'clear all' | 'is ready' | 'not ready';
	  };

export type ValidationParameters = {
	oneOrMoreCsv: File[];
	readyToUpload: boolean;
};
