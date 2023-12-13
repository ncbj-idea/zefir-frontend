/* eslint-disable react/jsx-key */
import { type ReactNode } from 'react';

import { EmissionChartRow, TechnologyChartRow } from '@/components';
import { DataCategory } from '@/types';

import { Fuel } from './charts';

type ChartRow = ReactNode[];

interface ScenarioConfig {
  powerEnergy: ChartRow;
  emissionsCons: ChartRow;
  costs: ChartRow;
}

const scenarioConfig: ScenarioConfig = {
  powerEnergy: [
    <TechnologyChartRow
      groupByTag
      conversionBase={10 ** 3}
      dataCategory={DataCategory.INSTALLED_POWER}
      title="Moc zainstalowana"
      unit="GW"
    />,
    <TechnologyChartRow
      groupByTag
      conversionBase={10 ** 3}
      dataCategory={DataCategory.EE_PRODUCTION}
      title="Produkcja energii elektrycznej"
      unit="TWh"
    />,
    <TechnologyChartRow
      groupByTag
      conversionBase={10 ** 3}
      dataCategory={DataCategory.HEAT_PRODUCTION}
      title="Produkcja ciepła"
      unit="TWh"
    />,
    <TechnologyChartRow
      groupByTag
      conversionBase={10 ** 3}
      dataCategory={DataCategory.COLD_PRODUCTION}
      title="Produkcja chłodu"
      unit="TWh"
    />,
    <TechnologyChartRow
      conversionBase={10 ** 3}
      dataCategory={DataCategory.EE_USAGE}
      title="Zużycie energii elektrycznej"
      unit="TWh"
    />,
    <TechnologyChartRow
      conversionBase={10 ** 3}
      dataCategory={DataCategory.HEAT_USAGE}
      title="Zużycie ciepła"
      unit="TWh"
    />,
    <TechnologyChartRow
      conversionBase={10 ** 3}
      dataCategory={DataCategory.COLD_USAGE}
      title="Zużycie chłodu"
      unit="TWh"
    />,
    <TechnologyChartRow
      groupByTag
      conversionBase={10 ** 3}
      dataCategory={DataCategory.AMOUNT_OF_DEVICES}
      title="Liczba zainstalowanych urządzeń"
      unit="tys."
    />,
  ],
  emissionsCons: [<Fuel conversionBase={10 ** 3} />, <EmissionChartRow conversionBase={10 ** 3} />],
  costs: [
    <TechnologyChartRow
      showSumValue
      conversionBase={10 ** 6}
      dataCategory={DataCategory.TOTAL_COSTS}
      title="Koszty całkowite (TOTAL)"
      unit="mln. PLN"
    />,
    <TechnologyChartRow
      groupByTag
      showSumValue
      conversionBase={10 ** 6}
      dataCategory={DataCategory.CAPEX}
      title="Koszty inwestycyjne (CAPEX)"
      unit="mln. PLN"
    />,
    <TechnologyChartRow
      groupByTag
      showSumValue
      conversionBase={10 ** 6}
      dataCategory={DataCategory.OPEX}
      title="Koszty stałe (OPEX)"
      unit="mln. PLN"
    />,
    <TechnologyChartRow
      groupByTag
      showSumValue
      conversionBase={10 ** 6}
      dataCategory={DataCategory.ETS}
      title="Koszty emisji (ETS)"
      unit="mln. PLN"
    />,
    <TechnologyChartRow
      groupByTag
      showSumValue
      conversionBase={10 ** 6}
      dataCategory={DataCategory.VAR_COST}
      title="Koszty zmienne"
      unit="mln. PLN"
    />,
  ],
};

export { scenarioConfig };
