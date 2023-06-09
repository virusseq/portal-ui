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

import React, { ReactElement, useEffect, useState } from 'react';
import { Layout, Space, Button } from 'antd';
import { css, useTheme } from '@emotion/react';
import { ArrangerDataProvider } from '@overture-stack/arranger-components';

import { InternalLink } from '@/components/Link';
import ErrorNotification from '@/components/ErrorNotification';
import Loader from '@/components/Loader';
import PageLayout from '@/components/PageLayout';
import createArrangerFetcher from '@/components/utils/arrangerFetcher';
import sleep from '@/components/utils/sleep';
import { getConfig } from '@/global/config';
import { RepoFiltersType } from '@/global/types/sqon';

import CurrentUser from '../../NavBar/CurrentUser';
import useAuthContext from '../../../global/hooks/useAuthContext';
import getConfigError from '../explorer/getConfigError';
import SideMenu from '../../SideMenu';
import PageContent from '../explorer/PageContent';

export interface PageContentProps {
	sqon: RepoFiltersType;
	selectedTableRows: string[];
	setSelectedTableRows: (ids: []) => void;
	index: string;
	api: ({
		endpoint,
		body,
		headers,
		method,
	}: {
		endpoint: string;
		body: string;
		headers: any;
		method: string;
	}) => Promise<any>;
	setSQON: (sqon: RepoFiltersType) => void;
	fetchData?: () => Promise<any>;
}

const arrangerFetcher = createArrangerFetcher({});

const configsQuery = `
  query ($documentType: String!, $index: String!) {
    hasValidConfig (documentType: $documentType, index: $index)
  }
`;

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
	textAlign: 'center',
	color: '#000',
	height: 64,
	paddingInline: 50,
	lineHeight: '64px',
	backgroundColor: '#ffffff',
	display: 'flex',
	justifyItems: 'center',
	justifyContent: 'space-between',
};

const headerButtons: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'space-around',
	alignItems: 'center',
	width: 180,
};

const contentStyle: React.CSSProperties = {
	textAlign: 'center',
	minHeight: 120,
	lineHeight: '120px',
	color: '#fff',
	backgroundColor: '#F5F5F5',
	display: 'flex',
	justifyContent: 'center',
	alignContent: 'center',
	justifyItems: 'center',
	paddingTop: '100px',
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

const Pathogen: React.FC = () => {
	const { logout, token, userHasAccessToStudySvc } = useAuthContext();
	const theme = useTheme();
	const {
		NEXT_PUBLIC_ARRANGER_API,
		NEXT_PUBLIC_ARRANGER_DOCUMENT_TYPE,
		NEXT_PUBLIC_ARRANGER_INDEX,
		NEXT_PUBLIC_EGO_API_ROOT,
		NEXT_PUBLIC_EGO_CLIENT_ID,
		NEXT_PUBLIC_KEYCLOAK,
	} = getConfig();
	const [arrangerHasConfig, setArrangerHasConfig] = useState<boolean>(false);
	const [loadingArrangerConfig, setLoadingArrangerConfig] = useState<boolean>(true);
	const [origin, setOrigin] = useState<string>('');

	useEffect(() => {
		arrangerFetcher({
			endpoint: 'graphql/hasValidConfig',
			body: JSON.stringify({
				variables: {
					documentType: NEXT_PUBLIC_ARRANGER_DOCUMENT_TYPE,
					index: NEXT_PUBLIC_ARRANGER_INDEX,
				},
				query: configsQuery,
			}),
		})
			.then(async ({ data } = {}) => {
				if (data?.hasValidConfig) {
					await setArrangerHasConfig(data.hasValidConfig);
					// 1s delay so loader doesn't flicker on and off too quickly
					await sleep(1000);

					return setLoadingArrangerConfig(false);
				}

				throw new Error('Could not validate Arranger server configuration!');
			})
			.catch(async (err) => {
				console.warn(err);
				// same as above comment
				await sleep(1000);
				setLoadingArrangerConfig(false);
			});
	}, [NEXT_PUBLIC_ARRANGER_DOCUMENT_TYPE, NEXT_PUBLIC_ARRANGER_INDEX]);

	useEffect(() => {
		window && setOrigin(window.location.origin);
	}, []);

	const ConfigError = getConfigError({
		hasConfig: arrangerHasConfig,
		index: NEXT_PUBLIC_ARRANGER_INDEX,
		documentType: NEXT_PUBLIC_ARRANGER_DOCUMENT_TYPE,
	});

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
					<Sider style={siderStyle} collapsed={true}>
						<SideMenu selectedKey={'pathogen'} />
					</Sider>
					<Layout>
						<div style={{ color: theme.colors.black, lineHeight: 1 }}>
							{loadingArrangerConfig ? (
								<div
									css={css`
										display: flex;
										flex-direction: column;
										justify-content: center;
										align-items: center;
										background-color: ${theme.colors.grey_2};
									`}
								>
									<Loader />
								</div>
							) : ConfigError ? (
								<ErrorNotification
									title={'DMS Configuration Error'}
									size="lg"
									css={css`
										flex-direction: column;
										justify-content: center;
										align-items: center;
									`}
								>
									{ConfigError}
								</ErrorNotification>
							) : (
								<ArrangerDataProvider
									apiUrl={NEXT_PUBLIC_ARRANGER_API}
									customFetcher={arrangerFetcher}
									documentType={NEXT_PUBLIC_ARRANGER_DOCUMENT_TYPE}
									theme={{
										colors: {
											common: {
												black: theme.colors.black,
											},
										},
									}}
								>
									<PageContent />
								</ArrangerDataProvider>
							)}
						</div>
						<Footer style={footerStyle}></Footer>
					</Layout>
				</Layout>
			</Layout>
		</Space>
	);
};

export default Pathogen;
