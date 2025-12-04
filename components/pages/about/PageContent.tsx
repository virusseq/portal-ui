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

import { css } from '@emotion/react';
import { ReactElement, useMemo } from 'react';

import { getConfig } from '#global/config.ts';

import AnnouncementsPanel, { isAnnouncementsArray } from './Announcements/index.ts';
import type { AnnouncementObj } from './Announcements/types.ts';
import CovidCloudPane from './CovidCloudPane.tsx';
import HeroBanner from './HeroBanner.tsx';
import Impact from './Impact.tsx';
import WhySequence from './WhySequence.tsx';

const PageContent = (): ReactElement => {
	const { NEXT_PUBLIC_ENABLE_NEWS, NEXT_PUBLIC_NEWS_AND_ANNOUNCEMENTS } = getConfig();

	const announcementsList: AnnouncementObj[] = useMemo(() => {
		if (NEXT_PUBLIC_ENABLE_NEWS) {
			try {
				const parsedAnnouncementsList = JSON.parse(NEXT_PUBLIC_NEWS_AND_ANNOUNCEMENTS);
				const curatedList = parsedAnnouncementsList.slice(0, 5);

				if (isAnnouncementsArray(curatedList)) {
					return curatedList;
				}

				throw new Error('Announcement types are invalid!');
			} catch (err) {
				console.error('Failed to parse the announcements!', err);
			}
		}

		return [];
	}, [NEXT_PUBLIC_ENABLE_NEWS, NEXT_PUBLIC_NEWS_AND_ANNOUNCEMENTS]);

	const hasNews = announcementsList.length > 0;

	return (
		<main
			css={() => css`
				align-items: center;
				display: flex;
				flex-direction: column;
			`}
		>
			<HeroBanner />

			<article
				css={css`
					box-sizing: border-box;
					display: flex;
					margin-top: 30px;
					max-width: 1550px;
					padding: 0 50px;
					width: 100%;

					@media (max-width: 1236px) {
						flex-wrap: wrap;
					}
				`}
			>
				<div
					css={[
						css`
							display: flex;
						`,
						hasNews
							? css`
									flex-wrap: wrap;
									& > * {
										max-width: 760px;
									}
								`
							: css`
									& > :first-of-type {
										margin-right: 3rem;
									}
								`,
					]}
				>
					<Impact />
					<WhySequence />
				</div>

				{hasNews && (
					<AnnouncementsPanel
						css={css`
							margin: 25px 0;
							width: 100%;

							@media (min-width: 1237px) {
								margin-left: 25px;
								max-width: calc(100% - 760px);
							}
						`}
						announcements={announcementsList}
					/>
				)}
			</article>

			<CovidCloudPane />
		</main>
	);
};

export default PageContent;
