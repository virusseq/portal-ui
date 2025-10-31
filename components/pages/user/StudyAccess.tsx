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

import { css, useTheme } from '@emotion/react';
import { ReactElement, useEffect, useState } from 'react';

import useAuthContext from '#global/hooks/useAuthContext';

const StyledList = ({ children }: { children: React.ReactNode }) => {
	const theme = useTheme();
	return (
		<ul
			css={css`
				${theme.typography.subheading};
				font-weight: normal;
				color: ${theme.colors.accent_dark};
				margin-bottom: 1rem;
			`}
		>
			{children}
		</ul>
	);
};

type StudiesSectionProps = {
	title: string;
	isAdmin: boolean;
	hasAccess: boolean;
	scopes?: string[];
};

const StudiesSection = ({ title, isAdmin, hasAccess, scopes }: StudiesSectionProps) => {
	if (!isAdmin && !hasAccess) return null;

	return (
		<>
			<h3>{title}</h3>
			<StyledList>
				{isAdmin ? (
					<li>
						<b>All studies</b>
					</li>
				) : (
					scopes?.map((scope) => <li key={scope}>{scope}</li>)
				)}
			</StyledList>
		</>
	);
};

const StudyAccess = (): ReactElement | null => {
	const theme = useTheme();
	const {
		userClinicalWriteScopes,
		userIsClinicalAdmin,
		userHasClinicalAccess,
		userIsCurator,
		userIsEnvironmentalAdmin,
		userHasEnvironmentalAccess,
		userEnvironmentalWriteScopes,
	} = useAuthContext();
	const [effectiveEnvironmentalScopes, setEffectiveEnvironmentalScopes] = useState<string[]>([]);
	const [effectiveClinicalScopes, setEffectiveClinicalScopes] = useState<string[]>([]);

	useEffect(() => {
		// Users can be admin for either/both Clinical and Environmental data
		if (userIsClinicalAdmin) {
			setEffectiveClinicalScopes(['All Studies']);
		} else {
			setEffectiveClinicalScopes(userClinicalWriteScopes);
		}
		if (userIsEnvironmentalAdmin) {
			setEffectiveEnvironmentalScopes(['All Studies']);
		} else {
			setEffectiveEnvironmentalScopes(userEnvironmentalWriteScopes);
		}
	}, [
		userIsCurator,
		userClinicalWriteScopes,
		userEnvironmentalWriteScopes,
		userIsClinicalAdmin,
		userIsEnvironmentalAdmin,
	]);

	return userHasClinicalAccess || userHasEnvironmentalAccess ? (
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
			<StudiesSection
				title="Clinical studies"
				isAdmin={!!userIsClinicalAdmin}
				hasAccess={!!userHasClinicalAccess}
				scopes={effectiveClinicalScopes}
			/>

			<StudiesSection
				title="Environmental studies"
				isAdmin={!!userIsEnvironmentalAdmin}
				hasAccess={!!userHasEnvironmentalAccess}
				scopes={effectiveEnvironmentalScopes}
			/>
		</div>
	) : null;
};

export default StudyAccess;
