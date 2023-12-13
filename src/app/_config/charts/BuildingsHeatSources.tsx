import { type FC, type ReactNode } from 'react';

import { BarChart } from '@/components/Charts';

const Chart: FC = (): ReactNode => {
  return (
    <BarChart
      isLoading={false}
      series={[
        {
          name: 'Miejska sieć ciepłownicza',
          data: [443194.3, 38417241.5, 8668082.5, 2205193.7, 9481613.8],
        },
        {
          name: 'Kocioł gazowy',
          data: [11202881.8, 7265948.7, 2429353.4, 895359.7, 1487324.1],
        },
        {
          name: 'Kocioł węglowy starego typu',
          data: [805297.5, 2468661.9, 237147, 125110.2, 261996.2],
        },
        {
          name: 'Ogrzewanie elektryczne',
          data: [246243.5, 883225.8, 818932.1, 147029, 1144550.7],
        },
        {
          name: 'Pompa ciepła',
          data: [540718, 77669.1, 103990.1, 1053414.5, 117012.2],
        },
        {
          name: 'Kocioł ekoprojekt',
          data: [87134, 5975.9, 11147, 7367.9, 6070],
        },
      ]}
      options={{
        chart: {
          animations: {
            enabled: false,
          },
        },
        title: { text: 'Powierzchnia ogrzewana źródłami ciepła' },
        colors: ['#F2CB0A', '#A2B874', '#6B6B6B', '#086296'],
        xaxis: {
          title: { text: 'Powierzchnia [m²]' },
          categories: ['Jednorodzinne', 'Wielorodzinne', 'Biurowe', 'Handlowo-usługowe', 'Pozostałe'],
        },
      }}
    />
  );
};

export default Chart;
