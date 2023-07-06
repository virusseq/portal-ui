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

import { createRef, ReactElement } from 'react';
import { css, useTheme } from '@emotion/react';
import { useRouter } from 'next/router';
import cx from 'classnames';

import { useState } from "react";
import { Button, Form, Input, Col, Row,} from 'antd';

import useAuthContext from '../../global/hooks/useAuthContext';
import useTrackingContext from '../../global/hooks/useTrackingContext';
import { INTERNAL_PATHS, ROOT_PATH } from '../../global/utils/constants';
import { InternalLink, StyledLinkAsButton } from '../Link';
import defaultTheme from '../theme';


const ContactInfoForm = (): ReactElement => {
	const { logout, token, userHasAccessToStudySvc } = useAuthContext();
	const { logEvent } = useTrackingContext();
	const router = useRouter();
	const theme: typeof defaultTheme = useTheme();

    const [name, setName] = useState(''); 
    const [email_address, setEmailAddress] = useState(''); 
    const [your_message, setYourMessage] = useState(''); 
    
    const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };


    const updateEmailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailAddress(e.target.value);
    };

    const updateYourMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setYourMessage(e.target.value);
    };



	return (
		<Form
			name="contact_info"
			colon={false}
			layout="vertical"
		>
			<Form.Item
				label="Name"
				name="name"
				rules={[
					{
						required: true,
						message: 'Enter your name'
					}
				]}
			>
				<Input 
					value={name}
					onChange={updateName}
				/>
			</Form.Item>

			<Form.Item
				label="Email address"
				name="email_address"
				rules={[
					{
						required: true,
						message: 'Enter your email address'
					}
				]}
			>
				<Input 
					value={email_address}
					onChange={updateEmailAddress}
				/>
			</Form.Item>

			<Form.Item
				label="Your message"
				name="your_message"
				rules={[
					{
						required: true,
						message: 'Enter your message'
					}
				]}
			>
				<Input.TextArea
					value={your_message}
					onChange={updateYourMessage}
				/>
			</Form.Item>

		</Form>
	);
};

export default ContactInfoForm;