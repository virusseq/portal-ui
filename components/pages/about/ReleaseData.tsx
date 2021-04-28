import { ReactElement } from 'react';
import { css, useTheme } from '@emotion/react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';

import defaultTheme from '../../theme';
import { CoronaVirus, CrossHairs, File, Storage } from '../../theme/icons';
import useReleaseData from '../../../global/hooks/useReleaseData';

// const getChartStyles = (theme: typeof defaultTheme) => css`
//   margin: 0;
//   flex-grow: 1;

//   rect.highcharts-background,
//   rect.highcharts-plot-background,
//   rect.highcharts-plot-border {
//     fill: none;
//   }

//   .highcharts-legend-box {
//     fill: ${theme.colors.primary};
//   }

//   g.highcharts-axis text,
//   g.highcharts-axis-labels text,
//   g.highcharts-legend text {
//     color: ${theme.colors.white} !important;
//     fill: ${theme.colors.white} !important;
//   }
// `;

const ReleaseData = (): ReactElement => {
  const theme: typeof defaultTheme = useTheme();
  const [
    {
      fileCount = 0,
      filesByVariant = {},
      fileSize = { unit: 'B', value: '0' },
      genomes = 0,
      studyCount = 0,
    },
    isFetchingData,
  ] = useReleaseData();

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
            As of April 27, 2021
          </h3>
        </header>

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
          <li>
            <File />
            <span>{fileCount}</span>Files
          </li>
          <li>
            <CoronaVirus />
            <span>{genomes}</span>Viral Genomes
          </li>
          <li>
            <CrossHairs
              style={css`
                margin-left: -1px;
              `}
            />
            <span>{studyCount}</span>Studies
          </li>
          <li>
            <Storage />
            <span>{fileSize.value}</span>
            {fileSize.unit}
          </li>
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
