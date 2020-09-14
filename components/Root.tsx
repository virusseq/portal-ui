/*
 *
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
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

import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import defaultTheme from './theme';
import Head from './Head';
import { AuthProvider } from '../global/hooks/useAuthContext';
import { PageContext } from '../global/hooks/usePageContext';
import { ClientSideGetInitialPropsContext } from '../global/utils/pages/types';

const Root = ({
  children,
  egoJwt,
  pageContext,
}: {
  children: React.ReactElement;
  egoJwt?: string;
  pageContext: ClientSideGetInitialPropsContext;
}) => {
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
      `}
      </style>
      <Head />
      <AuthProvider egoJwt={egoJwt}>
        <PageContext.Provider value={pageContext}>
          <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
        </PageContext.Provider>
      </AuthProvider>
    </>
  );
};

export default Root;
