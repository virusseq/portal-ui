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
import { Layout, Space, Button, Typography } from 'antd';
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

const App: React.FC = () => {
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
							<Title style={{ width: '80%' }}>Welcome to APA</Title>
							<Paragraph style={{ width: '80%' }}>
								The Africa CDC’s Institute for Pathogen Genomics (IPG) has, since 2020, been 
								developing a Bill and Melinda Gates Foundation funded project called the 
								African Pathogen Genomics Initiative (PGI). One component of the PGI is 
								support for regional data management and exchange platform for a seamless 
								pathogen genomic data analysis, visualization, reporting, sharing, and 
								archiving, between African Union member states and their associated 
								National Public Health Institutions.
							</Paragraph>
							<Paragraph style={{ width: '80%' }}>
								The African Pathogen Archive pilot programme (the Pilot) aims to provide a 
								proof of concept implementation of such a data sharing platform as a first 
								step towards further development and adoption. The primary goal is to develop 
								a comprehensive digital solution for pathogen genomics data management and 
								exchange and pilot in selected Member States across the Africa PGI laboratory 
								network. The aim is to have highly secured, robustly performing and a user-friendly 
								solution from the end-user perspective. 
							</Paragraph>
							<div style={{ width: '80%' }}>
								<PartnerLogosBanner />
							</div>
							<Title level={4} style={{ width: '80%' }}>
								Pathogen available
							</Title>
							<PathogenTable />
							<div style={descriptiveText}>
								<div style={{ width: '45%' }}>
									<Title level={3}>What the platform does</Title>
									<Paragraph>
										The APA pilot implementation is based on the CanCoGen VirusSeq data portal, 
										developed by the Ontario Institute of Cancer Research (OICR). VirusSeq is a 
										React / Next.js front-end to a set of services for data upload, metadata 
										management, bulk data storage, metadata indexing, authorisation and so 
										forth. As part of the deployment of this platform, SANBI is deploying the 
										various services of VirusSeq on a Kubenetes cluster hosted on the Ilifu 
										cloud. Based on user feedback and in line with Africa CDC branding and design 
										work undertaken by Hominum, we aim to develop a custom front-end that draws 
										components from the VirusSeq portal while also being visually distinct.
									</Paragraph>
									<Paragraph>
										The APA front-end (the above-mentioned combination of novel development and 
										existing VirusSeq components) needs to communicate with existing services, 
										including Arranger for querying data, Muse for uploading data, Song for 
										managing metadata schemas and Ego for managing users, groups and roles 
										(access policies). While some elements of this capacity are already present 
										in the VirusSeq platform, they will need to be enhanced to meet the needs 
										of the APA platform. 
									</Paragraph>
								</div>
								<div style={{ width: '45%' }}>
									<Title level={3}>How to use this platform </Title>
									<Paragraph>
										Lorem ipsum dolor sit amet consectetur. Dolor dolor vulputate ac at. Mi ipsum
										augue netus ullamcorper diam vitae id ac morbi. Neque adipiscing faucibus ut
										proin enim urna nisl suspendisse integer. Lorem nulla malesuada netus magna
										convallis feugiat fames faucibus pellentesque.
									</Paragraph>
								</div>
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

export default App;
