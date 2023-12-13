import { Box, Grid, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { type FC } from 'react';
import useSWRImmutable from 'swr/immutable';

import { http } from '@/api';
import { AreaChart } from '@/components/Charts';
import { TableBody, TableCell, TableHead, TableRow, TableWrapper } from '@/components/Table';
import { useSelector } from '@/store';
import { DataCategory, type EnergyDataResponse } from '@/types';
import { formatThousands } from '@/utils/formatThousands';
import { getTechnologyProps } from '@/utils/getTechnologyProps';
import { roundToTwoDec } from '@/utils/roundTo2Dec';

const columnTitles = ['Rodzaj paliwa', 'Zużycie paliwa', 'Pozyskana energia'];

interface FuelProps {
  conversionBase: number;
}

const Fuel: FC<FuelProps> = ({ conversionBase }) => {
  const params = useParams();
  const scenarioId = Number(params.scenarioId);

  const year = useSelector((state) => state.ui.currScenarioYear[scenarioId]) || 2023;

  const { data, isLoading } = useSWRImmutable(
    ['/zefir_data/get_data', DataCategory.FUEL_USAGE, scenarioId],
    ([, ...args]) =>
      http.default.getZefirDataZefirDataGetDataGet({
        dataCategory: args[0],
        scenarioId: args[1],
      }),
  );
  const { data: yearData } = useSWRImmutable(['/zefir_data/get_years', scenarioId], ([, ...args]) =>
    http.default.getSequenceOfYearsZefirDataGetYearsGet({
      scenarioId: args[0],
    }),
  );
  const yearsArr = (yearData?.years || []).map((el) => el + 2023);

  const areaChartSeries =
    data?.data
      .filter((tech) => {
        const { power } = tech as EnergyDataResponse;
        const powerSum = power.reduce((a, b) => a + b, 0);
        return powerSum !== 0;
      })
      .map((tech) => {
        const { fuel_name, power } = tech as EnergyDataResponse;
        const { title, color } = getTechnologyProps({ name: fuel_name, dataCategory: DataCategory.FUEL_USAGE });
        return {
          name: title,
          color,
          type: 'area',
          data: yearsArr.map((y, yIndex) => [y, (power[yIndex] || 0) / conversionBase]),
        };
      }) || [];

  const tableData = (
    data?.data.map((tech) => {
      const { fuel_name, power, usage } = tech as EnergyDataResponse;
      const { title } = getTechnologyProps({ name: fuel_name, dataCategory: DataCategory.FUEL_USAGE });
      const dataIndex = yearsArr.indexOf(year) || 0;
      const usageData = (usage[dataIndex] || 0) / conversionBase;
      const powerData = (power[dataIndex] || 0) / conversionBase;
      return [title, usageData, powerData];
    }) || []
  ).filter((d) => d[1] !== 0 && d[2] !== 0);

  const tableDataWithUnits = tableData.map((techArr) => {
    const name = techArr[0];
    const usage = (techArr[1] as number) / 10 ** 2;
    const energy = (techArr[2] as number) / 10 ** 3;

    let usageUnit = 't';
    switch (name) {
      case 'Węgiel kamienny':
        usageUnit = 't';
        break;
      case 'Biomasa':
      case 'Drewno opałowe':
        usageUnit = 'kg';
        break;
      case 'Gaz ziemny':
      case 'Olej opałowy':
        usageUnit = 'm³';
        break;
      default:
        break;
    }

    return [
      name,
      `${formatThousands(roundToTwoDec(usage))} ${usageUnit}`,
      `${formatThousands(roundToTwoDec(energy))} TWh`,
    ];
  });

  const colors = ['#6B6B6B', '#F2CB0A', '#F3A149', '#8B6D5E', '#A2B874'];
  const title = 'Energia pozyskana z paliw';
  const subTitle = '(na potrzeby ciepłownictwa, ogrzewnictwa, energii elektrycznej, bez KSE)';
  const unit = 'TWh';

  return (
    <Grid container sx={{ height: { xs: 'auto', lg: '390px' } }} mb="24px">
      <Grid item xs={12} lg={6} height="100%" p={1} pr="10px">
        <AreaChart
          isLoading={isLoading}
          year={year}
          series={areaChartSeries}
          subTitle={subTitle}
          options={{
            title: { text: title },
            colors,
            xaxis: { tickAmount: yearsArr.length },
            yaxis: { title: { text: unit } },
          }}
        />
      </Grid>
      <Grid item xs={12} lg={6} height="100%" p={1} pl="10px">
        <Box height="100%">
          <Box height="30px" mb="10px">
            <Typography fontSize="16px" fontWeight="600">
              {title} - {year}r.{' '}
              <Typography component="span" color="text.secondary" fontWeight="600" fontSize="12px">
                {subTitle}
              </Typography>
            </Typography>
          </Box>
          <Box height="calc(100% - 40px)">
            <TableWrapper>
              <TableHead>
                {columnTitles?.map((el, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <TableCell key={`title-${index}`}>{el}</TableCell>
                ))}
              </TableHead>
              <TableBody>
                {tableDataWithUnits?.map((row, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <TableRow key={`row-${index}`}>
                    {row.map((cell, cellIndex) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <TableCell key={`row-cell-${index}-${cellIndex}`}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </TableWrapper>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Fuel;
