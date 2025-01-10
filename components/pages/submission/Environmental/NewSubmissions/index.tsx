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

import { css, useTheme } from '@emotion/react';
import Router from 'next/router';
import { ReactElement, useEffect, useReducer, useState } from 'react';
import urlJoin from 'url-join';

import { ButtonElement as Button } from '@/components/Button';
import ErrorNotification from '@/components/ErrorNotification';
import StyledLink from '@/components/Link';
import { LoaderWrapper } from '@/components/Loader';
import defaultTheme from '@/components/theme';
import useAuthContext from '@/global/hooks/useAuthContext';
import useEnvironmentalData from '@/global/hooks/useEnvironmentalData';
import getInternalLink from '@/global/utils/getInternalLink';

import DropZone from './DropZone';
import ErrorMessage from './ErrorMessage';
import FileRow from './FileRow';
import { CreateSubmissionStatus, NoUploadError, ValidationAction } from './types';
import { getFileExtension, validationParameters, validationReducer } from './validationHelpers';

const noUploadError: NoUploadError = {
	status: '',
};

const NewSubmissions = (): ReactElement => {
	const { token, userHasWriteScopes, user } = useAuthContext();
	const theme: typeof defaultTheme = useTheme();
	const [thereAreFiles, setThereAreFiles] = useState(false);
	const [uploadError, setUploadError] = useState<NoUploadError>(noUploadError);
	const [validationState, validationDispatch] = useReducer(validationReducer, validationParameters);
	const { oneOrMoreCsv, readyToUpload } = validationState;

	const { awaitingResponse, submitData } = useEnvironmentalData('NewSubmissions');

	const handleSubmit = () => {
		const effectiveScopes = (user?.scope || [])
			.filter((scope) => scope.includes('WRITE'))
			.map((scope) => scope.replace('.WRITE', ''))
			.map((scope) => scope.toUpperCase());

		if (thereAreFiles && token && userHasWriteScopes) {
			const formData = new FormData();

			oneOrMoreCsv.forEach((csvFile) => {
				// Using the filename to determine the organization associated with the submission
				const organizationName = csvFile.name.split('.')[0].toUpperCase();

				// Verify if the user's session permissions allow them
				// to upload environmental data to this organization.
				if (effectiveScopes.length > 0 && !effectiveScopes.includes(organizationName)) {
					formData.append('organization', organizationName);
					// Submission service expects a file with the name of the schema it represents
					formData.append('files', csvFile, 'sample2.csv');
				} else {
					console.error(
						`User does not have permission to upload data for organization ${organizationName}`,
					);
				}
			});

			return submitData({ body: formData }).then((response) => {
				switch (response.status) {
					case CreateSubmissionStatus.PARTIAL_SUBMISSION:
					case CreateSubmissionStatus.INVALID_SUBMISSION: {
						setUploadError({
							batchErrors: response.batchErrors,
							description: response.description,
							status: 'Your submission has errors and cannot be processed.',
						});
						return Promise.resolve();
					}

					case CreateSubmissionStatus.PROCESSING: {
						response.submissionId
							? Router.push(
									getInternalLink({
										path: urlJoin('submission', 'environmental', response.submissionId.toString()),
									}),
							  )
							: console.log('Unhandled response:', response);
						return Promise.resolve();
					}

					default: {
						console.error(response);
						setUploadError({
							status: 'Internal server error',
							description: 'Your upload request has failed. Please try again later.',
						});
						return Promise.resolve();
					}
				}
			});
		}

		console.error(`no ${token ? 'token' : userHasWriteScopes ? 'scopes' : 'files'} to submit`);
	};

	useEffect(() => {
		setUploadError(noUploadError);
		setThereAreFiles(validationState.oneOrMoreCsv.length > 0);
	}, [validationState]);

	const handleClearAll = () => {
		setUploadError(noUploadError);
		validationDispatch({ type: 'clear all' });
	};

	const handleRemoveThis =
		({ name }: File) =>
		() => {
			setUploadError(noUploadError);
			validationDispatch({
				type: `remove ${getFileExtension(name)}`,
				file: name,
			} as ValidationAction);
		};

	return (
		<article
			css={css`
				flex-direction: column;

				h2 {
					${theme.typography.subheading};
				}

				ol {
					box-sizing: border-box;
					margin: 0 0 20px;
					padding-left: 15px;

					li {
						margin-bottom: 20px;
					}
				}
			`}
		>
			<h1 className="view-title">Start a New Submission</h1>

			<p>
				Waste water metadata is submitted as a <span className="code">.csv</span> file .The file
				name must match the Study name for the Submission. Multiple files are accepted.
			</p>

			<h2>To format your waste water sequence metadata:</h2>

			<ol>
				<li>
					Download the{' '}
					<StyledLink
						href="https://github.com/virusseq/metadata-schemas/blob/main/virusseq_metadata_template.tsv"
						rel="noopener noreferrer"
						target="_blank"
					>
						metadata CSV Template
					</StyledLink>{' '}
					.
				</li>
				<li>
					<StyledLink
						href="https://github.com/Public-Health-Bioinformatics/DataHarmonizer"
						rel="noopener noreferrer"
						target="_blank"
					>
						DataHarmonizer
					</StyledLink>{' '}
					is a tool that can be used to help validate the accepted values for each field in your
					metadata CSV locally before submitting. Download the tool and follow the instructions on
					the Github repository to pre-validate each field in your metadata before submission.
				</li>
				<li>
					If you are using Excel or Google sheets, make sure all characters are UTF-8 encoded.
				</li>
			</ol>

			<DropZone
				disabled={!userHasWriteScopes}
				validationState={validationState}
				validationDispatch={validationDispatch}
			/>

			{uploadError.description && (
				<ErrorNotification
					size="md"
					title={uploadError.status}
					styles={`
            align-items: center;
            box-sizing: border-box;
            flex-direction: column;
            justify-content: center;
            margin-top: 20px;
            max-width: 100%;
            width: 100%;
          `}
				>
					{uploadError.description}

					{uploadError?.batchErrors && (
						<ul
							css={css`
								margin: 10px 0 0;
								padding-left: 0;

								p {
									margin-bottom: 0.5rem;
								}

								li:first-of-type p {
									margin-top: 0;
								}

								span {
									display: block;
									font-size: 13px;
								}
							`}
						>
							{uploadError?.batchErrors.map(({ message, type }) => (
								<ErrorMessage type={type} values={message} />
							))}
						</ul>
					)}
				</ErrorNotification>
			)}

			<LoaderWrapper
				loading={awaitingResponse}
				message={
					<>
						Currently validating metadata files.
						<br />
						Do not navigate away from this browser window.
					</>
				}
			>
				<table
					css={css`
						border: 1px solid ${theme.colors.grey_4};
						border-collapse: collapse;
						border-spacing: 0;
						margin-top: 20px;
						width: 100%;

						caption {
							display: none;
						}

						.title {
							font-weight: bold;
						}

						.clearAll {
							font-size: 14px;
							padding-left: 0;
						}

						.emptyRow {
							font-size: 14px;
							text-align: center;
						}

						tbody {
							max-height: 100px;
						}

						tfoot {
							background: ${theme.colors.grey_2};
						}

						td {
							border-top: 1px solid ${theme.colors.grey_4};
							box-sizing: border-box;
							font-size: 14px;
							min-height: 40px;
							height: 40px;
							padding: 0 10px;

							&:last-of-type:not(:first-of-type) {
								text-align: right;
								width: 65px;
							}
						}
					`}
				>
					<caption>Files to upload</caption>

					<thead>
						<tr>
							<td className="title">Uploaded Files</td>
							<td className="clearAll">
								<StyledLink
									css={css`
										text-decoration: none;
									`}
									disabled={!thereAreFiles}
									onClick={handleClearAll}
								>
									Clear all
								</StyledLink>
							</td>
						</tr>
					</thead>

					<tbody>
						{thereAreFiles ? (
							<>
								{oneOrMoreCsv.map((csvFile: File) => (
									<FileRow
										active={true}
										file={csvFile}
										key={csvFile.name}
										handleRemove={handleRemoveThis(csvFile)}
									/>
								))}
							</>
						) : (
							<tr className="emptyRow">
								<td colSpan={2}>You have no files uploaded.</td>
							</tr>
						)}
					</tbody>

					<tfoot>
						<tr>
							<td colSpan={2}>
								<Button
									css={css`
										height: 34px;
										padding: 0 15px;
									`}
									disabled={!(readyToUpload && !uploadError.description)}
									onClick={handleSubmit}
								>
									Submit Data
								</Button>
								{thereAreFiles && !readyToUpload && (
									<p
										css={css`
											color: ${theme.colors.error_dark};
											display: inline;
											margin-left: 10px;
										`}
									>
										You must submit at least one CSV file.
									</p>
								)}
							</td>
						</tr>
					</tfoot>
				</table>
			</LoaderWrapper>
		</article>
	);
};

export default NewSubmissions;
