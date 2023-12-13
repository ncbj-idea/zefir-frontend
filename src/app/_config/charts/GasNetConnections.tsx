import { type FC, type ReactNode } from 'react';

import { BarChart } from '@/components/Charts';

const Chart: FC = (): ReactNode => {
  return (
    <BarChart
      isLoading={false}
      series={[
        {
          name: 'Odbiorcy przyłączeni',
          data: [11202881.8, 7265948.7, 2429353.4, 895359.7, 1487324.1],
        },
        {
          name: 'Odbiorcy w zasięgu',
          data: [12652917, 39158723, 9545357, 3685117, 10047389],
        },
      ]}
      options={{
        chart: {
          animations: {
            enabled: false,
          },
        },
        title: { text: 'Przyłącza do sieci gazowej' },
        colors: ['#F2CB0A', '#EFE19F'],
        xaxis: {
          title: { text: 'Powierzchnia [m²]' },
          categories: ['Jednorodzinne', 'Wielorodzinne', 'Biurowe', 'Handlowo-usługowe', 'Pozostałe'],
        },
      }}
    />
  );
};

export default Chart;
