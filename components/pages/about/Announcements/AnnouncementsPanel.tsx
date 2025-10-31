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
import cx from 'classnames';

import StyledLink from '#components/Link.tsx';

import Announcement from './Announcement.tsx';
import type { AnnouncementObj, AnnouncementPanelProps } from './types.ts';

const AnnouncementsPanel = ({ announcements = [], className, css: customCSS }: AnnouncementPanelProps) => {
	const theme = useTheme();

	return (
		<aside
			className={cx('announcements', className)}
			css={[
				css`
					border: 1px solid ${theme.colors.accent};
					display: flex;
					flex-direction: column;
					flex-shrink: 0;
				`,
				customCSS,
			]}
		>
			<header
				css={css`
					background: ${theme.colors.accent};
					padding: 0.4rem 0.8rem;
				`}
			>
				<h1
					css={css`
						color: ${theme.colors.white};
						font-size: 1.3rem;
						font-weight: normal;
						margin: 0;
					`}
				>
					Latest News
				</h1>
			</header>

			<main
				css={css`
					flex-grow: 1;

					ul {
						list-style: none;
						padding: 0 0.8rem;

						li {
							&:not(:last-of-type) {
								margin-bottom: 0.8rem;
							}

							header {
								margin-right: 0.3rem;
								display: inline-block;
							}
						}
					}
				`}
			>
				<ul>
					{announcements.map((announcement: AnnouncementObj, index: number) => (
						<li key={index}>
							<Announcement {...announcement} />
						</li>
					))}
				</ul>
			</main>

			<footer
				css={css`
					border-top: 1px solid ${theme.colors.grey_3};
					margin: 0.6rem;
					padding: 0.6rem;
					padding-bottom: 0;
				`}
			>
				If you have feature suggestions, feedback, or want to report a bug, please{' '}
				<StyledLink
					href="mailto:imicroseq-dataportal@lists.sfu.ca"
					rel="noopener noreferrer"
					target="_blank"
				>
					contact us
				</StyledLink>
				.
			</footer>
		</aside>
	);
};

export default AnnouncementsPanel;
