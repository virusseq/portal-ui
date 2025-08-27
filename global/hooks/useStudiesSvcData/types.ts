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

export type Study = {
	name: string;
	studyId: string;
	organization: string;
	description: string;
	sampleType: string;
	submitters: string[];
};

export type CreateStudyReq = {
	studyId: string;
	organization: string;
	name: string;
	description: string;
	sampleType: string;
};

export type AddSubmitterReq = {
	studyId: string;
	sampleType: string;
	submitters: string[];
};

export type RemoveSubmitterReq = {
	sampleType: string;
	studyId: string;
	submitter: string;
};

export type StudiesSvcResError = {
	type: ErrorType;
	studyId: string;
	submitters: string[];
};

export type StudiesSvcRes<T> = {
	success: boolean;
	// data is condition on success, if success is true data will exist with type T
	data?: T;
	// error is condition of success, if success is false error will exist with error.type
	error?: StudiesSvcResError;
};

// Error types returned by studies svc
export enum ErrorType {
	UNKNOWN = 'UNKNOWN',
	STUDY_NOT_FOUND = 'STUDY_NOT_FOUND',
	SUBMITTERS_NOT_FOUND = 'SUBMITTERS_NOT_FOUND',
	STUDY_ALREADY_EXISTS = 'STUDY_ALREADY_EXISTS',
	SUBMITTERS_ALREADY_IN_STUDY = 'SUBMITTER_ALREADY_IN_STUDY',
	SUBMITTER_NOT_IN_STUDY = 'SUBMITTER_NOT_IN_STUDY',
	FAILED_TO_CREATE_STUDY = 'FAILED_TO_CREATE_STUDY',
	FAILED_TO_REMOVE_SUBMITTER_FROM_STUDY = 'FAILED_TO_REMOVE_SUBMITTER_FROM_STUDY',
	FAILED_TO_ADD_SUBMITTERS_TO_STUDY = 'FAILED_TO_ADD_SUBMITTERS_TO_STUDY',
}
