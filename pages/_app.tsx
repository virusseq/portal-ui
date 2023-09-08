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

import { ReactElement, useEffect, useState } from 'react';
import { AppContext } from 'next/app';
import { getSession } from 'next-auth/react'
import Router from 'next/router';

import Root from '../components/Root';
import { EGO_JWT_KEY, INTERNAL_PATHS } from '../global/utils/constants';
import { PageWithConfig } from '../global/utils/pages/types';
import getInternalLink from '../global/utils/getInternalLink';
import { isValidJwt } from '../global/utils/egoTokenUtils';
import { getConfig } from '../global/config';
import { SessionProvider } from 'next-auth/react';

const DMSApp = ({
  Component,
  pageProps,
  ctx,
  session,
  providers
}: {
  Component: PageWithConfig;
  pageProps: { [k: string]: any };
  ctx: any;
  session: any;
  providers: any;
}): ReactElement => {
  const [initialToken, setInitialToken] = useState<string>();
  const { NEXT_PUBLIC_AUTH_PROVIDER } = getConfig();

  useEffect(() => {

    if(NEXT_PUBLIC_AUTH_PROVIDER === 'ego'){
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
    } else if (NEXT_PUBLIC_AUTH_PROVIDER === 'keycloak'){
      if(!session && !Component.isPublic) {
          Router.push({
            pathname: getInternalLink({ path: INTERNAL_PATHS.LOGIN }),
            query: { session_expired: true },
          });
      }
    }
  }, [Component.isPublic, session]);

  return (
    <SessionProvider session={session}>
      <Root pageContext={ctx} egoJwt={initialToken}>
        <Component {...pageProps} />
      </Root>
    </SessionProvider>
  );
};

DMSApp.getInitialProps = async ({ ctx, Component }: AppContext & { Component: PageWithConfig }) => {
  const pageProps = await Component.getInitialProps({ ...ctx });
  const session = await getSession(ctx)

  return {
    ctx: {
      pathname: ctx.pathname,
      query: ctx.query,
      asPath: ctx.asPath,
    },
    pageProps,
    session
  };
};

export default DMSApp;
