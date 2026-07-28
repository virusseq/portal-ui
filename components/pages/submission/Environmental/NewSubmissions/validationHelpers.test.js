/*
 *
 * Copyright (c) 2026 The Ontario Institute for Cancer Research. All rights reserved
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

const {
	buildFormData,
	getConfirmSubmissionMessage,
	getTarOnlyEligibility,
	validationParameters,
	validationReducer,
} = require('./validationHelpers');

// Plain objects used only where the reducer/eligibility logic inspects `.name` (no FormData involved)
const csvFile = { name: 'ORG.csv' };
const tarFile = { name: 'sample1.tar.xz' };

// Real File instances for buildFormData tests, since Node's FormData stringifies plain objects
const buildCsvFile = () => new File(['content'], 'ORG.csv');
const buildTarFile = () => {
	const file = new File(['content'], 'sample1.tar.xz');
	file.md5 = 'abc123';
	return file;
};

const activeSubmission = (organization, status = 'VALID') => ({ id: 1, organization, status });

describe('validationReducer - is ready', () => {
	it('is ready with exactly one CSV and no tar files', () => {
		const state = { oneCsv: [csvFile], oneOrMoreTar: [], readyToUpload: false };
		expect(validationReducer(state, { type: 'is ready' }).readyToUpload).toBe(true);
	});

	it('is ready with one CSV and one or more tar files', () => {
		const state = { oneCsv: [csvFile], oneOrMoreTar: [tarFile], readyToUpload: false };
		expect(validationReducer(state, { type: 'is ready' }).readyToUpload).toBe(true);
	});

	it('is ready with tar file(s) only and no CSV', () => {
		const state = { oneCsv: [], oneOrMoreTar: [tarFile], readyToUpload: false };
		expect(validationReducer(state, { type: 'is ready' }).readyToUpload).toBe(true);
	});

	it('is not ready with no files at all', () => {
		const state = { oneCsv: [], oneOrMoreTar: [], readyToUpload: false };
		expect(validationReducer(state, { type: 'is ready' }).readyToUpload).toBe(false);
	});

	it('resets to the initial state on clear all', () => {
		const state = { oneCsv: [csvFile], oneOrMoreTar: [tarFile], readyToUpload: true };
		expect(validationReducer(state, { type: 'clear all' })).toEqual(validationParameters);
	});
});

describe('getTarOnlyEligibility', () => {
	it('is false when there is no previous submission', () => {
		expect(getTarOnlyEligibility(undefined)).toBe(false);
	});

	it.each(['OPEN', 'VALIDATING', 'INVALID', 'CLOSED', 'COMMITTING', 'COMMITTED'])(
		'is false when the previous submission has status %s',
		(status) => {
			expect(getTarOnlyEligibility(activeSubmission('ORGA', status))).toBe(false);
		},
	);

	it('is true when the previous submission has status VALID', () => {
		expect(getTarOnlyEligibility(activeSubmission('ORGA', 'VALID'))).toBe(true);
	});
});

describe('getConfirmSubmissionMessage', () => {
	it('mentions the sequence file count (0) when there are no tar files', () => {
		const state = { oneCsv: [csvFile], oneOrMoreTar: [], readyToUpload: true };
		expect(getConfirmSubmissionMessage(state)).toBe(
			'Please confirm that your selection (1 .csv file and 0 sequence files) is ready for submission.',
		);
	});

	it('mentions both the CSV and tar file counts for a CSV + tar submission', () => {
		const state = { oneCsv: [csvFile], oneOrMoreTar: [tarFile, tarFile], readyToUpload: true };
		expect(getConfirmSubmissionMessage(state)).toBe(
			'Please confirm that your selection (1 .csv file and 2 sequence files) is ready for submission.',
		);
	});

	it('falls back to the generic message for tar-only files when there is no previous submission', () => {
		const state = { oneCsv: [], oneOrMoreTar: [tarFile], readyToUpload: true };
		expect(getConfirmSubmissionMessage(state)).toBe(
			'Please confirm that your selection (0 .csv files and 1 sequence file) is ready for submission.',
		);
	});

	it('falls back to the generic message for tar-only files when the previous submission is not VALID', () => {
		const state = { oneCsv: [], oneOrMoreTar: [tarFile], readyToUpload: true };
		const previousSubmission = activeSubmission('ORGA', 'OPEN');
		expect(getConfirmSubmissionMessage(state, previousSubmission)).toBe(
			'Please confirm that your selection (0 .csv files and 1 sequence file) is ready for submission.',
		);
	});

	it('mentions the active submission id when adding tar files to a VALID previous submission (no CSV)', () => {
		const state = { oneCsv: [], oneOrMoreTar: [tarFile], readyToUpload: true };
		const previousSubmission = activeSubmission('ORGA', 'VALID');
		expect(getConfirmSubmissionMessage(state, previousSubmission)).toBe(
			`Please confirm you want to add 1 sequence file to your active submission ID ${previousSubmission.id}.`,
		);
	});

	it('pluralizes the tar file count when adding more than one tar file to a VALID previous submission', () => {
		const state = { oneCsv: [], oneOrMoreTar: [tarFile, tarFile], readyToUpload: true };
		const previousSubmission = activeSubmission('ORGA', 'VALID');
		expect(getConfirmSubmissionMessage(state, previousSubmission)).toBe(
			`Please confirm you want to add 2 sequence files to your active submission ID ${previousSubmission.id}.`,
		);
	});
});

describe('buildFormData', () => {
	it('includes the CSV file when one is provided', () => {
		const csvFile = buildCsvFile();
		const formData = buildFormData('ORG', csvFile, []);
		expect(formData.get('submissionFile')).toBe(csvFile);
		expect(formData.get('organization')).toBe('ORG');
		expect(formData.has('sequencingMetadata')).toBe(false);
	});

	it('omits the CSV field entirely for a tar-only (CSV-less) submission', () => {
		const tarFileWithMd5 = buildTarFile();
		const formData = buildFormData('ORG', undefined, [tarFileWithMd5]);
		expect(formData.has('submissionFile')).toBe(false);
		expect(formData.get('organization')).toBe('ORG');

		const sequencingMetadata = JSON.parse(formData.get('sequencingMetadata'));
		expect(sequencingMetadata).toEqual([
			{
				fileName: tarFileWithMd5.name,
				fileSize: tarFileWithMd5.size,
				fileMd5sum: tarFileWithMd5.md5,
				fileAccess: 'open',
				fileType: 'TAR',
			},
		]);
	});

	it('appends sequencingMetadata for tar files alongside a CSV', () => {
		const csvFile = buildCsvFile();
		const tarFileWithMd5 = buildTarFile();
		const formData = buildFormData('ORG', csvFile, [tarFileWithMd5]);
		expect(formData.get('submissionFile')).toBe(csvFile);
		expect(formData.has('sequencingMetadata')).toBe(true);
	});
});
