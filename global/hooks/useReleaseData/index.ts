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

import { useState, useEffect } from 'react';
import { useArrangerData } from '@overture-stack/arranger-components';
import { SQONType } from '@overture-stack/arranger-components/dist/DataContext/types';

import { arrangerFetcher } from '@/components/pages/explorer/RepoTable/helper';
import { getProvince } from '@/global/utils/constants';
import formatFileSize from '@/global/utils/formatFileSize';
import { getConfig } from '@/global/config';

import { Count, FilesByVariantType, ReleaseDataProps } from './types';

const {
	NEXT_PUBLIC_ARRANGER_SEQUENCES_CARDINALITY_PRECISION_THRESHOLD,
	NEXT_PUBLIC_ARRANGER_SEQUENCES_MAX_BUCKET_COUNTS,
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
      donors__specimens__samples__sample_id {
        cardinality (precision_threshold: ${NEXT_PUBLIC_ARRANGER_SEQUENCES_CARDINALITY_PRECISION_THRESHOLD})
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
        donors__specimens__samples__sample_id {
          bucket_count
        }
      }
    }
  }
`;

const fetchArrangerData = ({
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

function roundToSignificantDigits(a: number, sigDigs: number) {
	const digitsToKeep = a.toString().length - sigDigs;
	return Math.floor(a / Math.pow(10, digitsToKeep)) * Math.pow(10, digitsToKeep);
}

const fetchReleaseData = async (sqon?: SQONType) => {
	return fetchArrangerData({
		endpointTag: 'FetchReleaseData',
		query: RELEASE_DATA_QUERY,
		sqon,
	}).then(({ data: { file: { aggregations = {} } = {} } }) => {
		// aggregations will be null if there's an error in the response
		if (aggregations) {
			const {
				analysis__host__host_gender: { buckets: hostGenders = [] } = {},
				analysis__sample_collection__geo_loc_province: { buckets: provinces = [] } = {},
				donors__specimens__samples__sample_id: { cardinality: genomesCardinality = 0 } = {},
				file__size: { stats: { count: fileCount = 0, sum: fileSize = 0 } = {} } = {},
				study_id: { bucket_count: studyCount = 0 } = {},
			} = aggregations;

			const [value, unit] = formatFileSize(fileSize).split(' ');
			const filesByVariant: FilesByVariantType[] = provinces
				.map(({ doc_count, key }: { doc_count: number; key: string }) => {
					const { abbreviation, name } = getProvince({ long: key });

					return {
						abbreviation,
						count: doc_count,
						name,
					};
				})
				.filter((fv: FilesByVariantType) => fv.abbreviation !== '');

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

const tuneGenomesAggs = async (sqon?: SQONType, currentReleaseData?: ReleaseDataProps) => {
	const currentGenomesValue = currentReleaseData?.genomesCount?.value;

	if (
		currentGenomesValue &&
		currentGenomesValue >= NEXT_PUBLIC_ARRANGER_SEQUENCES_MAX_BUCKET_COUNTS
	) {
		console.error('genomesValue is too high to do a bucket_count query');
		return Promise.resolve(currentReleaseData);
	}

	return fetchArrangerData({
		endpointTag: 'TuneGenomesAggs',
		query: GENOMES_COUNT_QUERY,
		sqon,
	}).then(({ data: { file: { aggregations = {} } = {} } }) => {
		if (aggregations && currentReleaseData?.genomesCount) {
			const { donors__specimens__samples__sample_id: { bucket_count: genomnesCount = 0 } = {} } =
				aggregations;

			currentReleaseData.genomesCount.value = genomnesCount;
			currentReleaseData.genomesCount.type = 'EXACT';
		}
		return { ...currentReleaseData };
	});
};

const useReleaseData = (): [ReleaseDataProps, boolean] => {
	const { sqon } = useArrangerData();
	const [releaseData, setReleaseData] = useState<ReleaseDataProps>();
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
