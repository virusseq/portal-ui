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

const Guidelines: React.FC = () => {
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
							<Title style={{ width: '94%' }}>Guidelines</Title>
							
							<Card style={ descriptiveText }>
								<Title>SARS-COV2 metadata</Title>
								<Paragraph>
								The APA uses standardized metadata to ensure harmonization and interoperability. The metadata is derived from work done by the Public Health Alliance for Genomic Epidemiology (PHA4GE), a global coalition that is actively working to establish consensus standards, document and share best practices, improve the availability of critical bioinformatic tools and resources, and advocate for greater openness, interoperability, accessibility and reproducibility in public health microbial bioinformatics.
								</Paragraph>
								<Paragraph>
								The SARS-CoV-2 contextual data specification includes a metadata collection template, reference guides, controlled vocabulary, and mapping to existing standards. 
								</Paragraph>
								<Paragraph>
								For more information and links to the SARS-COV2 contextual metadata template, developed by the PHA4GE consortium, please visit <a href="https://github.com/pha4ge/SARS-CoV-2-Contextual-Data-Specification">https://github.com/pha4ge/SARS-CoV-2-Contextual-Data-Specification</a>
								</Paragraph>
							</Card>
							
							<Card style={ descriptiveText }>
								<Title>File formats</Title>
								<Paragraph>
								The APA currently allows for the uploading of FASTA files in combination with the associated metadata file, in .tsv format. Note that both files must be uploaded together for each submission.
								</Paragraph>	
								<Paragraph>
								Tab-separated values (TSV) is a simple, text-based file format for storing tabular data. Records are separated by newlines, and values within a record are separated by tab characters. The TSV format is thus a delimiter-separated values format, similar to comma-separated values.
								</Paragraph>	
								<Paragraph>
								Consensus Fasta sequence
								</Paragraph>	
								<Paragraph>
								Besides the vcf file, a consensus file is also generated which represents the nucleotide present at each position of your sample’s genome. That is, a blueprint copy of your sample’s entire genome. However, even this file is QC’d to show only results where the coverage is more than twenty times.
								</Paragraph>
								<Paragraph>
								However, you may want to tailor your parameters so that your files are fit for downstream analyses. For example, recovering a complete genome is important for phylogenetic analysis. Nextstrain will only accept genomes where more than 92% of your genome is covered and if it has at least 27,510 informative bases (A,C,T,G). So, you may want to make sure there are not many stretches of Ns in the consensus genome.
								</Paragraph>
								<Paragraph>
								For more guidance on FASTA file formats <a href="https://www.ncbi.nlm.nih.gov/genbank/fastaformat/" target="_blank">https://www.ncbi.nlm.nih.gov/genbank/fastaformat/</a>
								</Paragraph>	
								
							</Card>
							<Card style={ descriptiveText }>
								<Title>Data Submitters Guidelines</Title>
								Nothing yet, but stay tuned ...

								
								
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

export default Guidelines;
