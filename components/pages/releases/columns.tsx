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
import { format } from 'date-fns';
import urlJoin from 'url-join';

import StyledLink from '#components/Link';
import { Download } from '#components/theme/icons';
import { getConfig } from '#global/config';

import { Archive } from './types';

const {
	NEXT_PUBLIC_CHANGELOG_START_SECONDS,
	NEXT_PUBLIC_ENABLE_DOWNLOADS,
	NEXT_PUBLIC_SINGULARITY_API_URL,
} = getConfig();

const ChangeCell = ({ value, row = {} }: { value: number; row: { original?: Archive } }) => {
	const { original } = row;

	return (original?.releaseTimeUntil ?? 0) > NEXT_PUBLIC_CHANGELOG_START_SECONDS ? value : '--';
};

const columns = [
	{
		accessor: 'releaseTimeUntil',
		Header: 'Release Date',
		Cell: ({ value }: { value: number }) => {
			const date = new Date(0);
			date.setUTCSeconds(value);

			return <b>{format(date, 'LLL dd, yyyy h:mm aaaa')}</b>;
		},
	},
	{
		accessor: 'id',
		Header: 'Metadata & Consensus Seq Files',
		Cell: ({ value }: { value: string }) => {
			return (
				<StyledLink
					disabled={!NEXT_PUBLIC_ENABLE_DOWNLOADS}
					onClick={() => {
						if (NEXT_PUBLIC_ENABLE_DOWNLOADS && NEXT_PUBLIC_SINGULARITY_API_URL && value) {
							window.location.assign(
								urlJoin(NEXT_PUBLIC_SINGULARITY_API_URL, 'download', 'archive', value),
							);
						}
					}}
				>
					<div
						css={css`
							display: flex;
							column-gap: 5px;
							align-items: center;
						`}
					>
						<Download />
						<b>Download Dataset</b>
					</div>
				</StyledLink>
			);
		},
		disableSortBy: true,
	},
	{
		accessor: 'totalSubmitted',
		Header: '# Submitted',
		Cell: ChangeCell,
	},
	{
		accessor: 'totalSupressed',
		Header: '# Suppressed',
		Cell: ChangeCell,
	},
	{
		accessor: 'totalUpdated',
		Header: '# Updated',
		Cell: ChangeCell,
	},
	// {
	// 	accessor: 'changeLog',
	// 	Header: 'Change Log Files',
	// 	Cell: ({ row }: { row: { id: string } }) => {
	// 		return (
	// 			<StyledLink
	// 				disabled={!NEXT_PUBLIC_ENABLE_DOWNLOADS}
	// 				onClick={() => {
	// 					console.log('meep', NEXT_PUBLIC_ENABLE_DOWNLOADS, NEXT_PUBLIC_PORTAL_API_URL);
	// 					if (NEXT_PUBLIC_ENABLE_DOWNLOADS && NEXT_PUBLIC_PORTAL_API_URL) {
	// 						download();
	// 						window.location.assign(
	// 							urlJoin(NEXT_PUBLIC_PORTAL_API_URL, 'changelog', 'download', row.id),
	// 						);
	// 					}
	// 				}}
	// 			>
	// 				<div
	// 					css={css`
	// 						display: flex;
	// 						column-gap: 5px;
	// 						align-items: center;
	// 					`}
	// 				>
	// 					<Download />
	// 					<b>Download Log</b>
	// 				</div>
	// 			</StyledLink>
	// 		);
	// 	},
	// 	disableSortBy: true,
	// },
	{
		accessor: 'numOfSamples',
		Header: '# of samples',
	},
];

export default columns;
