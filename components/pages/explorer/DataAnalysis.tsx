import { css } from '@emotion/core';
import { Col, Row } from 'react-grid-system';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import useReleaseData from '../../../global/hooks/useReleaseData';
import Loader from '../../Loader';
import { Covid, CrossHairs, File, Storage } from '../../theme/icons';
import { PageContentProps } from '.';

const DataAnalysis = ({ sqon }: PageContentProps) => {
  const [{
    fileCount = 0,
    filesByVariant = [],
    fileSize = { unit: 'B', value: '0' },
    hostAges = [],
    hostGenders = [],
    genomes = 0,
    studyCount = 0,
  }, isFetchingData] = useReleaseData(sqon);

  return (
    <>
      <Row
        gutterWidth={0}
        css={(theme) => css`
          align-items: center !important;
          min-height: 48px;
          margin: 10px 0;
          background-color: ${theme.colors.white};
          border-radius: 5px;
          ${theme.shadow.default};
        `}
      >
        {isFetchingData
        ? <Loader
            stroke="8px"
            height="20px"
            width="20px"
          />
        : (
          <ul
          css={(theme) => css`
            align-items: center;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            list-style: none;
            margin: 0;
            padding: 0 15px;
            width: 100%;

            li {
              align-items: center;
              display: flex;
              font-weight: bold;
              padding-left: 25px;
              position: relative;
              white-space: nowrap;

              &:not(:first-of-type) {
                margin-left: 10px;
              }
            }

            svg {
              left: 0;
              position:absolute;
            }

            span {
              margin-right: 5px;
            }
          `}
        >
          <li><File /><span>{fileCount}</span>Files</li>
          <li><Covid /><span>{genomes}</span>Viral Genomes</li>
          <li><CrossHairs style={css`margin-left: -1px;`} /><span>{studyCount}</span>Studies</li>
          <li><Storage /><span>{fileSize.value}</span>{fileSize.unit}</li>
        </ul>
        )}
      </Row>
      <Row
        component="ul"
        gutterWidth={10}
        css={(theme) => css`
          margin: 10px 0 0;
          padding: 0;
          list-style: none;

          figure {
            ${isFetchingData && 'display: flex;'}
            background-color: ${theme.colors.white};
            border-radius: 5px;
            margin: 0 0 10px;
            min-height: 100px;
            ${theme.shadow.default};
          }
        `}
      >
        <Col
          component="li"
          md={7}
          lg={8}
          >
          <figure>
            {isFetchingData
            ? <Loader
                stroke="8px"
                height="20px"
                width="20px"
              />
            : (
              <HighchartsReact
                highcharts={Highcharts}
                options={{
                  chart: {
                    height: 100,
                    type: 'column',
                    spacingBottom: 7,
                    spacingRight: 15,
                  },
                  credits: {
                    enabled: false,
                  },
                  legend: {
                    enabled: false,
                  //   align: 'right',
                  //   x: -30,
                  //   verticalAlign: 'top',
                  //   y: 25,
                  //   floating: true,
                  //   shadow: false
                  },
                  plotOptions: {
                    column: {
                      stacking: 'normal',
                      dataSorting: {
                        enabled: true,
                      }
                      // dataLabels: {
                      //   enabled: true,
                      // },
                    },
                  },
                  series: [{
                    data: Object.values(filesByVariant)?.map(province => province?.count),
                    name: 'CoViD-19',
                  }],
                  title: {
                    align: 'right',
                    margin: 5,
                    style: {
                      fontSize: 13,
                      fontWeight: 'bold',
                    },
                    text: 'Viral Genomes by Province',
                  },
                  tooltip: {
                    // enabled: false,
                  //   headerFormat: '<b>{point.x}</b><br/>',
                  //   pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                  },
                  xAxis: {
                    categories: Object.keys(filesByVariant)?.map(abbreviation => abbreviation?.toUpperCase()),
                    reversed: true,
                  },
                  yAxis: {
                    min: 0,
                    title: {
                        text: '# Viral Genomes'
                    },
                },
                }}
              />
            )}
          </figure>
        </Col>

        {/* <Col
          component="li"
          md={6}
          lg={4}
          >
          <figure>
            {isFetchingData
            ? <Loader
                stroke="8px"
                height="20px"
                width="20px"
              />
            : (
              <HighchartsReact
                highcharts={Highcharts}
                options={{
                  chart: {
                    height: 100,
                    type: 'column',
                  },
                  credits: {
                    enabled: false,
                  },
                  legend: {
                    enabled: false,
                  //   align: 'right',
                  //   x: -30,
                  //   verticalAlign: 'top',
                  //   y: 25,
                  //   floating: true,
                  //   shadow: false
                  },
                  plotOptions: {
                    column: {
                      stacking: 'normal',
                      dataSorting: {
                        enabled: true,
                      }
                      // dataLabels: {
                      //   enabled: true,
                      // },
                    },
                  },
                  series: [{
                    data: Object.values(filesByVariant)?.map(province => province?.count),
                    name: 'CoViD-19',
                  }],
                  title: {
                    align: 'right',
                    floating: true,
                    text: 'Samples by Province',
                  },
                  tooltip: {
                    enabled: false,
                  //   headerFormat: '<b>{point.x}</b><br/>',
                  //   pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                  },
                  xAxis: {
                    categories: Object.keys(filesByVariant)?.map(abbreviation => abbreviation?.toUpperCase()),
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
            )}
          </figure>
        </Col>*/}

        <Col
          component="li"
          md={5}
          lg={4}
          >
          <figure
            css={(theme) => css`
              display: flex;
              justify-content: space-around;
            `}
          >
            {isFetchingData
            ? <Loader
                stroke="8px"
                height="20px"
                width="20px"
              />
            : (<>
              <HighchartsReact
                highcharts={Highcharts}
                options={{
                  chart: {
                    height: 100,
                    width: 130,
                    spacing: [0,0,0,0],
                  },
                  credits: {
                    enabled: false,
                  },
                  legend: {
                    enabled: false,
                  //   align: 'right',
                  //   x: -30,
                  //   verticalAlign: 'top',
                  //   y: 25,
                  //   floating: true,
                  //   shadow: false
                  },
                  plotOptions: {
                    pie: {
                      dataLabels: {
                        enabled: false,
                        // distance: 0,
                        style: {
                          fontWeight: 'bold',
                          color: 'white'
                        }
                      },
                      // center: ['50%', '50%'],
                      // size: '100%'
                    }
                  },
                  series: [{
                    data: hostAges?.map(({key, doc_count}) => [key, doc_count]),
                    innerSize: '65%',
                    name: 'CoViD-19',
                    type: 'pie',
                  }],
                  title: {
                    align: 'center',
                    floating: true,
                    style: {
                      fontSize: 12,
                    },
                    text: 'Host<br/>Age',
                    verticalAlign: 'middle',
                    y: 12,
                  },
                  tooltip: {
                    formatter(this: Highcharts.TooltipFormatterContextObject): string {
                      return `<b>${this.key} Years:</b><br>${this.y} File${this.y > 1 ? 's' : ''} (${this.percentage?.toLocaleString('en-CA', {maximumFractionDigits: 2})}%)`;
                    },
                  },
                }}
              />
              <HighchartsReact
                highcharts={Highcharts}
                options={{
                  chart: {
                    height: 100,
                    width: 120,
                    spacing: [0,0,0,0],
                  },
                  credits: {
                    enabled: false,
                  },
                  legend: {
                    enabled: false,
                  //   align: 'right',
                  //   x: -30,
                  //   verticalAlign: 'top',
                  //   y: 25,
                  //   floating: true,
                  //   shadow: false
                  },
                  plotOptions: {
                    pie: {
                      dataLabels: {
                        enabled: false,
                        // distance: -50,
                        // style: {
                        //   fontWeight: 'bold',
                        //   color: 'white'
                        // }
                      },
                      center: ['50%', '50%'],
                      size: '110%'
                    }
                  },
                  series: [{
                    data: hostGenders?.map(({key, doc_count}) => [key, doc_count]),
                    innerSize: '65%',
                    name: 'CoViD-19',
                    type: 'pie',
                  }],
                  title: {
                    align: 'center',
                    floating: true,
                    style: {
                      fontSize: 12,
                    },
                    text: 'Host<br/>Gender',
                    verticalAlign: 'middle',
                    y: 11,
                  },
                  tooltip: {
                    formatter(this: Highcharts.TooltipFormatterContextObject): string {
                      return `<b>${this.key}:</b><br>${this.y} File${this.y > 1 ? 's' : ''} (${this.percentage?.toLocaleString('en-CA', {maximumFractionDigits: 2})}%)`;
                    },
                  },
                }}
              />
            </>)}
          </figure>
        </Col>
      </Row>
    </>
  );
};

export default DataAnalysis;
