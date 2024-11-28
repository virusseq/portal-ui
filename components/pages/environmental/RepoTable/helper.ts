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

import { SQONType } from '@overture-stack/arranger-components/dist/DataContext/types';
import SQON from '@overture-stack/sqon-builder';
import { isEmpty } from 'lodash';

import createArrangerFetcher from '@/components/utils/arrangerFetcher';
import { getConfig } from '@/global/config';

const { NEXT_PUBLIC_ARRANGER_ENVIRONMENTAL_API } = getConfig();

export const arrangerFetcher = createArrangerFetcher({
	ARRANGER_API: NEXT_PUBLIC_ARRANGER_ENVIRONMENTAL_API,
});

const saveSetMutation = `mutation ($sqon: JSON!)  {
	saveSet(
		sqon: $sqon,
		type: file,
		path: "name"
	) {
		setId
	}
}`;

export const saveSet = (sqon: SQONType): Promise<string> => {
	return arrangerFetcher({
		body: {
			query: saveSetMutation,
			variables: { sqon },
		},
	})
		.then(
			({
				data: {
					saveSet: { setId },
				},
			}) => {
				return setId;
			},
		)
		.catch((err: any) => {
			console.warn(err);
			Promise.reject(err);
		}) as Promise<string>;
};

export function buildSqonWithObjectIds(currentSqon: SQONType, objectIds: string[]): SQONType {
	const objectsSqon = objectIds && objectIds.length > 0 ? SQON.in('object_id', objectIds) : null;

	if (!isEmpty(currentSqon) && !isEmpty(objectsSqon)) {
		return currentSqon.and(objectsSqon);
	}

	if (isEmpty(currentSqon) && !isEmpty(objectsSqon)) {
		return objectsSqon;
	}

	if (!isEmpty(currentSqon) && isEmpty(objectsSqon)) {
		return currentSqon;
	}

	return null;
}
