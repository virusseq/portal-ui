import { useState, useEffect } from 'react';

import createArrangerFetcher from '../../../components/utils/arrangerFetcher';
import { getProvince } from '../../../global/utils/constants';
import formatFileSize from '../../../global/utils/formatFileSize';
import { RepoFiltersType } from '../../types/sqon';
import { ReleaseDataProps } from './types';

const arrangerFetcher = createArrangerFetcher({});

const releaseQuery = `
query ($sqon: JSON) {
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
      analysis__sample__geo_loc_province {
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

const useReleaseData = (sqon?: RepoFiltersType) : [ReleaseDataProps , boolean] => {
  const [releaseData, setReleaseData] = useState<ReleaseDataProps>();
  const [isFetchingData, setIsFetchingData] = useState(false);

  useEffect(() => {
    if (!isFetchingData) {
      setIsFetchingData(true);
      arrangerFetcher({ body: { 
        query: releaseQuery,
        variables: { sqon },
      }})
        .then(async ({ data: { file: { aggregations: {
            analysis__host__host_age_bin: { buckets: hostAges = []},
            analysis__host__host_gender: { buckets: hostGenders = []},
            analysis__sample__geo_loc_province: { buckets: provinces = []},
            donors__specimens__samples__sample_id: { bucket_count: genomes = 0},
            file__size: { stats: { count: fileCount = 0, sum: fileSize = 0 } },
            study_id: { bucket_count: studyCount = 0 },
        }}}}) => {
          const [value, unit] = await formatFileSize(fileSize).split(' ');
          const filesByVariant = await provinces.reduce(
            (acc: {}, {doc_count, key} : {doc_count: number, key: string}) => {
              const { abbreviation, name } = getProvince({ long: key })
              
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
            }, {}
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
          setIsFetchingData(false);
        })
        .catch(async (err) => {
          console.warn(err);
          setIsFetchingData(false);
        });
    }
  }, [sqon]);

  return [
    {...releaseData},
    isFetchingData,
  ];
};

export default useReleaseData;
