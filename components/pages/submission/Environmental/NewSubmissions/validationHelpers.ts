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

import { acceptedFileExtensions, ValidationAction, ValidationParameters } from './types';

export const validationParameters = {
	oneOrMoreCsv: [],
	oneOrMoreTar: [],
	readyToUpload: false, // there's at least one CSV
};

const overwiteIfExists = (existingFiles: File[], file: File) =>
	existingFiles.filter((old) => old.name !== file.name).concat(file);

export const validationReducer = (
	state: ValidationParameters,
	action: ValidationAction,
): ValidationParameters => {
	switch (action.type) {
		case `add ${acceptedFileExtensions.CSV}`: {
			const oneOrMoreCsv = [action.file];
			return {
				...state,
				oneOrMoreCsv,
				readyToUpload: oneOrMoreCsv.length >= 1,
			};
		}

		case `remove ${acceptedFileExtensions.CSV}`: {
			const oneOrMoreCsv = state.oneOrMoreCsv.filter(
				(tarFile: File) => tarFile.name !== action.file,
			);
			return {
				...state,
				oneOrMoreCsv,
				readyToUpload: oneOrMoreCsv.length >= 1,
			};
		}

		case `add ${acceptedFileExtensions.TAR_XZ}`: {
			const oneOrMoreTar = overwiteIfExists(state.oneOrMoreTar, action.file);
			return {
				...state,
				oneOrMoreTar,
				readyToUpload: state.oneOrMoreCsv.length >= 1 && oneOrMoreTar.length >= 0,
			};
		}

		case `remove ${acceptedFileExtensions.TAR_XZ}`: {
			const oneOrMoreTar = state.oneOrMoreTar.filter(
				(tarFile: File) => tarFile.name !== action.file,
			);
			return {
				...state,
				oneOrMoreTar,
				readyToUpload: state.oneOrMoreCsv.length === 1 && oneOrMoreTar.length >= 0,
			};
		}

		case 'clear all':
			return validationParameters;

		default:
			console.log('dispatched nothing', action);
			return state;
	}
};

export const getFileExtension = (file: File | string = ''): string => {
	const parsedFileName = (typeof file === 'string' ? file : file.name).toLowerCase().split('.');

	// get the compound extension (e.g., tar.xz) or a single part extension (e.g., csv)
	return parsedFileName
		.slice(
			-(parsedFileName?.[parsedFileName.length - 1] ===
			acceptedFileExtensions.TAR_XZ.split('.').pop()
				? 2
				: 1),
		)
		.join('.');
};

export const minFiles = ({ oneOrMoreCsv }: ValidationParameters): boolean => !!oneOrMoreCsv;

export const validator =
	(state: ValidationParameters, dispatch: Dispatch<ValidationAction>) =>
	(file: File): void => {
		switch (getFileExtension(file)) {
			case acceptedFileExtensions.CSV: {
				return dispatch({
					type: `add ${acceptedFileExtensions.CSV}`,
					file: file,
				});
			}

			case acceptedFileExtensions.FASTAQ:
			case acceptedFileExtensions.TAR:
			case acceptedFileExtensions.TAR_XZ: {
				return dispatch({
					type: `add ${acceptedFileExtensions.FASTAQ}`,
					file: file,
				});
			}

			default: {
				return console.log(`We do not accept this type of file: ${file.name}`);
			}
		}
	};

export * as validationTypes from './types';
