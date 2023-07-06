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

import React, { useState, useEffect } from 'react';
import { Layout, Space, Button, Typography, Card } from 'antd';
import { css } from '@emotion/react';

import { InternalLink } from '@/components/Link';
import PathogenTable from '@/components/PathogenTable';

import useAuthContext from '../../../global/hooks/useAuthContext';
import CurrentUser from '../../NavBar/CurrentUser';
import SideMenu from '../../SideMenu';
import { getConfig } from '../../../global/config';

import PartnerLogosBanner from './PartnerLogosBanner';

const { Header, Footer, Sider, Content } = Layout;
const { Title, Paragraph } = Typography;

const headerStyle: React.CSSProperties = {
	textAlign: 'center',
	color: '#000',
	height: 68,
	paddingInline: 50,
	lineHeight: '64px',
	backgroundColor: '#ffffff',
	display: 'flex',
	justifyItems: 'center',
	justifyContent: 'space-between',
	position: 'sticky',
	top: 0,
	zIndex: 1,
	width: '100%',
};

const headerButtons: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'space-around',
	alignItems: 'center',
	width: 180,
};

const contentStyle: React.CSSProperties = {
	textAlign: 'left',
	minHeight: '80vh',
	lineHeight: '120px',
	color: '#fff',
	backgroundColor: '#F5F5F5',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'start',
	alignItems: 'center',
};

const descriptiveText: React.CSSProperties = {
	width: '80%',
	display: 'flex',
	justifyContent: 'space-between',
};

const siderStyle: React.CSSProperties = {
	textAlign: 'center',
	lineHeight: '120px',
	color: '#fff',
	backgroundColor: '#3ba0e9',
};

const footerStyle: React.CSSProperties = {
	textAlign: 'center',
	color: '#fff',
	backgroundColor: '#ffffff',
};

const { NEXT_PUBLIC_EGO_API_ROOT, NEXT_PUBLIC_EGO_CLIENT_ID, NEXT_PUBLIC_KEYCLOAK } = getConfig();

const TermsAndConditions: React.FC = () => {
	const { logout, token, userHasAccessToStudySvc } = useAuthContext();
	const [origin, setOrigin] = useState('');
	useEffect(() => {
		window && setOrigin(window.location.origin);
	}, []);
	return (
		<Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
			<Layout>
				<Header style={headerStyle}>
					<div
						css={css`
							display: flex;
							align-items: center;
							padding-top: 25px;
							cursor: pointer;
						`}
					>
						<InternalLink path={''}>
							<a
								css={css`
									align-items: left;
									text-decoration: none;
								`}
							>
								<img src="/images/new-navbar-logo.png" alt="APA logo" width="182" />
							</a>
						</InternalLink>
					</div>
					{token === undefined && (
						<div style={headerButtons}>
							<Button
								href={`${NEXT_PUBLIC_EGO_API_ROOT}/oauth/login/keycloak?client_id=${NEXT_PUBLIC_EGO_CLIENT_ID}`}
							>
								Login
							</Button>
							<Button
								href={`${NEXT_PUBLIC_KEYCLOAK}registrations?client_id=ego&response_type=code&redirect_uri=${origin}`}
								type="primary"
							>
								Register
							</Button>
						</div>
					)}
					{token && (
						<div>
							<CurrentUser />
						</div>
					)}
				</Header>
				<Layout>
					<Sider style={siderStyle} width={256}>
						<SideMenu selectedKey={'home'} />
					</Sider>
					<Layout>
						<Content style={contentStyle}>
							<Title style={{ width: '94%' }}>Data usage policies</Title>
							
							<Card style={ descriptiveText }>
								<Title>General</Title>
								<Paragraph>
								The APA is an open-access data portal intended to facilitate access to African SARS-CoV-2 sequences and associated non-sensitive metadata 
								adhering to the FAIR Data principles. The user interface Portal will harmonize, validate, manage and share limited contextual metadata 
								and pathogen genome sequences among public health labs, researchers and other groups facilitating exploration and access to the data to 
								promote responsive, collaborative, research and public health surveillance.
								</Paragraph>								
							</Card>
							
							<Card style={ descriptiveText }>
								<Title>Disclaimer</Title>
								<Paragraph>
								The APA will not be providing access to any personal data and if you are submitting sequences or metadata, please ensure that you do not include any data which is considered identifying of a person(s). See POPIA definitions of ‘personal information’ and ‘special personal information’ (https://popia.co.za/section-1-definitions/)
								</Paragraph>	
								<Paragraph>
								Beyond limited editorial and quality controls and some internal integrity checks, the quality and accuracy of the record are the responsibility of submitters, not of the APA. It is also the responsibility of submitters to ascertain that they have the right to submit the data. The APA data curation team will work with submitters to provide feedback on metadata and sequence data to improve the overall quality and consistency of the data submitted.
								</Paragraph>									
							</Card>
							<Card style={ descriptiveText }>
								<Title>Privacy Policy</Title>
								<Paragraph>
								The APA is committed to protecting the privacy and security of the personal information and data of its users to the greatest extent possible subject in accordance with the Protection of Personal Information Act (POPI Act). Personal information is defined as information that can reasonably be used to identify an individual either alone or in combination with other available information. The APA will only use your personal information for specific and consented purposes.This policy will be followed, except for cases in which legal requirements demand access or when subpoenas or other legal instruments allow personal data access. Your explicit permission is required before sharing personal data outside of the APA and its affiliated personnel or contractors. Personal data will be stored only as long as necessary to meet its purposes, as permitted by applicable legal regulations.
								</Paragraph>
								
							</Card>
							<Card style={ descriptiveText }>
								<Title>Purpose, use, and collection of information</Title>
								<Paragraph>
								The primary objective of the APA database is to facilitate scientific research by providing a centralized access point to pathogen genomic data and relevant contextual metadata from Africa for researchers and interested parties.
								</Paragraph>
								<Paragraph>
								Although personal information is not mandatory for accessing the database, some essential features may require it. The personal information collected through web forms for account creation and service provision is voluntary and subject to the type of account and services used. The information collected will be protected through various physical and electronic security measures, including encryption and password protection.
								</Paragraph>
								<Paragraph>
								By providing your personal information, you are consenting to its use for specific purposes such as communicating with you about APA services, troubleshooting website issues, and providing services like data submission and access.	
								</Paragraph>
								<Paragraph>
								The primary objective of the APA database is to facilitate scientific research by providing a centralized access point to pathogen genomic data and relevant contextual metadata from Africa for researchers and interested parties.
								</Paragraph>
								<Paragraph>
								Although personal information is not mandatory for accessing the database, some essential features may require it. The personal information collected through web forms for account creation and service provision is voluntary and subject to the type of account and services used. The information collected will be protected through various physical and electronic security measures, including encryption and password protection.	
								</Paragraph>
								<Paragraph>
								By providing your personal information, you are consenting to its use for specific purposes such as communicating with you about APA services, troubleshooting website issues, and providing services like data submission and access.
								</Paragraph>
								<Paragraph>
								The APA website and its affiliated servers collect certain analytics for web presentation, troubleshooting, and web functionality purposes, such as the internet protocol (IP) address of the device being used, the requested web pages, the referring web page, the browser employed, and the date and time of activities. This information is not linked with individual user identities and will not be used to identify any users in accordance with the APA Privacy Policy.	
								</Paragraph>
								<Paragraph>
								Third-party contractors or agents may be involved in maintaining and improving the functions of the APA database, particularly IT services. In these cases, personal information will be kept confidential and secure in line with the Protection of Personal Information (POPI) Act and the APA Privacy Policy. Any third parties who access personal information are only authorized to use it for legitimate purposes permitted by the APA.									
								</Paragraph>								
								
							</Card>
							<Card style={ descriptiveText }>
								<Title>Cookies</Title>
								<Paragraph>
								This website uses 'Cookies', which are digital data files that may gather information such as your email address, username, or track the pages viewed and documents downloaded. The APA may use 'cookies' to provide web content tailored to the user's preferences or to maintain user sessions when this feature is enabled. Users have the option to enable or disable cookies on this website, and no such data will be collected if the feature is deactivated. It should be noted that while disabling cookies will not limit access to the APA website, it may interfere with the normal functioning of certain features.
								</Paragraph>								
								
							</Card>
							<Card style={ descriptiveText }>
								<Title>Hyperlinks and other privacy policies</Title>
								<Paragraph>
								In the event that you click on a hyperlink from the APA website leading to the website(s) of another entity, it is possible that said entity may maintain a privacy policy that differs from that of the APA. The APA cannot be held accountable for the user’s privacy that may occur from the use of these offsite websites. In such cases we strongly recommend that you carefully review the privacy policies of these other entities.
								</Paragraph>								
								
							</Card>							
							
						</Content>
						<Footer style={footerStyle}>
							<div>
								<PartnerLogosBanner />
							</div>
						</Footer>
					</Layout>
				</Layout>
			</Layout>
		</Space>
	);
};

export default TermsAndConditions;
