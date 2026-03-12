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
import { ReactElement, ReactNode } from 'react';

import Footer from '#components/Footer';
import SystemAlerts, { SystemAlert } from '#components/SystemAlerts';

import PageHead from './Head';
import NavBar from './NavBar';

const PageLayout = ({ children, subtitle }: { children: ReactNode; subtitle?: string }): ReactElement => {
	return (
		<>
			<PageHead subtitle={subtitle} />

			{/* <SystemAlerts /> */}
			{/* TODO: custom banner for launch. remove me later */}
			<SystemAlert
				alert={{
					id: 'virusseq-transition-banner',
					message:
						'The VirusSeq Data Portal is expanding into the iMicroSeq Data Portal, which contains additional microbial data. While there were no updates during migration (Feb 5- Mar 12), updates can now proceed. We apologize for any impacts. If you have any problems or feedback, please contact <a href="mailto:info@imicroseq-dataportal.ca" target="_blank">info@imicroseq-dataportal.ca</a>.',
				}}
				key={'virusseq-transition-banner'}
			/>

			<div
				css={(theme) => css`
					display: grid;
					grid-template-rows: ${theme.dimensions.navbar.height}px 1fr ${theme.dimensions.footer.height}px;
					height: 100%;
					${theme.typography.regular}
					color: ${theme.colors.black};
				`}
			>
				<NavBar />

				{children}

				<Footer />
			</div>
		</>
	);
};

export default PageLayout;
