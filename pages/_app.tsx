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

import { AppContext } from 'next/app';
import Router from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

import Root from '#components/Root';
import { EGO_JWT_KEY, INTERNAL_PATHS } from '#global/utils/constants';
import { isValidJwt } from '#global/utils/egoTokenUtils';
import getInternalLink from '#global/utils/getInternalLink';
import { PageWithConfig } from '#global/utils/pages/types';

const DMSApp = ({
	Component,
	pageProps,
	ctx,
}: {
	Component: PageWithConfig;
	pageProps: { [k: string]: any };
	ctx: any;
}): ReactElement => {
	const [initialToken, setInitialToken] = useState<string>();

	useEffect(() => {
		const egoJwt = localStorage.getItem(EGO_JWT_KEY) || undefined;

		if (egoJwt && isValidJwt(egoJwt)) {
			setInitialToken(egoJwt);
		} else {
			egoJwt && setInitialToken(undefined);
			// redirect to logout when token is expired/missing only if user is on a non-public page
			if (!Component.isPublic) {
				Router.push({
					pathname: getInternalLink({ path: INTERNAL_PATHS.LOGIN }),
					query: { session_expired: true },
				});
			}
		}
	}, [Component.isPublic]);

	return (
		<Root pageContext={ctx} egoJwt={initialToken}>
			<Component {...pageProps} />
		</Root>
	);
};

DMSApp.getInitialProps = async ({ ctx, Component }: AppContext & { Component: PageWithConfig }) => {
	const pageProps = await Component.getInitialProps({ ...ctx });
	return {
		ctx: {
			pathname: ctx.pathname,
			query: ctx.query,
			asPath: ctx.asPath,
		},
		pageProps,
	};
};

export default DMSApp;
