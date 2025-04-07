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

import { ButtonElement as Button } from '#components/Button';
import ErrorNotification from '#components/ErrorNotification';
import StyledLink from '#components/Link';
import { LoaderWrapper } from '#components/Loader';
import defaultTheme from '#components/theme';
import useAuthContext from '#global/hooks/useAuthContext';
import useMuseData from '#global/hooks/useMuseData';
import getInternalLink from '#global/utils/getInternalLink';

import DropZone from './DropZone';
import ErrorMessage from './ErrorMessage';
import FileRow from './FileRow';
import { NoUploadErrorType, ValidationActionType } from './types';
import { getFileExtension, validationParameters, validationReducer } from './validationHelpers';

const noUploadError = {} as NoUploadErrorType;

const NewSubmissions = (): ReactElement => {
	const { token, userHasClinicalAccess } = useAuthContext();
	const theme: typeof defaultTheme = useTheme();
	const [thereAreFiles, setThereAreFiles] = useState(false);
	const [uploadError, setUploadError] = useState(noUploadError);
	const [validationState, validationDispatch] = useReducer(validationReducer, validationParameters);
	const { oneTSV, oneOrMoreFasta, readyToUpload } = validationState;

	const { awaitingResponse, fetchMuseData } = useMuseData('NewSubmissions');

	const handleSubmit = () => {
		if (thereAreFiles && token && userHasClinicalAccess) {
			const formData = new FormData();

			// if many TSV are available, submit only the first one along with all fastas
			const selectedTSV = oneTSV.slice(-1)[0];
			formData.append('files', selectedTSV, selectedTSV.name);
			oneOrMoreFasta.forEach((fasta) => formData.append('files', fasta, fasta.name));

			return fetchMuseData('submissions', { body: formData, method: 'POST' }).then((response) => {
				switch (response.status) {
					case 'BAD_REQUEST': {
						setUploadError({
							...response,
							status: 'Your submission has errors and cannot be processed.',
						});
						return Promise.resolve();
					}

					case 'INTERNAL_SERVER_ERROR': {
						console.error(response);
						setUploadError({
							status: 'Internal server error',
							message: 'Your upload request has failed. Please try again later.',
						});
						return Promise.resolve();
					}

					default: {
						response.submissionId
							? Router.push(
									getInternalLink({
										path: urlJoin('submission', 'clinical', response.submissionId),
									}),
							  )
							: console.log('Unhandled response:', response);
						return Promise.resolve();
					}
				}
			});
		}

		console.error(`no ${token ? 'token' : userHasClinicalAccess ? 'scopes' : 'files'} to submit`);
	};

	useEffect(() => {
		setUploadError(noUploadError);
		setThereAreFiles(
			validationState.oneTSV.length > 0 || validationState.oneOrMoreFasta.length > 0,
		);
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
			} as ValidationActionType);
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
				Virus metadata is submitted as a <span className="code">.tsv</span> file. Viral genome data
				must be submitted as a <span className="code">.fasta</span> file. Up to 5000 samples can be
				submitted in a single submission, but note that the larger the file the longer the
				submission will take. FASTA files are accepted individually, or as a single concatenated
				FASTA containing all samples in one file.
			</p>

			<h2>To format your viral sequence metadata:</h2>

			<ol>
				<li>
					Download the{' '}
					<StyledLink
						href="https://github.com/virusseq/metadata-schemas/blob/main/virusseq_metadata_template.tsv"
						rel="noopener noreferrer"
						target="_blank"
					>
						metadata TSV Template
					</StyledLink>{' '}
					for the viral sequence metadata and populate it with accepted values for each field. A
					reference of the accepted values can be found{' '}
					<StyledLink
						href="https://github.com/Public-Health-Bioinformatics/DataHarmonizer/blob/master/template/canada_covid19/SOP.pdf"
						rel="noopener noreferrer"
						target="_blank"
					>
						in this resource
					</StyledLink>
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
					metadata TSV locally before submitting. Download the tool and follow the instructions on
					the Github repository to pre-validate each field in your metadata before submission.
				</li>
				<li>
					If you are using Excel or Google sheets, make sure all characters are UTF-8 encoded.
				</li>
			</ol>

			<h2>To format your viral sequence files:</h2>

			<ol>
				<li>
					Make sure they have the file extension <span className="code">.fasta</span>,{' '}
					<span className="code">.fa</span>, or zipped fastas in <span className="code">.gz</span>{' '}
					format.
				</li>
				<li>
					Each sequence must be preceded be a description line, beginning with a &gt;. The
					description line should include &gt;hCoV-19/<span className="code">country</span>/
					<span className="code">identifier</span>/<span className="code">year</span> sequenced.
					This identifier must match exactly the "fasta header name" column in the TSV file.
				</li>
			</ol>

			<DropZone
				disabled={!userHasClinicalAccess}
				validationState={validationState}
				validationDispatch={validationDispatch}
			/>

			{uploadError.message && (
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
					{uploadError.message !== 'Found records with invalid fields' && uploadError.message}

					{uploadError?.errorInfo && (
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
							{Object.entries(uploadError?.errorInfo).map(
								([type = '', values = []]) =>
									values.length > 0 && <ErrorMessage type={type} values={values} />,
							)}
						</ul>
					)}
				</ErrorNotification>
			)}

			<LoaderWrapper
				loading={awaitingResponse}
				message={
					<>
						Currently validating metadata and sequencing files.
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
								{oneTSV.map((tsv, index) => (
									// when more than one, all but the last one will get crossed out on render
									<FileRow
										active={index === oneTSV.length - 1}
										file={tsv}
										key={tsv.name}
										handleRemove={handleRemoveThis(tsv)}
									/>
								))}
								{oneOrMoreFasta.map((fasta: File) => (
									<FileRow
										active={true}
										file={fasta}
										key={fasta.name}
										handleRemove={handleRemoveThis(fasta)}
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
									disabled={!(readyToUpload && !uploadError.message)}
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
										You must submit only one metadata TSV file and at least one FASTA file.
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
