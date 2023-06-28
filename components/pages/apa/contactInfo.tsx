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
import { Layout, Space, Button, Typography, Table, Card, Col, Row, Collapse, Image } from 'antd';
import { css } from '@emotion/react';

import { InternalLink } from '@/components/Link';

import { useRouter } from 'next/router';
import { INTERNAL_PATHS } from '@/global/utils/constants';

import useAuthContext from '../../../global/hooks/useAuthContext';
import CurrentUser from '../../NavBar/CurrentUser';
import SideMenu from '../../SideMenu';
import { getConfig } from '../../../global/config';

import ContactInfoForm from '@/components/ContactInfo/ContactInfoForm';

import PartnerLogosBanner from './PartnerLogosBanner';
import contact_us_map from './contact_us_map.png'

import {
	PhoneOutlined,
	MailOutlined,
	PushpinOutlined,
} from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;
const { Title, Paragraph } = Typography;
const { Panel } = Collapse

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
	width: '94%',
	display: 'flex',
	justifyContent: 'space-between',
};

const cardDiv: React.CSSProperties = {
	width: '96%',
}

const contactCard: React.CSSProperties = {
	width: '48%',
	// display: 'flex',
	display: 'inline-block',
	justifyContent: 'center',
	textAlign: 'center',
	verticalAlign: 'top',
	// alignItems: 'center',
};

const contactMap: React.CSSProperties = {
	paddingTop: '10px',
	// borderRadius: '5%'
}

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

const ContactInfo: React.FC = () => {
	const router = useRouter();

	const navigateToContactPage = () => {
		router.push(INTERNAL_PATHS.CONTACT)
	}

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
							<Title style={{ width: '94%' }}>Contact us</Title>
							<div style={cardDiv}>
								<Card style={contactCard}>
									<b>Find us</b>
									<Row>
										<Col span={12}>
												<Row>
													<Col span={4}>< MailOutlined /></Col>
													<Col>email@address.co.za</Col>
												</Row>
												<Row>
													<Col span={4}><PhoneOutlined /></Col>
													<Col>+27 73 657 4766</Col>												
												</Row>
												<Row>
													<Col span={4}><PushpinOutlined /></Col>
													<Col>1 Modderdam Road</Col>
												</Row>
												<Row>
													<Col span={4}></Col>
													<Col>UWC, Bellville</Col>
												</Row>
												<Row>
													<Col span={4}></Col>
													<Col>Cape Town</Col>
												</Row>
												<Row>
													<Col span={4}></Col>
													<Col>Western Cape</Col>
												</Row>
												<Row>
													<Col span={4}></Col>
													<Col>South Africa</Col>
												</Row>
										</Col>
										<Col span={12}>
												<a href="https://goo.gl/maps/QBZ5pYFtioSbLEFLA" target="_blank"><img style={contactMap} width="100%" height="100%" src="/images/contact_us_map.png" alt="APA logo" /></a>																							
										</Col>
									</Row>									
									
								</Card>

								<Card style={contactCard}>
									<b>Send us a message</b>
									<ContactInfoForm />
									
									<div>									
										<Button htmlType='button' type="primary" size="large">Send</Button>
									</div>
								</Card>
							</div>
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

export default ContactInfo;
