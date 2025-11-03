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
import { useArrangerData } from '@overture-stack/arranger-components';
import { SQONType } from '@overture-stack/arranger-components/dist/DataContext/types';
import stringify from 'fast-json-stable-stringify';
import { isEqual } from 'lodash';
import { ReactElement, useEffect, useState } from 'react';

import useUrlParamState from '#global/hooks/useUrlParamsState';

import DataAnalysis from './DataAnalysis';
import Facets from './Facets';
import QueryBar from './QueryBar';
import RepoTable from './RepoTable';

// const defaultFilters = {
//   op: 'and',
//   content: [],
// };

const PageContent = (): ReactElement => {
	const theme = useTheme();
	const { sqon, setSQON } = useArrangerData({ callerName: 'Explorer-PageContent' });
	const [firstRender, setFirstRender] = useState<boolean>(true);
	const [currentFilters, setCurrentFilters] = useUrlParamState<SQONType | null>('filters', null, {
		prepare: (v) => v.replace('"field"', '"fieldName"'),
		deSerialize: (v) => {
			return v ? JSON.parse(v) : null;
		},
		serialize: (v) => (v ? stringify(v) : ''),
	});

	// // TODO: abstract these effects into an Arranger integration
	useEffect(() => {
		if (firstRender) {
			currentFilters && setSQON(currentFilters);
			setFirstRender(false);
		}
	}, [currentFilters, firstRender, setSQON]);

	useEffect(() => {
		firstRender || isEqual(sqon, currentFilters) || setCurrentFilters(sqon);
	}, [currentFilters, firstRender, setCurrentFilters, sqon]);

	return (
		<div
			css={css`
				flex: 1;
				width: 100vw;
			`}
		>
			<div
				css={css`
					display: flex;
					flex-direction: row;
					margin-left: 0;
				`}
			>
				<div
					css={css`
						flex: 0 0 ${theme.dimensions.facets.width}px;
						flex-direction: column;
						background-color: ${theme.colors.white};
						z-index: 1;
						${theme.shadow.right};
						height: calc(100vh - ${theme.dimensions.footer.height + theme.dimensions.navbar.height}px);
						overflow-y: scroll;
					`}
				>
					<Facets />
				</div>
				<div
					css={css`
						display: flex;
						flex-direction: column;
						width: 100%;
						height: calc(100vh - ${theme.dimensions.footer.height + theme.dimensions.navbar.height}px);
						overflow-y: scroll;
					`}
				>
					<div
						css={css`
							flex: 8.5;
							margin: 0 15px 0 15px;
							max-width: calc(100vw - ${theme.dimensions.facets.width + 10}px);
						`}
					>
						<QueryBar />
						<DataAnalysis />
						<RepoTable />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PageContent;
