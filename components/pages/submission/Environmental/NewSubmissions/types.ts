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

export type ErrorTypes =
	| 'invalidFields'
	| 'missingHeaders'
	| 'fastaHeaderInFileMissingInTsv'
	| 'fastaHeaderInRecordMissingInFile'
	| 'unknownHeaders'
	| string; // in case new error types are added, the app won't just crash

export type InvalidFieldsType = {
	fieldName: string;
	index: number;
	reason: 'EXPECTING_NUMBER_TYPE' | 'NOT_ALLOWED_TO_BE_EMPTY' | 'UNAUTHORIZED_FOR_STUDY_UPLOAD';
	value: string;
};

export type NoUploadErrorType = {
	errorInfo?: {
		invalidFields?: InvalidFieldsType[];
		missingHeaders?: string[];
		sampleIdInFileMissingInTsv?: string[];
		sampleIdInRecordMissingInFile?: string[];
		unknownHeaders?: string[];
	};
	message?: string;
	status?: string;
};

export type ReaderCallbackType = (result: string | ArrayBuffer | null) => void;

export type ValidationActionType =
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

export type ValidationParametersType = {
	oneOrMoreCsv: File[];
	readyToUpload: boolean;
};
