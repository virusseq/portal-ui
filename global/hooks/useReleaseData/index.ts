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

import { useState, useEffect } from 'react';

import createArrangerFetcher from '../../../components/utils/arrangerFetcher';
import { getProvince } from '../../utils/constants';
import formatFileSize from '../../utils/formatFileSize';
import { RepoFiltersType } from '../../types/sqon';
import { ReleaseDataProps } from './types';

const arrangerFetcher = createArrangerFetcher({});

const releaseDataQuery = `
query releaseDataQuery ($sqon: JSON) {
    file {
    aggregations(
      filters: $sqon,
      include_missing: false,
      aggregations_filter_themselves: true
    ){
      analysis__host__host_age_bin{
        buckets {
          doc_count
          key
        }
      }
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
        bucket_count
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

const useReleaseData = (sqon?: RepoFiltersType): [ReleaseDataProps, boolean] => {
  const [releaseData, setReleaseData] = useState<ReleaseDataProps>();
  const [isFetchingData, setIsFetchingData] = useState(false);

  useEffect(() => {
    if (!isFetchingData) {
      setIsFetchingData(true);
      arrangerFetcher({
        body: {
          query: releaseDataQuery,
          variables: { sqon },
        },
      })
        .then(async ({ data: { file: { aggregations = {} } = {} } }) => {
          // aggregations will be null if there's an error in the response
          if (aggregations) {
            const {
              analysis__host__host_age_bin: { buckets: hostAges = [] } = {},
              analysis__host__host_gender: { buckets: hostGenders = [] } = {},
              analysis__sample_collection__geo_loc_province: { buckets: provinces = [] } = {},
              donors__specimens__samples__sample_id: { bucket_count: genomes = 0 } = {},
              file__size: { stats: { count: fileCount = 0, sum: fileSize = 0 } = {} } = {},
              study_id: { bucket_count: studyCount = 0 } = {},
            } = aggregations;

            const [value, unit] = await formatFileSize(fileSize).split(' ');
            const filesByVariant = await provinces.reduce(
              (
                acc: Record<string, unknown>,
                { doc_count, key }: { doc_count: number; key: string },
              ) => {
                const { abbreviation, name } = getProvince({ long: key });

                return abbreviation
                  ? {
                      ...acc,
                      [abbreviation.toLowerCase()]: {
                        abbreviation,
                        count: doc_count,
                        name,
                      },
                    }
                  : (console.log(name), acc);
              },
              {},
            );

            // const filesByVariant = await provinces.map(
            //   ({doc_count, key} : {doc_count: number, key: string}) => {
            //     const province = getProvince({ long: key });

            //     return province.abbreviation
            //       ? {
            //         count: doc_count,
            //         ...province,
            //       }
            //       : console.log(province.name);
            //   }
            // );

            await setReleaseData({
              fileCount,
              fileSize: {
                unit,
                value,
              },
              filesByVariant,
              hostAges,
              hostGenders,
              genomes,
              studyCount,
            });
          }
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
