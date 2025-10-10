/*
 *
 * Copyright (c) 2024 The Ontario Institute for Cancer Research. All rights reserved
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
import { ReactElement } from 'react';

import useAuthContext from '#global/hooks/useAuthContext';
import { UserWithId } from '#global/types';

const getDisplayName = (user?: UserWithId) => {
	const greeting = 'Hello';

	if (user) {
		if (user.firstName) {
			return `${greeting}, ${user.firstName}`;
		} else if (user.lastName) {
			return `${greeting}, ${user.lastName}`;
		} else if (user.email) {
			return `${greeting}, ${user.email}`;
		}
	}

	return greeting;
};

const CurrentUser = (): ReactElement => {
	const { user } = useAuthContext();
	return (
		<div
			css={css`
				display: flex;
				align-items: center;
				justify-content: center;
			`}
		>
			<span
				css={css`
					padding-left: 5px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					max-width: 142px;
				`}
			>
				{getDisplayName(user)}
			</span>
		</div>
	);
};

export default CurrentUser;
