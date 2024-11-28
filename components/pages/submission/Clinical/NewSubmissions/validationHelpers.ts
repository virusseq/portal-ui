/*
 *
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
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

import { ReaderCallbackType, ValidationActionType, ValidationParametersType } from './types';

export const validationParameters = {
	oneTSV: [], // will use only the first one, but display any added
	oneOrMoreFasta: [],
	readyToUpload: false, // there's at least one TSV and one fasta
};

const overwiteIfExists = (existingFiles: File[], file: File) =>
	existingFiles.filter((old) => old.name !== file.name).concat(file);

export const validationReducer = (
	state: ValidationParametersType,
	action: ValidationActionType,
): ValidationParametersType => {
	switch (action.type) {
		case 'add tsv': {
			const oneTSV = overwiteIfExists(state.oneTSV, action.file);
			return {
				...state,
				oneTSV,
				readyToUpload: oneTSV.length === 1 && state.oneOrMoreFasta.length > 0,
			};
		}

		case 'remove tsv': {
			const oneTSV = state.oneTSV.filter((tsv: File) => tsv.name !== action.file);
			return {
				...state,
				oneTSV,
				readyToUpload: oneTSV.length === 1 && state.oneOrMoreFasta.length > 0,
			};
		}

		case 'add fasta': {
			const oneOrMoreFasta = overwiteIfExists(state.oneOrMoreFasta, action.file);
			return {
				...state,
				oneOrMoreFasta,
				readyToUpload: state.oneTSV.length === 1 && oneOrMoreFasta.length > 0,
			};
		}

		case 'remove fasta': {
			const oneOrMoreFasta = state.oneOrMoreFasta.filter(
				(fasta: File) => fasta.name !== action.file,
			);
			return {
				...state,
				oneOrMoreFasta,
				readyToUpload: state.oneTSV.length === 1 && oneOrMoreFasta.length > 0,
			};
		}

		case 'clear all':
			return validationParameters;

		default:
			console.log('dispatched nothing', action);
			return state;
	}
};

const readFile = (file: File, callback: ReaderCallbackType) => {
	const reader = new FileReader();
	reader.onabort = () => console.log('file reading was aborted');
	reader.onerror = () => console.log('file reading has failed');
	reader.onload = () => {
		callback(reader.result);
	};
	reader.readAsText(file);
};

export const getFileExtension = (file: File | string = ''): string => {
	const parsedFileName = (typeof file === 'string' ? file : file.name).toLowerCase().split('.');

	const extension = parsedFileName
		.slice(-(parsedFileName?.[parsedFileName.length - 1] === 'gz' ? 2 : 1))
		.join('.');

	return extension.includes('fa') || extension.includes('fasta') ? 'fasta' : extension;
};

export const minFiles = ({ oneTSV, oneOrMoreFasta }: ValidationParametersType): boolean =>
	!!oneTSV && oneOrMoreFasta.length > 0;

export const validator =
	(state: ValidationParametersType, dispatch: Dispatch<ValidationActionType>) =>
	(file: File): void => {
		// TODO: create dev mode
		// console.log('validating file', file)
		// readFile(file, data => console.log(data));

		switch (getFileExtension(file)) {
			case 'tsv': {
				return dispatch({
					type: 'add tsv',
					file: file,
				});
			}

			case 'fasta': {
				return dispatch({
					type: 'add fasta',
					file: file,
				});
			}

			default: {
				return console.log(`We do not accept this type of file: ${file.name}`);
			}
		}
	};

export * as validationTypes from './types';
