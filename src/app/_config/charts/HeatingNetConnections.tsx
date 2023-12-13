import { type FC, type ReactNode } from 'react';

import { BarChart } from '@/components/Charts';

const Chart: FC = (): ReactNode => {
  return (
    <BarChart
      isLoading={false}
      series={[
        {
          name: 'Odbiorcy przyłączeni',
          data: [443194.3, 38417241.5, 8668082.5, 2205193.7, 9481613.8],
        },
        {
          name: 'Odbiorcy w zasięgu',
          data: [988465, 41710947, 9674691, 2524762, 10089393],
        },
      ]}
      options={{
        chart: {
          animations: {
            enabled: false,
          },
        },
        title: { text: 'Przyłącza do sieci ciepłowniczej' },
        colors: ['#D86F53', '#F1A895'],
        xaxis: {
          title: { text: 'Powierzchnia [m²]' },
          categories: ['Jednorodzinne', 'Wielorodzinne', 'Biurowe', 'Handlowo-usługowe', 'Pozostałe'],
        },
      }}
    />
  );
};

export default Chart;
