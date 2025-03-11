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

import { SQONType } from '@overture-stack/arranger-components/dist/DataContext/types';

import { arrangerFetcher } from '#components/pages/clinical/RepoTable/helper';
import { getProvince } from '#global/utils/constants';

import { ProvinceStats } from './types';

export const fetchArrangerData = ({
	endpointTag,
	query,
	sqon,
}: {
	endpointTag?: string;
	query: string;
	sqon?: SQONType;
}) => {
	return arrangerFetcher({
		body: {
			query: query,
			variables: { sqon },
		},
		endpointTag,
	});
};

export const recordsbyProvince = (
	provinces: Array<{ doc_count: number; key: string }>,
): ProvinceStats[] =>
	provinces
		.map(({ doc_count, key }) => {
			const { abbreviation, name } = getProvince({ long: key });

			return {
				abbreviation,
				count: doc_count,
				name,
			};
		})
		.filter((fv: ProvinceStats) => fv.abbreviation !== '');

export const roundToSignificantDigits = (a: number, sigDigs: number) => {
	const digitsToKeep = a.toString().length - sigDigs;
	return Math.floor(a / Math.pow(10, digitsToKeep)) * Math.pow(10, digitsToKeep);
};
