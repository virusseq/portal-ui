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
import formatFileSize from '#global/utils/formatFileSize';

import { Count, type ReleaseClinicalDataProps } from './types';

import { recordsbyProvince, roundToSignificantDigits } from './index';

const {
	NEXT_PUBLIC_ARRANGER_CLINICAL_CARDINALITY_PRECISION_THRESHOLD,
	NEXT_PUBLIC_ARRANGER_CLINICAL_MAX_BUCKET_COUNTS,
	NEXT_PUBLIC_ARRANGER_CLINICAL_API,
} = getConfig();

const RELEASE_DATA_QUERY = `
query releaseDataQuery ($sqon: JSON) {
    file {
    aggregations(
      filters: $sqon,
      include_missing: false,
      aggregations_filter_themselves: true
    ){
      analysis__host__host_gender{
        buckets {
          doc_count
          key
        }
      }
      analysis__sample_collection__geo_loc_province {
        buckets {
          doc_count
          key
        }
      }
      analysis__samples__submitterSampleId {
        cardinality (precision_threshold: ${NEXT_PUBLIC_ARRANGER_CLINICAL_CARDINALITY_PRECISION_THRESHOLD})
      }
      file__size {
        stats {
          count
          sum
        }
      }
      study_id {
        bucket_count
      }
    }
  }
  }
`;

const GENOMES_COUNT_QUERY = `
query genomesCount ($sqon: JSON) {
    file {
      aggregations(
        filters: $sqon,
        include_missing: false,
        aggregations_filter_themselves: true
      ){
        analysis__samples__submitterSampleId {
          bucket_count
        }
      }
    }
  }
`;

export const arrangerFetcher = createArrangerFetcher({
	ARRANGER_API: NEXT_PUBLIC_ARRANGER_CLINICAL_API,
});

const fetchReleaseData = async (sqon?: SQONType) => {
	return arrangerFetcher({
		body: {
			query: RELEASE_DATA_QUERY,
			variables: { sqon },
		},
		endpointTag: 'FetchReleaseData',
	}).then(({ data: { file: { aggregations = {} } = {} } }) => {
		// aggregations will be null if there's an error in the response
		if (aggregations) {
			const {
				analysis__host__host_gender: { buckets: hostGenders = [] } = {},
				analysis__sample_collection__geo_loc_province: { buckets: provinces = [] } = {},
				analysis__samples__submitterSampleId: { cardinality: genomesCardinality = 0 } = {},
				file__size: { stats: { count: fileCount = 0, sum: fileSize = 0 } = {} } = {},
				study_id: { bucket_count: studyCount = 0 } = {},
			} = aggregations;

			const [value, unit] = formatFileSize(fileSize).split(' ');

			const filesByVariant = recordsbyProvince(provinces);
			const genomesCount: Count = {
				value: roundToSignificantDigits(genomesCardinality, 2),
				type: 'APPROXIMATE',
			};

			return {
				fileCount,
				fileSize: {
					unit,
					value,
				},
				filesByVariant,
				hostGenders,
				studyCount,
				genomesCount,
			};
		}
	});
};

const tuneGenomesAggs = async (sqon?: SQONType, currentReleaseData?: ReleaseClinicalDataProps) => {
	const currentGenomesValue = currentReleaseData?.genomesCount?.value;

	if (
		currentGenomesValue &&
		currentGenomesValue >= NEXT_PUBLIC_ARRANGER_CLINICAL_MAX_BUCKET_COUNTS
	) {
		console.error('genomesValue is too high to do a bucket_count query');
		return Promise.resolve(currentReleaseData);
	}

	return arrangerFetcher({
		body: {
			query: GENOMES_COUNT_QUERY,
			variables: { sqon },
		},
		endpointTag: 'TuneGenomesAggs',
	}).then(({ data: { file: { aggregations = {} } = {} } }) => {
		if (aggregations && currentReleaseData?.genomesCount) {
			const { analysis__samples__submitterSampleId: { bucket_count: genomnesCount = 0 } = {} } =
				aggregations;

			currentReleaseData.genomesCount.value = genomnesCount;
			currentReleaseData.genomesCount.type = 'EXACT';
		}
		return { ...currentReleaseData };
	});
};

const useReleaseData = (): [ReleaseClinicalDataProps, boolean] => {
	const { sqon } = useArrangerData();
	const [releaseData, setReleaseData] = useState<ReleaseClinicalDataProps>();
	const [isFetchingData, setIsFetchingData] = useState(true);

	useEffect(() => {
		if (!(isFetchingData && releaseData)) {
			setIsFetchingData(true);
			fetchReleaseData(sqon)
				.then((data) => tuneGenomesAggs(sqon, data))
				.then((data) => {
					setReleaseData(data);
				})
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
