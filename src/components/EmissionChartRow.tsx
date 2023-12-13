'use client';

import { Grid } from '@mui/material';
import { useParams } from 'next/navigation';
import { type FC } from 'react';
import useSWRImmutable from 'swr/immutable';

import { http } from '@/api';
import { AreaChart, BarChart } from '@/components/Charts';
import { useSelector } from '@/store';
import { DataCategory, type EmissionDataResponse, type TechnologyDataResponse } from '@/types';
import { getTechnologyProps } from '@/utils/getTechnologyProps';
import { roundToTwoDec } from '@/utils/roundTo2Dec';

interface EmissionChartRowProps {
  conversionBase: number;
}

const EmissionChartRow: FC<EmissionChartRowProps> = ({ conversionBase }) => {
  const params = useParams();
  const scenarioId = Number(params.scenarioId);

  const year = useSelector((state) => state.ui.currScenarioYear[scenarioId]) || 2023;

  const { data, isLoading: dataIsLoading } = useSWRImmutable(
    ['/zefir_data/get_data', DataCategory.EMISSIONS, scenarioId],
    ([, ...args]) =>
      http.default.getZefirDataZefirDataGetDataGet({
        dataCategory: args[0],
        scenarioId: args[1],
      }),
  );
  const { data: yearData, isLoading: yearsAreLoading } = useSWRImmutable(
    ['/zefir_data/get_years', scenarioId],
    ([, ...args]) =>
      http.default.getSequenceOfYearsZefirDataGetYearsGet({
        scenarioId: args[0],
      }),
  );
  const yearsArr = (yearData?.years || []).map((el) => el + 2023);
  const isLoading = dataIsLoading || yearsAreLoading;

  const resData = (data?.data || []) as EmissionDataResponse[];

  return resData.map((emissionData) => {
    const areaChartSeries =
      emissionData.data
        .filter(({ values }) => {
          const valuesSum = values.reduce((a, b) => a + b, 0);
          return valuesSum !== 0;
        })
        .map((tech) => {
          const { technology_name, values } = tech;
          const { title: techTitle, color } = getTechnologyProps({
            name: technology_name,
            dataCategory: DataCategory.EMISSIONS,
          });
          return {
            name: techTitle,
            color,
            type: 'area',
            data: yearsArr.map((y, yIndex) => [y, (values[yIndex] || 0) / conversionBase]),
          };
        }) || [];

    const initCategories =
      emissionData.data
        .filter((tech) => {
          const { values } = tech as TechnologyDataResponse;
          const valuesSum = values.reduce((a, b) => a + b, 0);
          return valuesSum !== 0;
        })
        .map((tech) => {
          const { technology_name } = tech as TechnologyDataResponse;
          return technology_name;
        }) || [];

    const barChartData = (
      emissionData.data.map((tech) => {
        const { values, technology_name } = tech as TechnologyDataResponse;
        const { title: techTitle } = getTechnologyProps({
          name: technology_name,
          dataCategory: DataCategory.EMISSIONS,
        });
        const dataIndex = yearsArr.indexOf(year) || 0;
        return {
          technology_name: techTitle,
          value: values[dataIndex],
        };
      }) || []
    ).filter(({ value }) => !!value || value !== 0);

    const barChartSeries = barChartData.map((d) => d.value);
    const barChartCategories = barChartData.map((d) => d.technology_name);

    const sumValue = barChartSeries.reduce((prev, curr) => prev! + curr!, 0);
    const sumAdjusted = roundToTwoDec(sumValue || 0);

    const title = `Emisje ${emissionData.emission_type}`;
    const subTitle = '(na potrzeby ciepłownictwa, ogrzewnictwa, energii elektrycznej, bez KSE)';
    const unit = 'tys. ton';

    return (
      <Grid key={emissionData.emission_type} container sx={{ height: { xs: 'auto', lg: '390px' } }} mb="24px">
        <Grid item xs={12} lg={6} height="100%" p={1} pr="10px">
          <AreaChart
            isLoading={isLoading}
            year={year}
            series={areaChartSeries}
            subTitle={subTitle}
            options={{
              title: { text: title },
              xaxis: { tickAmount: yearsArr.length },
              yaxis: { title: { text: unit } },
            }}
          />
        </Grid>
        <Grid item xs={12} lg={6} height="100%" p={1} pl="10px">
          <BarChart
            isLoading={isLoading}
            series={[{ data: barChartSeries as number[] }]}
            sumValue={`${sumAdjusted} ${unit}`}
            subTitle={subTitle}
            options={{
              plotOptions: { bar: { distributed: true } },
              legend: { show: false },
              title: { text: `${title} - ${year}r.` },
              xaxis: {
                title: { text: unit },
                categories: barChartCategories,
              },
              colors: [
                ({ seriesIndex }: { seriesIndex: number }) => {
                  const categoryName = initCategories[seriesIndex];
                  const { color } = getTechnologyProps({ name: categoryName, dataCategory: DataCategory.EMISSIONS });
                  return color;
                },
              ],
            }}
          />
        </Grid>
      </Grid>
    );
  });
};

export default EmissionChartRow;
