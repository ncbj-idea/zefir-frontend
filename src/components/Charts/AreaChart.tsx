'use client';

import { Box, Paper, Typography } from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import plLocaleApex from 'apexcharts/dist/locales/pl.json';
import merge from 'lodash.merge';
import { type FC } from 'react';

import LoadingSpinner from '@/components/LoadingSpinner';
import { openSans } from '@/components/ThemeRegistry/theme';
import colors from '@/theme/colors';
import { formatThousands } from '@/utils/formatThousands';
import { roundToTwoDec } from '@/utils/roundTo2Dec';

import Tooltip from '../Tooltip';
import ApexChart from './ApexChart';

interface AreaChartProps {
  isLoading?: boolean;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  options?: ApexOptions;
  year?: number;
  tooltip?: string;
  subTitle?: string;
}

const AreaChart: FC<AreaChartProps> = ({
  subTitle = '',
  isLoading = false,
  options = {},
  series,
  year,
  tooltip = '',
}) => {
  const defaultOptions: ApexOptions = {
    chart: {
      defaultLocale: 'pl',
      locales: [plLocaleApex],
      type: 'area',
      height: 350,
      stacked: true,
      width: '100%',
      toolbar: {
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
        export: {
          csv: {
            headerCategory: 'Dane',
          },
        },
      },
    },
    tooltip: {
      x: {
        formatter: (val) => formatThousands(roundToTwoDec(val)),
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: options.stroke?.show || false,
      curve: 'smooth',
    },
    fill: {
      type: options.fill?.type || 'solid',
      gradient: {
        opacityFrom: 0,
        opacityTo: 0,
      },
    },
    title: {
      style: {
        fontWeight: 600,
        color: colors.background,
        fontSize: '16px',
        fontFamily: openSans.style.fontFamily,
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontSize: '12px',
      fontFamily: openSans.style.fontFamily,
      fontWeight: 600,
    },
    xaxis: {
      type: 'numeric',
      floating: false,
      decimalsInFloat: 0,
      title: {
        style: {
          color: colors.dark3,
          fontSize: '12px',
          fontWeight: 600,
          fontFamily: openSans.style.fontFamily,
        },
      },
    },
    yaxis: {
      decimalsInFloat: 0,
      title: {
        style: {
          color: colors.dark3,
          fontSize: '12px',
          fontWeight: 600,
          fontFamily: openSans.style.fontFamily,
        },
      },
      labels: {
        formatter: (val) => formatThousands(roundToTwoDec(val)),
      },
    },
    annotations: {
      xaxis: [
        {
          x: year && new Date(year).getTime(),
          borderColor: '#000',
          borderWidth: 3,
        },
      ],
    },
  };

  const apexOptions = merge(options, defaultOptions);
  const chartTitle = apexOptions.title?.text || '';

  if (isLoading) {
    return (
      <Paper
        variant="outlined"
        sx={{
          height: '100%',
          padding: '8px',
        }}
      >
        <LoadingSpinner />
      </Paper>
    );
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        height: '100%',
        padding: '8px',
      }}
    >
      <Box position="relative" height="100%">
        {chartTitle && (
          <Typography
            zIndex={9}
            position="absolute"
            color="text"
            fontSize="16px"
            fontWeight="600"
            top="2px"
            left="15px"
            width="calc(100% - 90px)"
          >
            {chartTitle}
            {subTitle && (
              <Typography component="span" color="text.secondary" fontWeight="600" fontSize="12px">
                {' '}
                {subTitle}
              </Typography>
            )}
          </Typography>
        )}
        {tooltip && (
          <Box
            sx={{
              position: 'absolute',
              top: '-2px',
              right: '36px',
              zIndex: 9,
            }}
          >
            <Tooltip text={tooltip} />
          </Box>
        )}
        <ApexChart options={apexOptions} series={series} type="area" height={350} width="100%" />
      </Box>
    </Paper>
  );
};

export default AreaChart;
