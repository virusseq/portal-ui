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

import { Dispatch, ReactElement, useCallback } from 'react';
import { css, useTheme } from '@emotion/react';
import { useDropzone } from 'react-dropzone';

import { ButtonElement as Button } from '../../../Button';
import defaultTheme from '../../../theme';
import DragAndDrop from '../../../theme/icons/DragAndDrop';

import { validator } from './validationHelpers';
import { ValidationActionType, ValidationParametersType } from './types';

const DropZone = ({
	disabled,
	validationState,
	validationDispatch,
}: {
	disabled: boolean;
	validationState: ValidationParametersType;
	validationDispatch: Dispatch<ValidationActionType>;
}): ReactElement => {
	const theme: typeof defaultTheme = useTheme();

	const {
		getRootProps,
		getInputProps,
		// isDragAccept,
		isDragActive,
		// isFileTooLarge,
	} = useDropzone({
		accept: '.fa,.gz,.fasta,.tsv,text/tab-separated-values',
		disabled,
		onDrop: useCallback(
			(acceptedFiles: File[]) =>
				acceptedFiles.forEach(validator(validationState, validationDispatch)),
			[validationDispatch, validationState],
		),
	});

	const { onClick: fileUploadClick, ...rootProps } = getRootProps();

	return (
		<figure
			css={css`
				align-items: center;
				border: 1px dashed ${theme.colors.grey_6};
				display: flex;
				justify-content: center;
				margin: 30px 0 0;
				padding: 10px;
				position: relative;

				${isDragActive &&
				css`
					background: rgba(${theme.colors.accent_light_rgb}, 0.3);

					span span {
						/* font-weight: 700; */
					}
				`}

				${disabled &&
				css`
					/* background: ${theme.colors.grey_1}; */
					border-color: ${theme.colors.grey_4};
					color: ${theme.colors.grey_3};

					svg {
						opacity: 0.3;
					}
				`}

        &:focus {
					outline: none;
				}

				> span {
					font-weight: 600;
					margin: 0 10px 0 7px;
				}
			`}
			{...rootProps}
		>
			<input {...getInputProps()} />
			<DragAndDrop />
			<span>
				Drag and <span>drop file(s)</span> here or
			</span>
			<Button
				css={css`
					height: 34px;
					margin: 20px 0;
				`}
				disabled={disabled || isDragActive}
				onClick={fileUploadClick}
			>
				Upload Files
			</Button>
		</figure>
	);
};

export default DropZone;
