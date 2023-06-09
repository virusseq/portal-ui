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
import { css, useTheme } from '@emotion/react';

import useAuthContext from '../../../global/hooks/useAuthContext';
import defaultTheme from '../../theme';

const StudyAccess = (): ReactElement | null => {
	const theme: typeof defaultTheme = useTheme();
	const { user, userHasWriteScopes, userCanSubmitDataForAllStudy } = useAuthContext();
	const [effectiveScopes, setEffectiveScopes] = useState<string[] | null>(null);

	useEffect(() => {
		if (userCanSubmitDataForAllStudy) {
			setEffectiveScopes(['All Studies']);
			return;
		}
		userHasWriteScopes &&
			!effectiveScopes &&
			setEffectiveScopes(
				(user?.scope || [])
					.filter((scope) => scope.includes('WRITE'))
					.map((scope) => scope.replace('.WRITE', '')),
			);
	}, [userHasWriteScopes, userCanSubmitDataForAllStudy]);

	return userHasWriteScopes && effectiveScopes && effectiveScopes.length > 0 ? (
		<div
			css={css`
				border-top: 1px solid ${theme.colors.grey_3};
				margin-top: 20px;
			`}
		>
			<h2
				css={css`
					${theme.typography.regular};
					font-size: 24px;
					line-height: 40px;
					color: ${theme.colors.primary};
				`}
			>
				Study Access
			</h2>

			<p>You are authorized to submit data for the following studies:</p>
			{userCanSubmitDataForAllStudy ? (
				<b>All Studies</b>
			) : (
				<ul
					css={css`
						${theme.typography.subheading};
						font-weight: normal;
						color: ${theme.colors.accent_dark};
						margin-bottom: 1rem;
					`}
				>
					{effectiveScopes?.map((scope) => (
						<li key={scope}>{scope}</li>
					))}
				</ul>
			)}
		</div>
	) : null;
};

export default StudyAccess;
