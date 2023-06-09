/*
 *
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
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

import { UploadDataType } from '../../../../global/hooks/useMuseData';

import { UploadsStatusDictionaryType, UploadStatusActionType } from './types';

export const uploadsStatusDictionary = {
	ERROR: [],
	PROCESSING: [],
	COMPLETE: [],
	QUEUED: [],
};

export const groupUploadsByStatus = (uploads: UploadDataType[]): UploadsStatusDictionaryType =>
	uploads.reduce(
		// start with a dictionary, end with an array
		(sortedUploads: UploadsStatusDictionaryType, upload: UploadDataType) => ({
			...sortedUploads,
			[upload.status]: sortedUploads[upload.status].concat(upload).sort(),
		}),
		uploadsStatusDictionary,
	);

export const uploadsStatusReducer = (
	state: UploadsStatusDictionaryType,
	action: UploadStatusActionType,
): UploadsStatusDictionaryType => {
	switch (action.type) {
		case 'initial details': {
			return groupUploadsByStatus(action.uploads);
		}

		case 'new details': {
			// remove the upload from its previous status group
			const newSubmissionDetails = Object.entries(state).reduce(
				(acc, [status, uploads]): UploadsStatusDictionaryType => ({
					...acc,
					[status]: uploads.filter(
						(upload) => action.upload.submitterSampleId !== upload.submitterSampleId,
					),
				}),
				state,
			);

			// replace it in its new status group
			return {
				...newSubmissionDetails,
				[action.upload.status]: newSubmissionDetails[action.upload.status]
					.concat(action.upload)
					.sort(),
			};
		}

		default: {
			return state;
		}
	}
};
