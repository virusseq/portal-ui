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

import { useArrangerData } from '@overture-stack/arranger-components';
import { SQONType } from '@overture-stack/arranger-components/dist/DataContext/types';
import { useEffect, useState } from 'react';

import createArrangerFetcher from '#components/utils/arrangerFetcher';
import { getConfig } from '#global/config';

import { Count, type ReleaseEnvironmentalDataProps } from './types';

import { recordsbyProvince, roundToSignificantDigits } from './index';

const {
	NEXT_PUBLIC_ARRANGER_ENVIRONMENTAL_CARDINALITY_PRECISION_THRESHOLD,
	NEXT_PUBLIC_ARRANGER_ENVIRONMENTAL_MAX_BUCKET_COUNTS,
	NEXT_PUBLIC_ARRANGER_ENVIRONMENTAL_API,
} = getConfig();

const RELEASE_DATA_QUERY = `
query releaseEnvironmentalDataQuery ($sqon: JSON) {
    analysis {
    aggregations(
      filters: $sqon,
      include_missing: false,
      aggregations_filter_themselves: true
    ){
      data__geo_loc_name_state_province_territory {
        buckets {
          doc_count
          key
        }
      }
      data__specimen_collector_sample_id {
        cardinality (precision_threshold: ${NEXT_PUBLIC_ARRANGER_ENVIRONMENTAL_CARDINALITY_PRECISION_THRESHOLD})
      }
      organization {
        bucket_count
      }
    }
  }
  }
`;

const GENOMES_COUNT_QUERY = `
query genomesCount ($sqon: JSON) {
    analysis {
      aggregations(
        filters: $sqon,
        include_missing: false,
        aggregations_filter_themselves: true
      ){
        data__specimen_collector_sample_id {
          bucket_count
        }
      }
    }
  }
`;

export const arrangerFetcher = createArrangerFetcher({
	ARRANGER_API: NEXT_PUBLIC_ARRANGER_ENVIRONMENTAL_API,
});

export const fetchReleaseData = async (sqon?: SQONType) => {
	return arrangerFetcher({
		body: {
			query: RELEASE_DATA_QUERY,
			variables: { sqon },
		},
		endpointTag: 'FetchEnvironmentalReleaseData',
	}).then(({ data: { analysis: { aggregations = {} } = {} } }) => {
		// aggregations will be null if there's an error in the response
		if (aggregations) {
			const {
				data__geo_loc_name_state_province_territory: { buckets: provinces = [] } = {},
				data__specimen_collector_sample_id: { cardinality: genomesCardinality = 0 } = {},
				organization: { bucket_count: organizationCount = 0 } = {},
			} = aggregations;

			const filesByVariant = recordsbyProvince(provinces);

			const genomesCount: Count = {
				value: roundToSignificantDigits(genomesCardinality, 2),
				type: 'APPROXIMATE',
			};

			const siteCount = provinces.length;

			return {
				filesByVariant,
				organizationCount,
				genomesCount,
				siteCount,
			};
		}
	});
};

const tuneGenomesAggs = async (sqon?: SQONType, currentReleaseData?: ReleaseEnvironmentalDataProps) => {
	const currentGenomesValue = currentReleaseData?.genomesCount?.value;

	if (currentGenomesValue && currentGenomesValue >= NEXT_PUBLIC_ARRANGER_ENVIRONMENTAL_MAX_BUCKET_COUNTS) {
		console.error('genomesValue is too high to do a bucket_count query');
		return Promise.resolve(currentReleaseData);
	}

	return arrangerFetcher({
		body: {
			query: GENOMES_COUNT_QUERY,
			variables: { sqon },
		},
		endpointTag: 'TuneGenomesAggs',
	}).then(({ data: { analysis: { aggregations = {} } = {} } }) => {
		if (aggregations && currentReleaseData?.genomesCount) {
			const { data__specimen_collector_sample_id: { bucket_count: genomesCount = 0 } = {} } = aggregations;

			currentReleaseData.genomesCount.value = genomesCount;
			currentReleaseData.genomesCount.type = 'EXACT';
		}
		return { ...currentReleaseData };
	});
};

const useReleaseData = (): [ReleaseEnvironmentalDataProps, boolean] => {
	const { sqon } = useArrangerData();
	const [releaseData, setReleaseData] = useState<ReleaseEnvironmentalDataProps>();
	const [isFetchingData, setIsFetchingData] = useState(true);

	useEffect(() => {
		if (!(isFetchingData && releaseData)) {
			setIsFetchingData(true);
			fetchReleaseData(sqon)
				.then((data) => tuneGenomesAggs(sqon, data))
				.then((data) => setReleaseData(data))
				.catch(async (err) => {
					console.warn(err);
				})
				.finally(() => {
					setIsFetchingData(false);
				});
		}
	}, [sqon]);

	return [{ ...releaseData }, isFetchingData];
};

export default useReleaseData;
