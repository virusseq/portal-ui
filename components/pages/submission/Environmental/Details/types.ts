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

import { Dispatch, SetStateAction } from 'react';

import { UploadData } from '#global/hooks/useEnvironmentalData';

export type SubmissionDetailsProps = {
	ID: string;
	setTotalUploads?: Dispatch<SetStateAction<number>>;
};

/**
 * Represents the different types of events that can occur in a Submission process.
 * INSERT: Insert new records
 * UPDATE: Update existing records
 * DELETE: Delete records
 * These events are used to track the changes made to the data during the submission process.
 */
export const EventType = {
	INSERT: 'INSERT',
	UPDATE: 'UPDATE',
	DELETE: 'DELETE',
} as const;
export type EventType = keyof typeof EventType;

/**
 * Maps 'EventType' constants to their corresponding
 * lowercase, plural string keys used in response data.
 */
export const EventTypeToKey = {
	[EventType.INSERT]: 'inserts',
	[EventType.UPDATE]: 'updates',
	[EventType.DELETE]: 'deletes',
} as const;
export type EventTypeKey = (typeof EventTypeToKey)[keyof typeof EventTypeToKey];

/**
 * Represents the different statuses that a Submission can have.
 * - COMPLETE: The submission is complete and all records are processed successfully.
 *   New records have been inserted, existing records updated, or deleted records removed.
 * - INCOMPLETE: The submission is incomplete and some records are missing or not processed.
 *   e.g. Submission could have been closed by the user before all records were processed.
 * - ERROR: There was an error during the submission process. e.g. Schema validation failed.
 * - PROCESSING: The submission is currently being processed. e.g Schema validation is in progress and could take a while.
 */
export const UploadStatus = {
	COMPLETE: 'COMPLETE',
	INCOMPLETE: 'INCOMPLETE',
	ERROR: 'ERROR',
	PROCESSING: 'PROCESSING',
} as const;
export type UploadStatus = keyof typeof UploadStatus;

export type UploadsStatusDictionary = {
	COMPLETE: UploadData[];
	INCOMPLETE: UploadData[];
	ERROR: UploadData[];
	PROCESSING: UploadData[];
};

export const UploadDetailsAction = {
	NEW: 'NEW',
	UPDATE: 'UPDATE',
} as const;

export type UploadStatusAction =
	| {
			type: typeof UploadDetailsAction.NEW;
			uploads: UploadData[];
	  }
	| {
			type: typeof UploadDetailsAction.UPDATE;
			upload: UploadData;
	  };
