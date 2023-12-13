'use client';

import { Box, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { type FC, useState } from 'react';
import useSWRImmutable from 'swr/immutable';

import { http } from '@/api';
import { AggregateAccordion, IconSummary, TechnologiesCard, Tooltip, UsageSummary } from '@/components';
import { HomeIcon, M2Icon, PercentIcon } from '@/icons';
import { useSelector } from '@/store';
import { type AggregateType, type ZefirAggregateDetail } from '@/types';
import { formatThousands } from '@/utils/formatThousands';
import { getStackColor } from '@/utils/getStackColor';
import { roundToTwoDec } from '@/utils/roundTo2Dec';

import AggregatesCharts from './AggregatesCharts';
import { aggregatesUsageData } from './aggregatesUsageData';

export interface AggregatesInnerTabProps {
  isScenario?: boolean;
  aggType: AggregateType;
  title: string;
}

const AggregatesInnerTab: FC<AggregatesInnerTabProps> = ({ isScenario = false, aggType, title }) => {
  const params = useParams();
  const scenarioId = params.scenarioId ? Number(params.scenarioId) : undefined;

  const currYear = useSelector((state) => {
    if (scenarioId) {
      return state.ui.currScenarioYear[scenarioId];
    }
    return 2023;
  });
  const [accordionIndex, setAccordionIndex] = useState<null | number>(null);

  const { data: totalsData } = useSWRImmutable(['/zefir_data/get_totals', aggType, scenarioId], ([, ...args]) =>
    http.default.getZefirAggTotalsZefirAggregateGetTotalsGet({
      aggregateType: args[0],
      scenarioId: args[1],
    }),
  );
  const { data: stacksData } = useSWRImmutable(['/zefir_aggregate/get_stacks', aggType, scenarioId], ([, ...args]) =>
    http.default.getZefirAggStacksZefirAggregateGetStacksGet({
      aggregateType: args[0],
      scenarioId: args[1],
    }),
  );
  const { data: detailsData } = useSWRImmutable(['/zefir_aggregate/details', aggType, scenarioId], ([, ...args]) =>
    http.default.getZefirAggDetailsZefirAggregateDetailsGet({
      aggregateType: args[0],
      scenarioId: args[1],
    }),
  );
  const { data: yearData } = useSWRImmutable(
    scenarioId ? ['/zefir_aggregate/get_years', scenarioId] : null,
    ([, ...args]) => http.default.getSequenceOfYearsZefirDataGetYearsGet({ scenarioId: args[0] }),
  );

  const yearsArr = (yearData?.years || []).map((el) => el + 2023);
  const year = (isScenario ? currYear : yearsArr[0]) || 2023;
  const dataIndex = yearsArr.indexOf(year) < 0 ? 0 : yearsArr.indexOf(year);

  // Area data
  const totalUsableArea = roundToTwoDec(totalsData?.total_usable_area?.[dataIndex] || 0);

  const getConsData = ({ consName, key }: { consName: string; key: keyof ZefirAggregateDetail }) => {
    return detailsData?.find((a) => a.name === consName)?.[key]?.[dataIndex] || 0;
  };

  const veryHighCons = getConsData({ consName: 'very_high_consumption', key: 'agg_area' }) as number;
  const highCons = getConsData({ consName: 'high_consumption', key: 'agg_area' }) as number;
  const mediumCons = getConsData({ consName: 'average_consumption', key: 'agg_area' }) as number;
  const lowCons = getConsData({ consName: 'low_consumption', key: 'agg_area' }) as number;

  const getConsPercentage = (consValue: number) => {
    if (!!consValue && !!totalUsableArea) {
      return Math.round((consValue / totalUsableArea) * 100);
    }
    return 0;
  };

  const veryHighConsPercentage = getConsPercentage(veryHighCons);
  const highConsPercentage = getConsPercentage(highCons);
  const mediumConsPercentage = getConsPercentage(mediumCons);
  const lowConsPercentage = getConsPercentage(lowCons);

  // Buildings data
  const totalAmntOfBuildings = roundToTwoDec(totalsData?.total_amount_of_buildings?.[dataIndex] || 0);

  const veryHighBuildings = getConsData({ consName: 'very_high_consumption', key: 'agg_amount_of_building' }) as number;
  const highBuildings = getConsData({ consName: 'high_consumption', key: 'agg_amount_of_building' }) as number;
  const mediumBuildings = getConsData({ consName: 'average_consumption', key: 'agg_amount_of_building' }) as number;
  const lowBuildings = getConsData({ consName: 'low_consumption', key: 'agg_amount_of_building' }) as number;

  const { cooling, electricity, heat } = aggregatesUsageData[aggType];

  return (
    <Box style={{ height: '100%' }}>
      <Typography fontWeight="bold" fontSize="18px" mb="20px">
        {title}
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="space-between" height="50px" mb="40px">
        <IconSummary text="Powierzchnia użytkowa" value={`${formatThousands(totalUsableArea)} m²`} icon={<M2Icon />} />
        <IconSummary text="Liczba budynków" value={formatThousands(totalAmntOfBuildings)} icon={<HomeIcon />} />
        <IconSummary text="Podział powierzchni użytkowej względem poziomu zużycia ciepła" icon={<PercentIcon />} />
        <UsageSummary
          percentage={`${veryHighConsPercentage}%`}
          title="B. duże zużycie"
          amount={`${heat.very_high} kWh/m²/rok`}
          iconVariant="100%"
        />
        <Box sx={{ width: '1px', height: '100%', backgroundColor: 'divider' }} />
        <UsageSummary
          percentage={`${highConsPercentage}%`}
          title="Duże zużycie"
          amount={`${heat.high} kWh/m²/rok`}
          iconVariant="75%"
        />
        <Box sx={{ width: '1px', height: '100%', backgroundColor: 'divider' }} />
        <UsageSummary
          percentage={`${mediumConsPercentage}%`}
          title="Średnie zużycie"
          amount={`${heat.average} kWh/m²/rok`}
          iconVariant="50%"
        />
        <Box sx={{ width: '1px', height: '100%', backgroundColor: 'divider' }} />
        <UsageSummary
          percentage={`${lowConsPercentage}%`}
          title="Niskie zużycie"
          amount={`${heat.low} kWh/m²/rok`}
          iconVariant="25%"
        />
      </Box>
      <Box display="flex" alignItems="center" mb="15px">
        <Typography color="text.secondary" fontSize="12px">
          Lokalne koszyki technologiczne
        </Typography>
        <Tooltip text="Informacje dotyczące lokalnych koszyków technologicznych" />
      </Box>
      <Box
        mb="50px"
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        {stacksData?.map((stack, index) => {
          const stackTitle = `LKT${index + 1} ${stack.stack_name}`;
          const technologies = stack.techs;
          return (
            <TechnologiesCard
              key={stack.stack_name}
              dotColor={getStackColor(index)}
              title={stackTitle}
              technologies={technologies}
            />
          );
        })}
      </Box>
      <Typography fontWeight="bold" fontSize="16px" mb="40px">
        Podział powierzchni użytkowej względem poziomu zużycia ciepła
      </Typography>
      <Box mb="40px">
        <AggregateAccordion
          id={0}
          title="Bardzo duże zużycie"
          iconVariant="100%"
          area={veryHighCons}
          areaPercent={veryHighConsPercentage}
          buildings={veryHighBuildings}
          electricityUsage={electricity.very_high}
          coolingUsage={cooling.very_high}
          heatUsage={heat.very_high}
          expanded={accordionIndex === 0}
          onChange={(id) => setAccordionIndex(id)}
        >
          <AggregatesCharts isScenario={isScenario} year={year} consType="very_high_consumption" aggType={aggType} />
        </AggregateAccordion>
        <AggregateAccordion
          id={1}
          title="Duże zużycie"
          iconVariant="75%"
          area={highCons}
          areaPercent={highConsPercentage}
          buildings={highBuildings}
          electricityUsage={electricity.high}
          coolingUsage={cooling.high}
          heatUsage={heat.high}
          expanded={accordionIndex === 1}
          onChange={(id) => setAccordionIndex(id)}
        >
          <AggregatesCharts isScenario={isScenario} year={year} consType="high_consumption" aggType={aggType} />
        </AggregateAccordion>
        <AggregateAccordion
          id={2}
          title="Średnie zużycie"
          iconVariant="50%"
          area={mediumCons}
          areaPercent={mediumConsPercentage}
          buildings={mediumBuildings}
          electricityUsage={electricity.average}
          coolingUsage={cooling.average}
          heatUsage={heat.average}
          expanded={accordionIndex === 2}
          onChange={(id) => setAccordionIndex(id)}
        >
          <AggregatesCharts isScenario={isScenario} year={year} consType="average_consumption" aggType={aggType} />
        </AggregateAccordion>
        <AggregateAccordion
          id={3}
          title="Niskie zużycie"
          iconVariant="25%"
          area={lowCons}
          areaPercent={lowConsPercentage}
          buildings={lowBuildings}
          electricityUsage={electricity.low}
          coolingUsage={cooling.low}
          heatUsage={heat.low}
          expanded={accordionIndex === 3}
          onChange={(id) => setAccordionIndex(id)}
        >
          <AggregatesCharts isScenario={isScenario} year={year} consType="low_consumption" aggType={aggType} />
        </AggregateAccordion>
      </Box>
    </Box>
  );
};

export default AggregatesInnerTab;
