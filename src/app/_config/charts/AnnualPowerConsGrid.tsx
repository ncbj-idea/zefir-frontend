import { type FC, type ReactNode } from 'react';

import { BarChart } from '@/components/Charts';

const Chart: FC = (): ReactNode => {
  return (
    <BarChart
      isLoading={false}
      series={[
        {
          name: 'Ogrzewanie',
          data: [59.1, 104.1, 135.9, 82.4, 239],
        },
        {
          name: 'Zapotrzebowanie w budynkach',
          data: [294.4, 1545.6, 648.1, 234.2, 660.3],
        },
      ]}
      options={{
        chart: {
          animations: {
            enabled: false,
          },
        },
        title: { text: 'Roczny pobór prądu z sieci' },
        colors: ['#4179B1', '#5B9BDB', '#8CBDEF'],
        xaxis: {
          title: {
            text: 'TWh',
          },
          categories: ['Jednorodzinne', 'Wielorodzinne', 'Biurowe', 'Handlowo-usługowe', 'Pozostałe'],
        },
      }}
    />
  );
};

export default Chart;
