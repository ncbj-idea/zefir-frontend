'use client';

import { type FC, type ReactNode } from 'react';

import { BarChart } from '@/components/Charts';

const Chart: FC = (): ReactNode => {
  return (
    <BarChart
      isLoading={false}
      series={[
        {
          name: '200-240 kWh/m²/rok',
          data: [19783450.9, 28155981.6, 27693155.1, 10681105.5, 6335189.8],
        },
        {
          name: '160-200 kWh/m²/rok',
          data: [31255331.8, 44257528.8, 97078432.6, 30415582.7, 197095312.9],
        },
        {
          name: '110-160 kWh/m²/rok',
          data: [5443442.5, 24766955.5, 5211419, 41215486.9, 35269318.8],
        },
        {
          name: '20-110 kWh/m²/rok',
          data: [2592014.5, 6948708.4, 5909560.3, 111900.5, 338296.8],
        },
      ]}
      options={{
        chart: {
          animations: {
            enabled: false,
          },
        },
        title: { text: 'Zużycie ciepła w budynkach' },
        colors: ['#A73F25', '#D14F2E', '#D86F53', '#F1A895', '#F1C4B9'],
        xaxis: {
          title: { text: 'Powierzchnia [m²]' },
          categories: ['Jednorodzinne', 'Wielorodzinne', 'Biurowe', 'Handlowo-usługowe', 'Pozostałe'],
        },
      }}
    />
  );
};

export default Chart;
