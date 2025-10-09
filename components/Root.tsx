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

import { ThemeProvider } from '@emotion/react';
import { createRef, ReactElement, useEffect } from 'react';

import { getConfig } from '#global/config';
import { AuthProvider } from '#global/hooks/useAuthContext';
import { PageContext } from '#global/hooks/usePageContext';
import { TrackingProvider } from '#global/hooks/useTrackingContext';
import { ClientSideGetInitialPropsContext } from '#global/utils/pages/types';

import SystemAlerts from './SystemAlerts';
import defaultTheme from './theme';

/**
 * portal ref where modals will show up
 */
export const modalPortalRef = createRef<HTMLDivElement>();

const Root = ({
	children,
	egoJwt,
	pageContext,
}: {
	children: ReactElement;
	egoJwt?: string;
	pageContext: ClientSideGetInitialPropsContext;
}): ReactElement => {
	const { NEXT_PUBLIC_APP_VERSION, NEXT_PUBLIC_APP_COMMIT } = getConfig();

	useEffect(() => {
		NEXT_PUBLIC_APP_VERSION && console.info(`App Version: ${NEXT_PUBLIC_APP_VERSION}`);
		NEXT_PUBLIC_APP_COMMIT && console.info(`App Commit: ${NEXT_PUBLIC_APP_COMMIT}`);
	}, [NEXT_PUBLIC_APP_COMMIT, NEXT_PUBLIC_APP_VERSION]);

	return (
		<>
			<style>
				{`
          body {
            margin: 0;
            position: absolute;
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
          } /* custom! */

          #__next {
            position: absolute;
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
          }

          .code {
            background: #eee;
            margin: 0 2px;
            padding: 0 3px;
          }
        `}
			</style>

			<AuthProvider egoJwt={egoJwt}>
				<PageContext.Provider value={pageContext}>
					<TrackingProvider>
						<ThemeProvider theme={defaultTheme}>
							<SystemAlerts />
							<div ref={modalPortalRef} />
							{children}
						</ThemeProvider>
					</TrackingProvider>
				</PageContext.Provider>
			</AuthProvider>
		</>
	);
};

export default Root;
