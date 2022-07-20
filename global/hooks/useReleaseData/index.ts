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

import { useState, useEffect } from 'react';

import createArrangerFetcher from '../../../components/utils/arrangerFetcher';
import { getProvince } from '../../utils/constants';
import formatFileSize from '../../utils/formatFileSize';
import { RepoFiltersType } from '../../types/sqon';
import { Count, FilesByVariantType, ReleaseDataProps } from './types';
import { getConfig } from '../../config';

const {
  NEXT_PUBLIC_ARRANGER_CARDINALITY_PRECISION_THRESHOLD,
  NEXT_PUBLIC_ARRANGER_MAX_BUCKET_COUNTS,
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
        cardinality (precision_threshold: ${NEXT_PUBLIC_ARRANGER_CARDINALITY_PRECISION_THRESHOLD})
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

const arrangerFetcher = createArrangerFetcher({});

const fetchArrangerData = (query: string, sqon?: RepoFiltersType) => {
  return arrangerFetcher({
    body: {
      query: query,
      variables: { sqon },
    },
  });
};

function roundToSignificantDigits(a: number, sigDigs: number) {
  const digitsToKeep = a.toString().length - sigDigs;
  return Math.floor(a / Math.pow(10, digitsToKeep)) * Math.pow(10, digitsToKeep);
}

const fetchReleaseData = async (sqon?: RepoFiltersType) => {
  return fetchArrangerData(RELEASE_DATA_QUERY, sqon).then(
    ({ data: { file: { aggregations = {} } = {} } }) => {
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
    },
  );
};

const tuneGenomesAggs = async (sqon?: RepoFiltersType, currentReleaseData?: ReleaseDataProps) => {
  const currentGenomesValue = currentReleaseData?.genomesCount?.value;
  console.log(NEXT_PUBLIC_ARRANGER_MAX_BUCKET_COUNTS);
  console.log(currentGenomesValue);
  if (currentGenomesValue && currentGenomesValue >= NEXT_PUBLIC_ARRANGER_MAX_BUCKET_COUNTS) {
    // genomesValue is too high to do a bucket_count query so return
    return Promise.resolve(currentReleaseData);
  }
  return fetchArrangerData(GENOMES_COUNT_QUERY, sqon).then(
    ({ data: { file: { aggregations = {} } = {} } }) => {
      if (aggregations && currentReleaseData?.genomesCount) {
        const {
          donors__specimens__samples__sample_id: { bucket_count: genomnesCount = 0 } = {},
        } = aggregations;

        currentReleaseData.genomesCount.value = genomnesCount;
        currentReleaseData.genomesCount.type = 'EXACT';
      }
      return { ...currentReleaseData };
    },
  );
};

const useReleaseData = (sqon?: RepoFiltersType): [ReleaseDataProps, boolean] => {
  const [releaseData, setReleaseData] = useState<ReleaseDataProps>();
  const [isFetchingData, setIsFetchingData] = useState(true);

  useEffect(() => {
    if (!isFetchingData || !releaseData) {
      setIsFetchingData(true);
      fetchReleaseData(sqon)
        .then((data) => tuneGenomesAggs(sqon, data))
        .then((data) => {
          setReleaseData(data);
          setIsFetchingData(false);
        })
        .catch(async (err) => {
          console.warn(err);
          setIsFetchingData(false);
        });
    }
  }, [sqon]);

  return [{ ...releaseData }, isFetchingData];
};

export default useReleaseData;
