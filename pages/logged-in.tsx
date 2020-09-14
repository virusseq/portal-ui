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

import React, { useEffect } from 'react';
import urlJoin from 'url-join';
import { css } from '@emotion/core';

import { getConfig } from '../global/config';
import { createPage } from '../global/utils/pages';
import { EGO_JWT_KEY, EXPLORER_PATH, LOGIN_PATH } from '../global/utils/constants';
import Router from 'next/router';
import { isValidJwt } from '../global/utils/egoTokenUtils';
import PageLayout from '../components/PageLayout';
import getInternalLink from '../global/utils/getInternalLink';
import Loader from '../components/Loader';

const fetchEgoToken = () => {
  const { NEXT_PUBLIC_EGO_API_ROOT, NEXT_PUBLIC_EGO_CLIENT_ID } = getConfig();
  const egoLoginUrl = urlJoin(
    NEXT_PUBLIC_EGO_API_ROOT,
    `/oauth/ego-token?client_id=${NEXT_PUBLIC_EGO_CLIENT_ID}`,
  );

  fetch(egoLoginUrl, {
    credentials: 'include',
    headers: { accept: '*/*' },
    body: null,
    method: 'POST',
  })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error();
      }
      return res.text();
    })
    .then((jwt) => {
      if (isValidJwt(jwt)) {
        localStorage.setItem(EGO_JWT_KEY, jwt);
        setTimeout(() => Router.push(getInternalLink({ path: EXPLORER_PATH })), 2000);
      } else {
        throw new Error('Invalid jwt, cannot login.');
      }
    })
    .catch((err) => {
      console.warn(err);
      localStorage.removeItem(EGO_JWT_KEY);
      Router.push(getInternalLink({ path: LOGIN_PATH }));
    });
};

const LoginLoaderPage = createPage({
  getInitialProps: async (ctx) => {
    const { egoJwt, asPath, query } = ctx;
    return { egoJwt, query, asPath };
  },
  isPublic: true,
})(() => {
  useEffect(() => {
    fetchEgoToken();
  });

  return (
    <PageLayout>
      <div
        css={(theme) =>
          css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: ${theme.colors.grey_2};
          `
        }
      >
        <Loader />
        <div
          css={(theme) =>
            css`
              margin-top: 2rem;
              color: ${theme.colors.accent};
              ${theme.typography.heading}
            `
          }
        >
          Logging in...
        </div>
      </div>
    </PageLayout>
  );
});

export default LoginLoaderPage;
