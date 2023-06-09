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

import { ReactElement } from 'react';
import { Column } from 'react-table';
import { format } from 'date-fns';
import { css } from '@emotion/react';

import getInternalLink from '../../../../global/utils/getInternalLink';
import { numberSort, uuidSort } from '../../../GenericTable/helpers';
import StyledLink from '../../../Link';

const columnData: Column<Record<string, unknown>>[] = [
	{
		accessor: 'submissionId',
		Cell: ({ value }: { value: unknown }) => (
			<StyledLink href={getInternalLink({ path: `/submission/${value}` })}>
				{value as string}
			</StyledLink>
		),
		Header: 'Submission ID',
		sortType: uuidSort,
	},
	{
		accessor: 'studyIds',
		Cell: ({ value }: { value: unknown }) =>
			value ? (
				<ul
					css={css`
						margin: 0;
						padding-left: 15px;
					`}
				>
					{(value as string[]).map((id) => (
						<li key={id}>{id}</li>
					))}
				</ul>
			) : null,
		Header: 'Study IDs',
	},
	{
		accessor: 'createdAt',
		Cell: ({ value }: { value: unknown }) =>
			format(new Date(value as number), 'yyyy-MM-dd') as unknown as ReactElement,
		Header: 'Submission Date',
		sortType: numberSort,
	},
	{
		accessor: 'totalRecords',
		Header: '# Viral Genomes',
		sortType: numberSort,
	},
];

export default columnData;
