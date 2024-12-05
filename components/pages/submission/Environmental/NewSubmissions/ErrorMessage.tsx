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

import { ReactElement } from 'react';

import { ErrorTypes, InvalidFieldsType } from './types';

const ErrorMessage = ({
	type,
	values,
}: {
	type: ErrorTypes;
	values: Array<string | InvalidFieldsType>;
}): ReactElement => (
	<>
		{type === 'invalidFields' ? (
			Object.entries(
				// stupid typescript bug with reduce https://github.com/microsoft/TypeScript/issues/36390#issuecomment-641718624
				(values as InvalidFieldsType[]).reduce(
					(acc, { reason, value, index, fieldName }: InvalidFieldsType) => ({
						...acc,
						[reason]: {
							...acc[reason],
							...(reason === 'UNAUTHORIZED_FOR_STUDY_UPLOAD'
								? {
										[value]: (acc[reason]?.[value] || []).concat(index),
								  }
								: {
										[fieldName]: (acc[reason]?.[fieldName] || []).concat(index),
								  }),
						},
					}),
					{} as Record<string, Record<string, number[]>>,
				),
			).map(([reason, dataObj]) => (
				<li key={reason}>
					<p>
						{reason === 'EXPECTING_NUMBER_TYPE'
							? 'Expected a number but was given a string'
							: reason === 'NOT_ALLOWED_TO_BE_EMPTY'
							? 'Expected a value but was not given any'
							: reason === 'UNAUTHORIZED_FOR_STUDY_UPLOAD'
							? 'Study permissions are required for'
							: (console.log('Unhandled reason:', reason), 'Invalid fields')}
						:
					</p>
					{Object.entries(dataObj as Record<string, number[]>).map(
						([key, indexes]): ReactElement => (
							<span>{`${key}, in row${indexes.length > 1 ? 's' : ''} ${indexes.join(', ')}.`}</span>
						),
					)}
				</li>
			))
		) : (
			<li key={type}>
				<p>
					{type === 'fastaHeaderInFileMissingInTsv'
						? 'Missing samples in the TSV'
						: type === 'fastaHeaderInRecordMissingInFile'
						? 'Missing samples in the Fasta'
						: type === 'missingHeaders'
						? 'Missing headers in the TSV'
						: type === 'unknownHeaders'
						? 'Unrecognized headers in the TSV'
						: (console.log('Unhandled type:', type), 'Error')}
					:
				</p>
				<span>{`${values.join(', ')}.`}</span>
			</li>
		)}
	</>
);

export default ErrorMessage;
