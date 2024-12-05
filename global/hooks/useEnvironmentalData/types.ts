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

export type SubmissionDataType = {
	createdAt: string;
	originalFileNames: string[];
	submissionId: string;
	totalRecords: number;
};

export type UploadDataType = {
	systemId: string | null;
	error: string | null;
	originalFilePair: string[];
	status: 'COMPLETE' | 'ERROR' | 'PROCESSING' | 'QUEUED';
	organization: string;
	submissionId: string;
	submitterSampleId: string;
};

export type DataRecordValue =
	| string
	| string[]
	| number
	| number[]
	| boolean
	| boolean[]
	| undefined;
export type DataRecord = Record<string, DataRecordValue>;
export type SubmissionInsertData = {
	batchName: string;
	records: DataRecord[];
};

export type SubmissionUpdateData = {
	systemId: string;
	old: DataRecord;
	new: DataRecord;
};

export type SubmissionDeleteData = {
	systemId: string;
	data: DataRecord;
	entityName: string;
	isValid: boolean;
	organization: string;
};

export type FieldRestrictionRule = {
	type: string;
	rule: unknown;
};

export type FieldValidationErrorRestrictions = {
	message: string;
	restriction: FieldRestrictionRule;
};

export type ErrorDetails = {
	index: number;
	reason: string;
	fieldName: string;
	fieldValue?: string;
	errors?: FieldValidationErrorRestrictions[];
};

export type SchemaErrors = Record<string, ErrorDetails[]>;

export type SubmissionType = {
	id: number;
	data: {
		inserts: Record<string, SubmissionInsertData>;
		updates: Record<string, SubmissionUpdateData>;
		deletes: Record<string, SubmissionDeleteData>;
	};
	dictionary: {
		name: string;
		version: string;
	};
	dictionaryCategory: {
		id: number;
		name: string;
	};
	errors: Record<string, SchemaErrors>;
	organization: string;
	status: 'INVALID' | 'VALID';
	createdAt: string;
	createdBy: string;
	updatedAt: string;
	updatedBy: string;
};
