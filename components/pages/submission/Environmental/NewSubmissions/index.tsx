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

import { css, useTheme } from '@emotion/react';
import Router from 'next/router';
import { ReactElement, useEffect, useReducer, useRef, useState } from 'react';
import urlJoin from 'url-join';

import { ButtonElement as Button } from '#components/Button';
import ErrorNotification from '#components/ErrorNotification';
import StyledLink from '#components/Link';
import { LoaderWrapper } from '#components/Loader';
import useAuthContext from '#global/hooks/useAuthContext';
import useEnvironmentalData, { type SubmissionSummary } from '#global/hooks/useEnvironmentalData';
import type { SubmissionManifest } from '#global/utils/fileManifest';
import getInternalLink from '#global/utils/getInternalLink';
import ConfirmSubmissionModal from '#components/pages/submission/ConfirmSubmissionModal';

import DropZone from './DropZone';
import ErrorMessage from './ErrorMessage';
import FileRow from './FileRow';
import FileUploadInstructionsModal from './FileUploadInstructionsModal';
import { CreateSubmissionStatus, ValidationAction, type BatchError, type SubmissionFile } from './types';
import {
	buildFormData,
	getConfirmSubmissionMessage,
	isCsvRequiredButMissing,
	getFileExtension,
	isSubmissionReadyForUpload,
	isTarOnlySubmissionEligible,
	hasSubmissionBlockingIssues,
	hasFiles,
	shouldEnableSubmitButton,
	validationParameters,
	validationReducer,
} from './validationHelpers';

const SUBMISSION_ERROR_MESSAGE_RULES = [
	{
		pattern: /The studyId '%s' does not exist/,
		getMessage: (organizationName: string) => `Study ID "${organizationName}" does not exist in the system.`,
	},
] as const;

const mapBatchErrorMessage = (rawMessage: string, organizationName: string) => {
	const matchedRule = SUBMISSION_ERROR_MESSAGE_RULES.find((rule) => rule.pattern.test(rawMessage));
	return matchedRule ? matchedRule.getMessage(organizationName) : rawMessage;
};

const NewSubmissions = (): ReactElement => {
	const { token, user, userHasEnvironmentalAccess, userIsEnvironmentalAdmin, userEnvironmentalWriteScopes } =
		useAuthContext();
	const theme = useTheme();
	const [confirmSubmissionModalOpen, setConfirmSubmissionModalOpen] = useState(false);
	const [filesSubmissionInstructions, setFilesSubmissionInstructions] = useState<SubmissionManifest[]>([]);
	const [submissionId, setSubmissionId] = useState<string>('');
	const [uploadError, setUploadError] = useState<BatchError[]>([]);
	const [validationState, validationDispatch] = useReducer(validationReducer, validationParameters);
	const { oneCsv, oneOrMoreTar } = validationState;
	const thereAreFiles = hasFiles(validationState);
	const [openGuideModal, setOpenGuideModal] = useState(false);
	const [previousSubmission, setPreviousSubmission] = useState<SubmissionSummary | undefined>(undefined);

	const { awaitingResponse, submitData, downloadMetadataTemplateUrl, fetchPreviousSubmissions } =
		useEnvironmentalData('NewSubmissions');
	const fetchPreviousSubmissionsRef = useRef(fetchPreviousSubmissions);

	useEffect(() => {
		fetchPreviousSubmissionsRef.current = fetchPreviousSubmissions;
	}, [fetchPreviousSubmissions]);

	useEffect(() => {
		if (!token || !userHasEnvironmentalAccess) {
			setPreviousSubmission(undefined);
			return;
		}

		const controller = new AbortController();

		fetchPreviousSubmissionsRef
			.current({
				username: user?.email,
				signal: controller.signal,
				page: 1,
				pageSize: 1,
			})
			.then((previousSubmission) => {
				if (controller.signal.aborted) {
					return;
				}

				setPreviousSubmission(previousSubmission?.data?.[0]);
			});

		return () => controller.abort();
	}, [token, user?.email, userHasEnvironmentalAccess]);

	const isTarOnlyEligible = isTarOnlySubmissionEligible(previousSubmission);
	const isCsvRequiredButMissingForSubmission = isCsvRequiredButMissing({
		oneCsv,
		isTarOnlySubmissionEligible: isTarOnlyEligible,
	});
	const isSubmissionReady = isSubmissionReadyForUpload({
		oneCsv,
		oneOrMoreTar,
		isTarOnlySubmissionEligible: isTarOnlyEligible,
	});
	const hasBlockingIssues = hasSubmissionBlockingIssues({
		uploadError,
		filesSubmissionInstructions,
		isCsvRequiredButMissing: isCsvRequiredButMissingForSubmission,
	});
	const enableSubmitButton = shouldEnableSubmitButton({
		isSubmissionReadyForUpload: isSubmissionReady,
		hasSubmissionBlockingIssues: hasBlockingIssues,
	});

	const handleSubmit = async () => {
		if (!thereAreFiles || !token || !userHasEnvironmentalAccess) {
			const errorMessage = `No ${token ? 'token' : userHasEnvironmentalAccess ? 'scopes' : 'files'} to submit`;
			setConfirmSubmissionModalOpen(false);
			setUploadError([{ batchName: '', message: errorMessage, type: 'FILE_READ_ERROR' }]);
			return;
		}

		// Extract organization name from the CSV file, or from the previous submission
		// when this is a CSV-less (sequencing-files-only) submission
		const selectedCsv = oneCsv[0];
		let organizationName: string;

		if (selectedCsv) {
			organizationName = selectedCsv.name.split('.')[0].toUpperCase();
		} else if (isTarOnlyEligible && previousSubmission) {
			organizationName = previousSubmission.organization || '';
		} else {
			setConfirmSubmissionModalOpen(false);
			setUploadError([
				{
					batchName: '',
					message: 'Unable to determine organization name from CSV file or previous submission',
					type: 'INCORRECT_SECTION',
				},
			]);
			return;
		}

		const hasWriteAccessToOrganization =
			userIsEnvironmentalAdmin || userEnvironmentalWriteScopes.includes(organizationName);
		if (!hasWriteAccessToOrganization) {
			setConfirmSubmissionModalOpen(false);
			setUploadError([
				{
					batchName: '',
					message: `User does not have permission to upload data for organization "${organizationName}"`,
					type: 'FILE_READ_ERROR',
				},
			]);
			return;
		}

		const formData = buildFormData(organizationName, selectedCsv, oneOrMoreTar);

		// Submit data
		try {
			const response = await submitData({ body: formData });
			setConfirmSubmissionModalOpen(false);

			switch (response.status) {
				case CreateSubmissionStatus.PARTIAL_SUBMISSION:
				case CreateSubmissionStatus.INVALID_SUBMISSION: {
					setUploadError(
						response.batchErrors.map((error) => ({
							...error,
							message: mapBatchErrorMessage(error.message, organizationName),
						})),
					);
					break;
				}

				case CreateSubmissionStatus.PROCESSING: {
					if (response.submissionId && oneOrMoreTar.length === 0) {
						Router.push(
							getInternalLink({
								path: urlJoin('submission', 'environmental', response.submissionId.toString()),
							}),
						);
					} else if (response.submissionId && oneOrMoreTar.length > 0) {
						setFilesSubmissionInstructions(response.submissionManifest);
						setSubmissionId(response.submissionId.toString());
						setOpenGuideModal(
							response.submissionManifest &&
								response.submissionManifest.length > 0 &&
								response.submissionId != null,
						);
					} else {
						console.log('Unhandled response:', response);
					}
					break;
				}

				default: {
					console.error(response);
					setUploadError([
						{
							batchName: '',
							message: 'Your upload request has failed. Please try again later.',
							type: 'FILE_READ_ERROR',
						},
					]);
					break;
				}
			}
		} catch (error) {
			setConfirmSubmissionModalOpen(false);
			console.error(error);
			setUploadError([
				{
					batchName: '',
					message: 'An unexpected error occurred. Please try again later.',
					type: 'FILE_READ_ERROR',
				},
			]);
		}
	};

	const handleClearAll = () => {
		setUploadError([]);
		validationDispatch({ type: 'clear all' });
	};

	const handleRemoveThis =
		({ name }: SubmissionFile) =>
		() => {
			setUploadError([]);
			validationDispatch({
				type: `remove ${getFileExtension(name)}`,
				file: name,
			} as ValidationAction);
			validationDispatch({ type: 'is ready' });
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
				You can submit either microbial nucleic acid sequence data or qPCR/amplicon data from wastewater and
				other water through this submission portal.
			</p>
			<p>
				If you would like some help with a large submission, please don't hesitate to contact us at&nbsp;
				<StyledLink
					href="mailto:info@imicroseq-dataportal.ca"
					rel="noopener noreferrer"
					target="_blank"
				>
					info@imicroseq-dataportal.ca
				</StyledLink>
			</p>

			<p>
				<strong>For qPCR/amplicon data,</strong> you should submit a single <span className="code">.csv</span>
				&nbsp; file comprising your qPCR values and associated metadata. The qPCR data template is
				available&nbsp;
				<StyledLink
					href={downloadMetadataTemplateUrl}
					rel="noopener noreferrer"
					target="_blank"
				>
					here
				</StyledLink>
				&nbsp; or, use the&nbsp;
				<StyledLink
					href="https://github.com/Public-Health-Bioinformatics/DataHarmonizer"
					rel="noopener noreferrer"
					target="_blank"
				>
					DataHarmonizer
				</StyledLink>
				&nbsp; , which is a tool that can be used to help validate the accepted values for each field in your
				CSV locally before submitting. Download the tool and follow the instructions on the GitHub repository to
				pre-validate each field in your CSV before submission. The file name must match the Study name for the
				Submission (e.g., QC.csv, etc.). Only one <span className="code">.csv</span> is permitted per
				submission.
			</p>

			<p>
				<strong>For nucleic acid sequence data,</strong> you should submit a&nbsp;
				<span className="code">.tar.xz</span> file containing the sequence data (FASTQ formatted), plus a single
				<span className="code">.csv</span> file containing the associated metadata. To format the metadata,
				there is a template available&nbsp;
				<StyledLink
					href={downloadMetadataTemplateUrl}
					rel="noopener noreferrer"
					target="_blank"
				>
					here
				</StyledLink>
				&nbsp; or, use the&nbsp;
				<StyledLink
					href="https://github.com/Public-Health-Bioinformatics/DataHarmonizer"
					rel="noopener noreferrer"
					target="_blank"
				>
					DataHarmonizer
				</StyledLink>
				, which is a tool that can be used to help validate the accepted values for each field in your metadata
				locally before submitting. Download the tool and follow the instructions on the GitHub repository to
				pre-validate each field in your CSV before submission. Multiple sequence files can be uploaded in a
				single submission. The filename of the sequence files should match the&nbsp;
				<strong>"specimen collector sample ID"</strong>
				column in the CSV.
			</p>

			<DropZone
				disabled={!userHasEnvironmentalAccess}
				validationState={validationState}
				validationDispatch={validationDispatch}
				setUploadError={setUploadError}
			/>

			{previousSubmission && isTarOnlyEligible && (
				<p
					css={css`
						${theme.typography.regular}
						background-color: ${theme.colors.warning_dark};
						border: 1px solid ${theme.colors.grey_3};
						border-radius: 8px;
						box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
						margin: 10px 10px;
						padding: 10px;
					`}
				>
					You have a pending valid submission <strong>#{previousSubmission.id}</strong> for study{' '}
					<strong>{previousSubmission.organization}</strong>. You have three options: <br />
					1. <strong>Add sequencing files</strong> - Upload only <span className="code">.tar.xz</span> files
					in the area above to add sequence file(s) to this existing submission. <br />
					2. <strong>Review your submission</strong> - Go to the{' '}
					<StyledLink
						href={getInternalLink({
							path: urlJoin('submission', 'environmental', previousSubmission.id.toString()),
						})}
					>
						<strong>submission #{previousSubmission.id}</strong>
					</StyledLink>{' '}
					details page to review or continue this submission.
					<br />
					3. <strong>Start over</strong> - Cancel the pending submission and start a new one by uploading a{' '}
					<span className="code">.csv</span> file.
				</p>
			)}

			{uploadError.length > 0 && (
				<ErrorNotification
					size="md"
					title="Submission could not be processed"
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
						{uploadError.map(({ message }, index) => (
							<ErrorMessage
								key={`upload-error-${index}`}
								values={message}
							/>
						))}
					</ul>
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
								{oneCsv.map((csvFile: SubmissionFile, index: number) => (
									// when more than one, all but the last one will get crossed out on render
									<FileRow
										active={index === oneCsv.length - 1}
										file={csvFile}
										key={csvFile.name}
										handleRemove={handleRemoveThis(csvFile)}
									/>
								))}
								{oneOrMoreTar.map((tarFile: SubmissionFile) => (
									<FileRow
										active={true}
										file={tarFile}
										key={tarFile.name}
										handleRemove={handleRemoveThis(tarFile)}
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
									disabled={!enableSubmitButton}
									onClick={() => setConfirmSubmissionModalOpen(true)}
								>
									Submit Data
								</Button>
								{thereAreFiles && isCsvRequiredButMissingForSubmission && (
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
				{openGuideModal && (
					<FileUploadInstructionsModal
						submissionManifest={filesSubmissionInstructions}
						submissionId={submissionId}
						onClose={() => {
							setOpenGuideModal(false);
							setFilesSubmissionInstructions([]);
							setSubmissionId('');
							validationDispatch({ type: 'clear all' });
							Router.push(
								getInternalLink({
									path: urlJoin('submission', 'environmental', submissionId),
								}),
							);
						}}
					/>
				)}
				{confirmSubmissionModalOpen && (
					<ConfirmSubmissionModal
						onClose={() => setConfirmSubmissionModalOpen(false)}
						onSubmit={handleSubmit}
					>
						{getConfirmSubmissionMessage(validationState, previousSubmission)}
					</ConfirmSubmissionModal>
				)}
			</LoaderWrapper>
		</article>
	);
};

export default NewSubmissions;
