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

import { css } from '@emotion/react';
import { format } from 'date-fns';
import { ReactElement } from 'react';
import { Column } from 'react-table';
import urljoin from 'url-join';

import { numberSort, uuidSort } from '#components/GenericTable/helpers';
import StyledLink from '#components/Link';
import getInternalLink from '#global/utils/getInternalLink';

import { EventTypeKey, EventTypeToKey } from '../Details/types';

const getTotalRecordsFromSubmission = (value: any): string => {
	const getRecordsCount = (operation: EventTypeKey): number | undefined => {
		return value?.[operation]?.sample?.recordsCount;
	};

	const insertsCount = getRecordsCount(EventTypeToKey.INSERT);
	const updatesCount = getRecordsCount(EventTypeToKey.UPDATE);
	const deletesCount = getRecordsCount(EventTypeToKey.DELETE);

	let message = '';
	if (insertsCount) {
		message += `${insertsCount}`;
	}

	if (updatesCount || deletesCount) {
		message += `(`;
		if (updatesCount) {
			message += `${updatesCount} updated`;
			if (deletesCount) {
				message += ', ';
			}
		}
		if (deletesCount) {
			message += `${deletesCount} deleted`;
		}
		message += ')';
	}

	return message === '' ? '0' : message;
};

const columnData: Column<Record<string, unknown>>[] = [
	{
		accessor: 'id',
		Cell: ({ value }: { value: unknown }) => (
			<StyledLink
				href={getInternalLink({ path: urljoin('submission', 'environmental', String(value)) })}
			>
				{value as string}
			</StyledLink>
		),
		Header: 'Submission ID',
		sortType: uuidSort,
	},
	{
		accessor: 'organization',
		Cell: ({ value }: { value: unknown }) =>
			value ? (
				<ul
					css={css`
						margin: 0;
						padding-left: 15px;
					`}
				>
					{<li>{value}</li>}
				</ul>
			) : null,
		Header: 'Provinces',
	},
	{
		accessor: 'createdAt',
		Cell: ({ value }: { value: unknown }) =>
			format(new Date(value as number), 'yyyy-MM-dd') as unknown as ReactElement,
		Header: 'Submission Date',
		sortType: numberSort,
	},
	{
		accessor: 'data',
		Header: '# Samples',
		Cell: ({ value }: { value: unknown }) =>
			value ? (
				<ul
					css={css`
						margin: 0;
						padding-left: 15px;
					`}
				>
					{getTotalRecordsFromSubmission(value)}
				</ul>
			) : null,
	},
];

export default columnData;
