'use client';

import { Box, Grid } from '@mui/material';
import { useParams } from 'next/navigation';
import { type FC } from 'react';
import useSWRImmutable from 'swr/immutable';

import { http } from '@/api';
import { AreaChart, BarChart } from '@/components/Charts';
import { type AggregateType } from '@/types';
import { formatThousands } from '@/utils/formatThousands';
import { getStackColor } from '@/utils/getStackColor';
import { getTechnologyProps } from '@/utils/getTechnologyProps';

interface AggregatesChartsProps {
  isScenario?: boolean;
  year: number;
  consType: 'very_high_consumption' | 'high_consumption' | 'average_consumption' | 'low_consumption';
  aggType: AggregateType;
}

const AggregatesCharts: FC<AggregatesChartsProps> = ({ isScenario = false, year, aggType, consType }) => {
  const params = useParams();
  const scenarioId = params.scenarioId ? Number(params.scenarioId) : undefined;

  const { data: yearData } = useSWRImmutable(
    scenarioId ? ['/zefir_aggregate/get_years', scenarioId] : null,
    ([, ...args]) => http.default.getSequenceOfYearsZefirDataGetYearsGet({ scenarioId: args[0] }),
  );
  const { data: detailsData } = useSWRImmutable(['/zefir_aggregate/details', aggType, scenarioId], ([, ...args]) =>
    http.default.getZefirAggDetailsZefirAggregateDetailsGet({
      aggregateType: args[0],
      scenarioId: args[1],
    }),
  );

  const yearsArr = (yearData?.years || []).map((el) => el + 2023);
  const dataIndex = yearsArr.indexOf(year) < 0 ? 0 : yearsArr.indexOf(year);

  const data = detailsData?.find((c) => c.name === consType);

  // Area chart series
  const areaSeries =
    data?.area
      ?.filter(({ values }) => {
        const valuesSum = values.reduce((a, b) => a + b, 0);
        return valuesSum !== 0;
      })
      ?.map(({ stack_name, values }, index) => ({
        type: 'area',
        name: stack_name,
        color: getStackColor(index),
        data: yearsArr.map((y, yIndex) => [y, values[yIndex] || 0]),
      })) || [];

  const areaBarChartData = (
    data?.area.map(({ stack_name, values }) => ({
      name: stack_name,
      value: values[dataIndex],
    })) || []
  ).filter(({ value }) => !!value || value !== 0);

  const areaBarChartSeries = areaBarChartData.map((c) => c.value);
  const areaBarChartCategories = areaBarChartData.map(
    (c) => getTechnologyProps({ name: c.name, dataCategory: 'agg_stacks' }).title,
  );
  const areaBarChartColors = areaBarChartData.map((_, i) => getStackColor(i));

  // Energy per building chart series
  const buildingsSeries =
    data?.energy_per_building
      ?.filter(({ values }) => {
        const valuesSum = values.reduce((a, b) => a + b, 0);
        return valuesSum !== 0;
      })
      ?.map(({ energy_type, values }) => {
        const { title, color } = getTechnologyProps({ name: energy_type, dataCategory: 'agg_stacks' });
        return {
          color,
          type: 'area',
          name: title,
          data: yearsArr.map((y, yIndex) => [y, values[yIndex] || 0]),
        };
      }) || [];
  const buildingBarChartData = (
    data?.energy_per_building.map(({ energy_type, values }) => ({
      name: energy_type,
      value: values[dataIndex],
    })) || []
  ).filter(({ value }) => !!value || value !== 0);
  const buildingBarChartSeries = buildingBarChartData.map((c) => c.value);
  const buildingBarChartCategories = buildingBarChartData.map(
    (c) => getTechnologyProps({ name: c.name, dataCategory: 'agg_heat' }).title,
  );
  const buildingBarChartColors = buildingBarChartData.map(
    (c) => getTechnologyProps({ name: c.name, dataCategory: 'agg_heat' }).color,
  );

  // Aggregate area chart series
  const aggArea = detailsData?.find((c) => c.name === consType)?.agg_area || [];
  const aggAreaSeries = [
    {
      name: '',
      type: 'area',
      color: '#9563C1',
      data: yearsArr.map((y, yIndex) => [y, aggArea[yIndex] || 0]),
    },
  ];

  // Aggregate amount of buildings chart series
  const aggAmountOfBuildings = detailsData?.find((c) => c.name === consType)?.agg_amount_of_building || [];
  const aggAmountOfBuildingsSeries = [
    {
      name: '',
      type: 'area',
      color: '#3B9A25',
      data: yearsArr.map((y, yIndex) => [y, aggAmountOfBuildings[yIndex] || 0]),
    },
  ];

  return (
    <Box>
      <Grid container spacing={2} mb="40px">
        <Grid item xs={6}>
          {isScenario ? (
            <AreaChart
              isLoading={false}
              year={year}
              series={areaSeries}
              options={{
                title: { text: 'Lokalne koszyki technologiczne' },
                yaxis: { title: { text: 'tys. m²' }, labels: { formatter: (val) => formatThousands(val / 10 ** 3) } },
              }}
              tooltip="Informacje dotyczące lokalnych koszyków technologicznych dla wybranego poziomu zużycia"
            />
          ) : (
            <BarChart
              tooltip="Informacje dotyczące lokalnych koszyków technologicznych dla wybranego poziomu zużycia"
              series={[{ data: areaBarChartSeries as number[] }]}
              options={{
                plotOptions: { bar: { distributed: true } },
                legend: { show: false },
                title: { text: 'Lokalne koszyki technologiczne' },
                colors: areaBarChartColors,
                xaxis: {
                  title: { text: 'tys. m²' },
                  categories: areaBarChartCategories,
                  labels: { formatter: (val) => formatThousands(Number(val) / 10 ** 3) },
                },
              }}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          {isScenario ? (
            <BarChart
              tooltip="Informacje dotyczące lokalnych koszyków technologicznych dla wybranego poziomu zużycia"
              series={[{ data: areaBarChartSeries as number[] }]}
              options={{
                plotOptions: { bar: { distributed: true } },
                legend: { show: false },
                title: { text: `Lokalne koszyki technologiczne - ${year}r.` },
                colors: areaBarChartColors,
                xaxis: {
                  title: { text: 'tys. m²' },
                  categories: areaBarChartCategories,
                  labels: { formatter: (val) => formatThousands(Number(val) / 10 ** 3) },
                },
              }}
            />
          ) : (
            <BarChart
              tooltip="Średni poziom zużycia w budynkach"
              series={[{ data: buildingBarChartSeries as number[] }]}
              options={{
                plotOptions: { bar: { distributed: true } },
                legend: { show: false },
                title: { text: 'Średni poziom zużycia w budynkach' },
                colors: buildingBarChartColors,
                xaxis: {
                  title: { text: 'kWh/m²/rok' },
                  categories: buildingBarChartCategories,
                  labels: { formatter: (val) => formatThousands(Number(val) / 10 ** 3) },
                },
              }}
            />
          )}
        </Grid>
      </Grid>
      {isScenario && (
        <>
          <Grid container spacing={2} mb="40px">
            <Grid item xs={6}>
              <AreaChart
                isLoading={false}
                year={year}
                series={buildingsSeries}
                options={{
                  title: { text: 'Średni poziom zużycia w budynkach' },
                  stroke: { show: true },
                  fill: { type: 'gradient' },
                  yaxis: {
                    title: { text: 'kWh/m²/rok' },
                    labels: { formatter: (val) => formatThousands(Number(val) / 10 ** 3) },
                  },
                }}
                tooltip="Informacje dotyczące lokalnych koszyków technologicznych dla wybranego poziomu zużycia"
              />
            </Grid>
            <Grid item xs={6}>
              <BarChart
                tooltip="Średni poziom zużycia w budynkach"
                series={[{ data: buildingBarChartSeries as number[] }]}
                options={{
                  plotOptions: { bar: { distributed: true } },
                  legend: { show: false },
                  title: { text: `Średni poziom zużycia w budynkach - ${year}r.` },
                  colors: buildingBarChartColors,
                  xaxis: {
                    title: { text: 'kWh/m²/rok' },
                    categories: buildingBarChartCategories,
                    labels: { formatter: (val) => formatThousands(Number(val) / 10 ** 3) },
                  },
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mb="40px">
            <Grid item xs={6}>
              <AreaChart
                isLoading={false}
                year={year}
                series={aggAreaSeries}
                options={{
                  title: { text: 'Powierzchnia całkowita' },
                  stroke: { show: true },
                  fill: { type: 'gradient' },
                  yaxis: {
                    title: { text: 'm²' },
                    labels: { formatter: (val) => formatThousands(Number(val) / 10 ** 3) },
                  },
                }}
                tooltip="Informacje dotyczące lokalnych koszyków technologicznych dla wybranego poziomu zużycia"
              />
            </Grid>
            <Grid item xs={6}>
              <AreaChart
                isLoading={false}
                year={year}
                series={aggAmountOfBuildingsSeries}
                options={{
                  title: { text: 'Liczba budynków' },
                  stroke: { show: true },
                  fill: { type: 'gradient' },
                  yaxis: {
                    title: { text: 'mln' },
                    labels: { formatter: (val) => formatThousands(Number(val) / 10 ** 3) },
                  },
                }}
                tooltip="Informacje dotyczące lokalnych koszyków technologicznych dla wybranego poziomu zużycia"
              />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default AggregatesCharts;
