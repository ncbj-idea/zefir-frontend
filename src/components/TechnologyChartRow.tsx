'use client';

import { Grid } from '@mui/material';
import { useParams } from 'next/navigation';
import { type FC } from 'react';
import useSWRImmutable from 'swr/immutable';

import { http } from '@/api';
import { AreaChart, BarChart } from '@/components/Charts';
import { useSelector } from '@/store';
import type { DataCategory, TechnologyDataResponse } from '@/types';
import { getTechnologyProps } from '@/utils/getTechnologyProps';
import { roundToTwoDec } from '@/utils/roundTo2Dec';

interface DataWithTags {
  tag: string;
  technology_name: string;
  values: number[];
}

interface TechnologyChartRowProps {
  dataCategory: DataCategory;
  title: string;
  conversionBase: number;
  subTitle?: string;
  unit: string;
  showSumValue?: boolean;
  groupByTag?: boolean;
}

const TechnologyChartRow: FC<TechnologyChartRowProps> = ({
  dataCategory,
  title,
  unit,
  subTitle = '',
  showSumValue = false,
  conversionBase,
  groupByTag = false,
}) => {
  const params = useParams();
  const scenarioId = Number(params.scenarioId);

  const year = useSelector((state) => state.ui.currScenarioYear[scenarioId]) || 2023;

  const { data, isLoading: dataIsLoading } = useSWRImmutable(
    ['/zefir_data/get_data', dataCategory, scenarioId],
    ([, ...args]) =>
      http.default.getZefirDataZefirDataGetDataGet({
        dataCategory: args[0],
        scenarioId: args[1],
      }),
  );
  const { data: tagsData } = useSWRImmutable(groupByTag ? '/zefir_data/get_tags_map' : null, () =>
    http.default.getTranslatedTagsMapZefirDataGetTagsMapGet(),
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

  const prunedData =
    data?.data.filter((tech) => {
      const { values } = tech as TechnologyDataResponse;
      const valuesSum = values.reduce((a, b) => a + b, 0);
      return valuesSum !== 0;
    }) || [];

  // Group technology inside data object by tags fetched from backend endpoint
  const tagsDictionary = tagsData?.tags || {};
  const techGroupedByTag: DataWithTags[] =
    prunedData.map((o) => {
      const { technology_name } = o as TechnologyDataResponse;
      const groupTag = Object.entries(tagsDictionary).find(([key]) => key === technology_name)?.[1] || '';
      return { ...(o as TechnologyDataResponse), tag: groupTag };
    }) || [];

  // For each area chart serie display aggregated values of all tag groups
  const tagChartSeries = techGroupedByTag.reduce((techArr, tech) => {
    const indexOfObjWithTag = techArr.findIndex((t) => t.technology_name === tech.tag);
    if (indexOfObjWithTag > -1) {
      const techWithTag = techArr[indexOfObjWithTag] as TechnologyDataResponse;
      techWithTag.values = techWithTag.values.map((value, index) => value + (techWithTag.values[index] || 0));
    } else {
      techArr.push({ values: tech.values, technology_name: tech.tag });
    }
    return techArr;
  }, [] as TechnologyDataResponse[]);

  const areaChartDataToUse = groupByTag ? tagChartSeries : prunedData;

  const areaChartSeries =
    areaChartDataToUse.map((tech) => {
      const { values, technology_name } = tech as TechnologyDataResponse;
      const { title: techTitle, color } = getTechnologyProps({ name: technology_name, dataCategory });
      const techData = yearsArr.map((y, yIndex) => [y, (values[yIndex] || 0) / conversionBase]);
      return {
        color,
        name: techTitle,
        type: 'area',
        data: techData,
      };
    }) || [];

  const initCategories =
    prunedData.map((tech) => {
      const { technology_name } = tech as TechnologyDataResponse;
      return technology_name;
    }) || [];

  // For bar chart data display every technology without aggregation by tag
  const barChartData = (
    data?.data.map((tech) => {
      const { values, technology_name } = tech as TechnologyDataResponse;
      const { title: techTitle } = getTechnologyProps({ name: technology_name, dataCategory });
      const dataIndex = yearsArr.indexOf(year) || 0;
      return {
        technology_name: techTitle,
        value: (values[dataIndex] || 0) / conversionBase,
      };
    }) || []
  ).filter(({ value }) => !!value || value !== 0);

  const barChartSeries = barChartData.map((d) => d.value);
  const barChartCategories = barChartData.map((d) => d.technology_name);

  const sumValue = barChartSeries.reduce((a, b) => a! + b!, 0);
  const sumAdjusted = roundToTwoDec(sumValue || 0);

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
            xaxis: { tickAmount: yearsArr.length },
            yaxis: { title: { text: unit } },
          }}
        />
      </Grid>
      <Grid item xs={12} lg={6} height="100%" p={1} pl="10px">
        <BarChart
          isLoading={isLoading}
          series={[{ data: barChartSeries as number[] }]}
          sumValue={showSumValue ? `${sumAdjusted} ${unit}` : ''}
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
                const { color } = getTechnologyProps({ name: categoryName, dataCategory });
                return color;
              },
            ],
          }}
        />
      </Grid>
    </Grid>
  );
};

export default TechnologyChartRow;
