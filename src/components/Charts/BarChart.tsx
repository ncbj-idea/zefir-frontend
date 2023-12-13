'use client';

import { Box, Paper, Typography } from '@mui/material';
import type { ApexOptions } from 'apexcharts';
import plLocaleApex from 'apexcharts/dist/locales/pl.json';
import merge from 'lodash.merge';
import { type FC, useMemo } from 'react';

import LoadingSpinner from '@/components/LoadingSpinner';
import { openSans } from '@/components/ThemeRegistry/theme';
import colors from '@/theme/colors';
import { formatThousands } from '@/utils/formatThousands';
import { roundToTwoDec } from '@/utils/roundTo2Dec';

import Tooltip from '../Tooltip';
import ApexChart from './ApexChart';

interface BarChartProps {
  isLoading?: boolean;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  options?: ApexOptions;
  sumValue?: string;
  tooltip?: string;
  subTitle?: string;
}

const BarChart: FC<BarChartProps> = ({
  series,
  subTitle = '',
  options = {},
  sumValue = '',
  tooltip = '',
  isLoading = false,
}) => {
  const defaultOptions: ApexOptions = {
    chart: {
      defaultLocale: 'pl',
      locales: [plLocaleApex],
      type: 'bar',
      stacked: true,
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
      y: {
        formatter: (val) => formatThousands(roundToTwoDec(val)),
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        barHeight: '45%',
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
    dataLabels: { enabled: false },
    stroke: { show: false },
    yaxis: {
      title: {
        text: '',
      },
    },
    xaxis: {
      title: {
        offsetY: 7,
        style: {
          fontWeight: 600,
          color: colors.dark3,
          fontSize: '12px',
        },
      },
      labels: {
        formatter: (val) => formatThousands(roundToTwoDec(val)),
      },
    },
    fill: { opacity: 1 },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
    },
  };

  const yAxisTitleDefault = (options?.yaxis as ApexYAxis)?.title?.text;
  const apexOptions = merge(options, defaultOptions);
  const chartTitle = apexOptions.title?.text || '';

  const yAxisTitle = useMemo(() => {
    if (typeof yAxisTitleDefault === 'string') {
      return yAxisTitleDefault;
    }
    return '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <Paper
        variant="outlined"
        sx={{
          height: '100%',
          padding: '8px',
        }}
      >
        <LoadingSpinner />;
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
      <Box
        position="relative"
        display="grid"
        gridTemplateColumns="1fr"
        gridTemplateRows={sumValue ? '90% 10%' : '1fr'}
        height="100%"
      >
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
        {yAxisTitle && (
          <Typography
            position="absolute"
            color="text.secondary"
            fontSize="12px"
            fontWeight="600"
            top="47px"
            right="10px"
          >
            {yAxisTitle}
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
        <ApexChart options={apexOptions} series={series} type="bar" height={sumValue ? 310 : 350} width="100%" />
        {!!sumValue && (
          <Box display="flex" alignItems="center">
            <Typography fontSize="16px" fontWeight="600" ml="8px">
              SUMA: {sumValue}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default BarChart;
