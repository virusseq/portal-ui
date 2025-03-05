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
import cx from 'classnames';
import { useRouter } from 'next/router';
import { createRef, ReactElement, useEffect } from 'react';

import { InternalLink } from '#components/Link';
import useTrackingContext from '#global/hooks/useTrackingContext';
import { INTERNAL_PATHS } from '#global/utils/constants';
import defaultTheme from '#virusseq/theme';

import Dropdown from './Dropdown';
import { linkStyles, StyledLink, StyledListLink } from './styles';

/**
 * Portal ref of navBar. There is only one navBar in entire pagelayout.
 */
export const navBarRef = createRef<HTMLDivElement>();

const NavBar = (): ReactElement => {
	const { logEvent } = useTrackingContext();
	const router = useRouter();
	const theme: typeof defaultTheme = useTheme();

	useEffect(() => {
		logEvent({
			category: 'Page',
			action: 'VirusSeq Landing Page visited',
		});
	}, [logEvent]);

	return (
		<div
			ref={navBarRef}
			css={css`
				display: flex;
				justify-content: flex-start;
				height: ${theme.dimensions.navbar.height}px;
				background: ${theme.colors.primary} url(/images/navbar-bg.png) no-repeat;
				background-size: 281px;
				${theme.shadow.default};
				position: sticky;
				top: 0;
				left: 0;
				z-index: 1;
				width: 100%;
			`}
		>
			<div
				css={css`
					display: flex;
					align-items: center;
					margin-left: 50px;
					margin-right: 70px;
				`}
			>
				<img src="/images/navbar-logo.png" alt="VirusSeq logo" width="182" />
			</div>

			<div
				css={css`
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 100%;
				`}
			>
				<div
					css={css`
						display: flex;
						align-items: center;
						height: 100%;
						width: 100%;
					`}
				>
					<Dropdown
						css={linkStyles}
						data={[
							<InternalLink path={INTERNAL_PATHS.CLINICAL_EXPLORATION}>
								<StyledListLink
									className={cx({
										active: router.asPath.startsWith(INTERNAL_PATHS.CLINICAL_EXPLORATION),
									})}
								>
									Clinical cases
								</StyledListLink>
							</InternalLink>,
							<InternalLink path={INTERNAL_PATHS.ENVIRONMENTAL_EXPLORATION}>
								<StyledListLink
									className={cx({
										active: router.asPath.startsWith(INTERNAL_PATHS.ENVIRONMENTAL_EXPLORATION),
									})}
								>
									Environmental
								</StyledListLink>
							</InternalLink>,
						]}
						label="Explore Data"
						urls={[INTERNAL_PATHS.VISUALIZATION]}
					/>

					<Dropdown
						css={linkStyles}
						data={[
							<InternalLink path={INTERNAL_PATHS.ABOUT_ANALYSIS_TOOLS}>
								<StyledListLink
									className={cx({
										active: router.asPath.startsWith(INTERNAL_PATHS.ABOUT_ANALYSIS_TOOLS),
									})}
								>
									About the tools
								</StyledListLink>
							</InternalLink>,
							<InternalLink path={INTERNAL_PATHS.VISUALIZATION}>
								<StyledListLink
									className={cx({ active: router.asPath.startsWith(INTERNAL_PATHS.VISUALIZATION) })}
								>
									CoVizu
								</StyledListLink>
							</InternalLink>,
							<StyledListLink
								href="https://covidmvp.cidgoh.ca/"
								rel="noopener noreferrer"
								target="_blank"
							>
								Covid-MVP
							</StyledListLink>,
							<StyledListLink
								href="https://viral.ai/collections/virusseq/overview"
								rel="noopener noreferrer"
								target="_blank"
							>
								ViralAI
							</StyledListLink>,
							<StyledListLink
								href="https://covarr-net.github.io/duotang/duotang.html"
								rel="noopener noreferrer"
								target="_blank"
							>
								CoVarrNet-Duotang
							</StyledListLink>,
						]}
						label="Analysis Tools"
						urls={[INTERNAL_PATHS.VISUALIZATION]}
					/>

					<Dropdown
						css={linkStyles}
						data={[
							<InternalLink path={INTERNAL_PATHS.TEAM}>
								<StyledListLink
									className={cx({ active: router.asPath.startsWith(INTERNAL_PATHS.TEAM) })}
								>
									Meet the Team
								</StyledListLink>
							</InternalLink>,
							<InternalLink path={INTERNAL_PATHS.ACKNOWLEDGEMENTS}>
								<StyledListLink
									className={cx({
										active: router.asPath.startsWith(INTERNAL_PATHS.ACKNOWLEDGEMENTS),
									})}
								>
									Acknowledgements
								</StyledListLink>
							</InternalLink>,
						]}
						label="About"
						urls={[INTERNAL_PATHS.ACKNOWLEDGEMENTS, INTERNAL_PATHS.TEAM]}
					/>

					<InternalLink path={INTERNAL_PATHS.RELEASES}>
						<StyledLink
							className={cx({ active: router.asPath.startsWith(INTERNAL_PATHS.RELEASES) })}
						>
							Data Releases
						</StyledLink>
					</InternalLink>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
