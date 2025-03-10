/*
 *
 * Copyright (c) 2025 The Ontario Institute for Cancer Research. All rights reserved
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
import { format, isValid } from 'date-fns';
import { ReactElement, useEffect, useState } from 'react';

import Loader from '#components/Loader';
import defaultTheme from '#components/theme';
import { CoronaVirus, CrossHairs } from '#components/theme/icons';
import { getConfig } from '#global/config';
import useReleaseData from '#global/hooks/environmental/useReleaseData';
import { ReleaseDataProps } from '#global/hooks/environmental/useReleaseData/types';

const ReleaseData = (): ReactElement => {
	const theme: typeof defaultTheme = useTheme();
	const { NEXT_PUBLIC_RELEASE_DATE } = getConfig();
	const [releaseData, loadingArrangerData] = useReleaseData();

	const [releaseDataProps] = useState<ReleaseDataProps>();

	const { genomesCount = { value: 0, type: 'APPROXIMATE' }, organizationCount = 0 } = releaseData;

	// either we're waiting on arranger or singularity data
	const showLoader = releaseDataProps === undefined && loadingArrangerData;

	const releaseDate =
		!!NEXT_PUBLIC_RELEASE_DATE &&
		(Number.isNaN(Number(NEXT_PUBLIC_RELEASE_DATE))
			? new Date(NEXT_PUBLIC_RELEASE_DATE)
			: Number(NEXT_PUBLIC_RELEASE_DATE) && new Date(Number(NEXT_PUBLIC_RELEASE_DATE)));

	return (
		<main
			css={css`
				display: flex;
				// flex-wrap: wrap;
			`}
		>
			<aside
				css={css`
					margin-right: 30px;

					/* @media (max-width: 639px) { */
					width: 100%;
					/* } */
				`}
			>
				{releaseDate && isValid(releaseDate) && (
					<header
						css={css`
							& > * {
								margin: 0;
							}
						`}
					>
						<h3
							css={css`
								font-size: 17px;
								font-weight: normal;
							`}
						>
							As of {format(releaseDate, 'MMMM dd, yyyy')}
						</h3>
					</header>
				)}

				<ul
					css={css`
						border: 1px solid ${theme.colors.primary_light};
						display: flex;
						/* flex-direction: column; */
						margin-bottom: 0;
						padding: 10px;
						width: 100%;
						justify-content: space-around;

						li {
							align-items: center;
							display: flex;
							padding-left: 25px;
							position: relative;
							white-space: nowrap;

							/* &:not(:first-of-type) {
                margin-top: 10px;
              } */
						}

						svg {
							left: 0;
							position: absolute;
						}

						span {
							font-weight: bold;
							margin-right: 5px;
						}
					`}
				>
					{showLoader ? (
						<Loader size={'11px'} />
					) : (
						<>
							<li>
								<CoronaVirus />
								<span>{genomesCount?.type === 'APPROXIMATE' ? '~' : ''}</span>
								<span>{genomesCount?.value?.toLocaleString('en-CA')}</span>Viral Genomes
							</li>
							<li>
								<CrossHairs
									style={css`
										margin-left: -1px;
									`}
								/>
								<span>{organizationCount?.toLocaleString('en-CA')}</span>Provinces
							</li>
						</>
					)}
				</ul>
			</aside>
		</main>
	);
};

export default ReleaseData;
