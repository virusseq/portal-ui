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

import React from 'react';
import Router from 'next/router';

import { getConfig } from '../../global/config';
// import Login from '../../components/pages/login';
import Error404 from '../../components/pages/404';
import { ROOT_PATH } from '../../global/utils/constants';
import getInternalLink from '../../global/utils/getInternalLink';
import { createPage } from '../../global/utils/pages';
import useAuthContext from '../../global/hooks/useAuthContext';

const LoginPage = createPage({
	getInitialProps: async () => {
		// console.log('nada');
	},
	isPublic: true,
})(() => {
	return <Error404 />;
	// const { NEXT_PUBLIC_ENABLE_LOGIN, NEXT_PUBLIC_ENABLE_REGISTRATION } = getConfig();
	// const { token } = useAuthContext();

	// return token || // logged in, so it shouldn't give you a login page
	// 	!(NEXT_PUBLIC_ENABLE_LOGIN || NEXT_PUBLIC_ENABLE_REGISTRATION) ? (
	// 	(Router.push({
	// 		pathname: getInternalLink({ path: ROOT_PATH }),
	// 	}),
	// 	(<></>)) // shows nothing, while passing TypeScript validations
	// ) : (
	// 	<Error404 />
	// );
});

export default LoginPage;
