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

import { ReactElement, useEffect, useState } from 'react';
import { css, useTheme } from '@emotion/react';
import { format, isValid } from 'date-fns';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';

import { getConfig } from '../../../global/config';
import defaultTheme from '../../theme';
import { CoronaVirus, CrossHairs, File, Storage } from '../../theme/icons';
import useReleaseData from '../../../global/hooks/useReleaseData';
import Loader from '../../Loader';
import useSingularityData from '../../../global/hooks/useSingularityData';
import { ReleaseDataProps } from '../../../global/hooks/useReleaseData/types';

const ReleaseData = (): ReactElement => {
  const theme: typeof defaultTheme = useTheme();
  const { NEXT_PUBLIC_RELEASE_DATE } = getConfig();
  const [releaseData, loadingArrangerData] = useReleaseData();
  const { fetchTotalCounts } = useSingularityData();

  const [isLoadingSingularityData, setIsLoadingSingularityData] = useState<boolean>(true);
  const [releaseDataProps, setReleaseDataProps] = useState<ReleaseDataProps>();

  useEffect(() => {
    fetchTotalCounts()
      .then((counts) => {
        const [fileValue, fileUnit] = counts.fileSizeHumanReadable.split(' ');
        setReleaseDataProps({
          fileCount: counts.files,
          genomesCount: {
            value: counts.samples,
            type: 'EXACT',
          },
          fileSize: {
            unit: fileUnit,
            value: fileValue,
          },
          studyCount: counts.studies,
        });
        setIsLoadingSingularityData(false);
      })
      .catch(() => {
        console.error('fetchTotalCounts failed, use Arranger fallback');
        setReleaseDataProps(undefined);
        setIsLoadingSingularityData(false);
      });
  }, []);

  const {
    fileCount = 0,
    fileSize = { unit: 'B', value: '0' },
    genomesCount = { value: 0, type: 'APPROXIMATE' },
    studyCount = 0,
  } = releaseDataProps || releaseData;

  // either we're waiting on arranger or singularity data
  const showLoader =
    (releaseDataProps === undefined && loadingArrangerData) || isLoadingSingularityData;

  const releaseDate =
    !!NEXT_PUBLIC_RELEASE_DATE &&
    (Number.isNaN(Number(NEXT_PUBLIC_RELEASE_DATE))
      ? new Date(NEXT_PUBLIC_RELEASE_DATE)
      : Number(NEXT_PUBLIC_RELEASE_DATE) && new Date(Number(NEXT_PUBLIC_RELEASE_DATE)));

  return (
    <main
      css={css`
        display: flex;
        // flex-wrap: wrap;
      `}
    >
      <aside
        css={css`
          margin-right: 30px;

          /* @media (max-width: 639px) { */
          width: 100%;
          /* } */
        `}
      >
        {releaseDate && isValid(releaseDate) && (
          <header
            css={css`
              & > * {
                margin: 0;
              }
            `}
          >
            <h3
              css={css`
                font-size: 17px;
                font-weight: normal;
              `}
            >
              As of {format(releaseDate, 'MMMM dd, yyyy')}
            </h3>
          </header>
        )}

        <ul
          css={css`
            border: 1px solid ${theme.colors.primary_light};
            display: flex;
            /* flex-direction: column; */
            margin-bottom: 0;
            padding: 10px;
            width: 100%;
            justify-content: space-around;

            li {
              align-items: center;
              display: flex;
              padding-left: 25px;
              position: relative;
              white-space: nowrap;

              /* &:not(:first-of-type) {
                margin-top: 10px;
              } */
            }

            svg {
              left: 0;
              position: absolute;
            }

            span {
              font-weight: bold;
              margin-right: 5px;
            }
          `}
        >
          {showLoader ? (
            <Loader size={'11px'} />
          ) : (
            <>
              <li>
                <File />
                <span>{fileCount?.toLocaleString('en-CA')}</span>Files
              </li>
              <li>
                <CoronaVirus />
                <span>{genomesCount?.type === 'APPROXIMATE' ? '~' : ''}</span>
                <span>{genomesCount?.value?.toLocaleString('en-CA')}</span>Viral Genomes
              </li>
              <li>
                <CrossHairs
                  style={css`
                    margin-left: -1px;
                  `}
                />
                <span>{studyCount?.toLocaleString('en-CA')}</span>Studies
              </li>
              <li>
                <Storage />
                <span>{fileSize?.value}</span>
                {fileSize?.unit}
              </li>
            </>
          )}
        </ul>
      </aside>

      {/* <figure
        css={css`
          ${getChartStyles(theme)}
        `}
      >
        <h3
            css={css`
              font-size: 17px;
              font-weight: normal;
              margin-left: 80px;
              margin-top: 0;
            `}
          >
          <figcaption>Files by Variant Type</figcaption>
        </h3>

        <HighchartsReact
          highcharts={Highcharts}
          options={{
            chart: {
              height: 140,
              type: 'column',
            },
            credits: {
              enabled: false,
            },
            legend: {
              align: 'right',
              x: -30,
              verticalAlign: 'top',
              y: 25,
              floating: true,
              shadow: false
            },
            plotOptions: {
              column: {
                stacking: 'normal',
                dataLabels: {
                  enabled: true,
                },
              },
            },
            series: [{
              name: 'CoViD-19',
              data: Object.values(filesByVariant).map(province => province.count)
            }],
            title: {
              text: '',
            },
            tooltip: {
              enabled: false,
            //   headerFormat: '<b>{point.x}</b><br/>',
            //   pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            xAxis: {
              categories: Object.keys(filesByVariant).map(abbreviation => abbreviation.toUpperCase()),
              reversed: true,
            },
            yAxis: {
              min: 0,
              title: {
                  text: '# files'
              },
          },
          }}
        />
        </figure> */}
    </main>
  );
};

export default ReleaseData;
