/* eslint-disable react/jsx-key */
import { type ReactNode } from 'react';

import {
  AnnualPowerConsGrid,
  BuildingsHeatSources,
  GasNetConnections,
  HeatConsumptionInBuildings,
  HeatingNetConnections,
} from './charts';

interface BaseConfig {
  rows: Array<[ReactNode?, ReactNode?]>;
}

const baseConfig: BaseConfig = {
  rows: [
    [<HeatConsumptionInBuildings />, <BuildingsHeatSources />],
    [<HeatingNetConnections />, <GasNetConnections />],
    [<AnnualPowerConsGrid />, undefined],
  ],
};

export { baseConfig };
