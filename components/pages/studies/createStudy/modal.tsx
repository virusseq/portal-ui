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

import { css } from '@emotion/react';
import { ChangeEventHandler, InputHTMLAttributes } from 'react';

import {
	FormInputSearchSelect,
	FormInputText,
	FormInputTextArea,
	useFormValidator,
} from '#components/Forms';
import { Modal } from '#components/Modal';
import { CreateStudyReq } from '#global/hooks/useStudiesSvcData/types';

import CreateStudyValidations from './validations';

const EMPTY_FORM: CreateStudyReq = Object.freeze({
	studyId: '',
	organization: '',
	name: '',
	description: '',
	songId: '',
});

type CreateStudyModalProps = {
	onClose: () => void;
	submitData: (currentFormData: CreateStudyReq) => Promise<void>;
};

const CreateStudyModal = ({ onClose, submitData }: CreateStudyModalProps) => {
	const {
		isFormInvalid,
		formData,
		formErrors,
		setFormData,
		validateForm,
		validateField,
		clearFieldError,
	} = useFormValidator<CreateStudyReq>(EMPTY_FORM, CreateStudyValidations);

	const handleSubmit = () => {
		validateForm()
			.then((valid) => {
				if (!valid) {
					throw Error('Form data is not valid, refuse to submit!');
				}
			})
			.then(async () => {
				await submitData(formData);
				setFormData({ ...EMPTY_FORM });
			})
			.catch((err) => console.error(err));
	};

	const buildOnChangeFunc =
		(key: keyof CreateStudyReq): ChangeEventHandler =>
		(event) => {
			event.preventDefault();
			const target = event.target as InputHTMLAttributes<typeof event>;
			setFormData({ ...formData, [key]: target.value || '' });
			clearFieldError(key);
		};

	const buildOnBlurFunc = (key: keyof CreateStudyReq) => () => validateField(key);

	const notFilledRequiredFields =
		formData.studyId === '' || formData.name === '' || formData.organization === '';

	return (
		<Modal
			key="CreateForm"
			title={'Create a Study'}
			showActionButton={true}
			disableActionButton={isFormInvalid || notFilledRequiredFields}
			actionText={'Create Study'}
			closeText={'Cancel'}
			onCloseClick={onClose}
			onActionClick={handleSubmit}
		>
			<div
				key="CreateForm"
				css={css`
					display: flex;
					flex-direction: column;
					row-gap: 5px;
					width: 630px;
					justify-content: space-evenly;
					margin-top: 10px;
					padding-right: 10px;
				`}
			>
				<FormInputText
					required={true}
					label="Study ID"
					onChange={buildOnChangeFunc('studyId')}
					onBlur={buildOnBlurFunc(`studyId`)}
					errorMessage={formErrors[`studyId`]}
					value={formData[`studyId`]}
					size={50}
				/>
				<FormInputSearchSelect
					options={['clinical', 'environmental']}
					required={true}
					label="Sample Type"
					onChange={buildOnChangeFunc('songId')}
					onBlur={buildOnBlurFunc(`songId`)}
					errorMessage={formErrors[`songId`]}
					value={formData[`songId`]}
					size={50}
				/>
				<FormInputText
					required={true}
					label="Organization"
					onChange={buildOnChangeFunc('organization')}
					onBlur={buildOnBlurFunc(`organization`)}
					errorMessage={formErrors[`organization`]}
					value={formData[`organization`]}
					size={50}
				/>
				<FormInputText
					required={true}
					label="Study Name"
					onChange={buildOnChangeFunc('name')}
					onBlur={buildOnBlurFunc(`name`)}
					errorMessage={formErrors[`name`]}
					value={formData[`name`]}
					size={50}
				/>
				<FormInputTextArea
					required={false}
					label="Description"
					onChange={buildOnChangeFunc('description')}
					onBlur={buildOnBlurFunc(`description`)}
					errorMessage={formErrors[`description`]}
					value={formData[`description`]}
					cols={52}
					rows={8}
				/>
			</div>
		</Modal>
	);
};

export default CreateStudyModal;
