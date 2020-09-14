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

import { get } from 'lodash';
import React from 'react';
import ClientError from '../components/ClientError';

import Error403 from '../components/pages/403';
import Error404 from '../components/pages/404';
import Error500 from '../components/pages/500';
import { createPage } from '../global/utils/pages';

export const ERROR_STATUS_KEY = 'statusCode';

const Error = createPage({
  getInitialProps: async ({ query, res, err }) => {
    if (get(err, ERROR_STATUS_KEY) === 403 || get(query, 'error_code') === '403') {
      if (res) {
        res[ERROR_STATUS_KEY] = 403;
      }
    }
    return {
      query,
      [ERROR_STATUS_KEY]: get(res, ERROR_STATUS_KEY) || get(err, ERROR_STATUS_KEY) || null,
    };
  },
  isPublic: true,
})(({ query, ...props }) => {
  const errorCode = props[ERROR_STATUS_KEY];

  switch (errorCode) {
    case 404:
      return <Error404 />;
    case 403:
      return <Error403 query={query} />;
    case 500:
      return <Error500 />;
    default:
      return <ClientError />;
  }
});

export default Error;
