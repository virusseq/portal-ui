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

import { css, useTheme } from '@emotion/react';
import Router from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

import { InternalLink as Link, StyledLinkAsButton } from '@/components/Link';
import defaultTheme from '@/components/theme';
import useAuthContext from '@/global/hooks/useAuthContext';
import { INTERNAL_PATHS } from '@/global/utils/constants';
import getInternalLink from '@/global/utils/getInternalLink';

import PreviousClinicalSubmissions from './Clinical/PreviousSubmissions';
import PreviousEnvironmentalSubmissions from './Environmental/PreviousSubmissions';

const PageContent = (): ReactElement => {
	const theme: typeof defaultTheme = useTheme();
	const [clinicalAccess, setClinicalAccess] = useState(false);
	const [environmentalAccess, setEnvironmentalAccess] = useState(false);
	const {
		user,
		userHasWriteScopes,
		userIsCurator,
		userCanSubmitEnvironmentalData,
		userIsEnvironmentalAdmin,
	} = useAuthContext();

	useEffect(() => {
		if (
			userIsCurator !== undefined &&
			userHasWriteScopes !== undefined &&
			userIsEnvironmentalAdmin !== undefined &&
			userCanSubmitEnvironmentalData !== undefined
		) {
			const hasClinicalScopes = !!(userIsCurator || userHasWriteScopes);
			const hasEnvironmentalScopes = !!(userIsEnvironmentalAdmin || userCanSubmitEnvironmentalData);
			if (!hasClinicalScopes && hasEnvironmentalScopes) {
				// user has only environmental submission access
				Router.push(getInternalLink({ path: INTERNAL_PATHS.ENVIRONMENTAL_SUBMISSION }));
			} else if (hasClinicalScopes && !hasEnvironmentalScopes) {
				// user has only clinical submission access
				Router.push(getInternalLink({ path: INTERNAL_PATHS.CLINICAL_SUBMISSION }));
			} else {
				// user has both clinical and environmental access
				setClinicalAccess(hasClinicalScopes);
				setEnvironmentalAccess(hasEnvironmentalScopes);
			}
		}
	}, [
		userIsCurator,
		userHasWriteScopes,
		userIsEnvironmentalAdmin,
		userCanSubmitEnvironmentalData,
		user,
	]);

	return (
		<main
			css={css`
				padding: 40px 30px calc(${theme.dimensions.footer.height}px + 30px);
				position: relative;

				.view-title {
					color: ${theme.colors.primary};
					font-weight: normal;
					margin: 0;
				}
			`}
		>
			<h1 className="view-title">Your Data Submissions</h1>

			{clinicalAccess && (
				<section
					css={css`
						margin: 2rem 0;
						position: relative;
					`}
				>
					<h2 className="view-title">Clinical Case Submissions</h2>

					<Link path={INTERNAL_PATHS.CLINICAL_SUBMISSION}>
						<StyledLinkAsButton
							css={css`
								${theme.typography.button};
								background-color: ${theme.colors.primary_dark};
								border-color: ${theme.colors.primary_dark};
								line-height: 20px;
								padding: 8px 20px;
								position: absolute;
								right: 0;
								top: 0;
								width: fit-content;
							`}
						>
							+ Upload Clinical Cases
						</StyledLinkAsButton>
					</Link>

					<PreviousClinicalSubmissions />
				</section>
			)}

			{environmentalAccess && (
				<section
					css={css`
						position: relative;
					`}
				>
					<h2 className="view-title">Environmental Data Submissions</h2>

					<Link path={INTERNAL_PATHS.ENVIRONMENTAL_SUBMISSION}>
						<StyledLinkAsButton
							css={css`
								${theme.typography.button};
								background-color: ${theme.colors.primary_dark};
								border-color: ${theme.colors.primary_dark};
								line-height: 20px;
								padding: 8px 20px;
								position: absolute;
								right: 0;
								top: 0;
								width: fit-content;
							`}
						>
							+ Upload Environmental Data
						</StyledLinkAsButton>
					</Link>

					<PreviousEnvironmentalSubmissions />
				</section>
			)}
		</main>
	);
};

export default PageContent;
