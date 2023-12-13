'use client';

import type { ApexOptions } from 'apexcharts';
import merge from 'lodash.merge';
import { type FC } from 'react';

import { formatThousands } from '@/utils/formatThousands';

import ApexChart from './ApexChart';

interface LineChartProps {
  options?: ApexOptions;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  height: string | number;
}

const LineChart: FC<LineChartProps> = ({ options = {}, series, height }) => {
  const defaultOptions = {
    chart: {
      zoom: {
        enabled: false,
      },
    },
    colors: ['#1EAE5A'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: 'Sumaryczna producja energii w całym systemie w poszczególnych latach',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
    yaxis: {
      labels: {
        formatter: (val: any) => formatThousands(val),
      },
    },
  };
  const apexOptions = merge(defaultOptions, options);

  return <ApexChart type="line" options={apexOptions} series={series} width="100%" height={height} />;
};

export default LineChart;
