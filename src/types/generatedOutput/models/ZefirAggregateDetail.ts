/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AreaData } from './AreaData';
import type { UsagePerBuildingData } from './UsagePerBuildingData';

export type ZefirAggregateDetail = {
  name: string;
  area: Array<AreaData>;
  energy_per_building: Array<UsagePerBuildingData>;
  agg_area: Array<number>;
  agg_amount_of_building: Array<number>;
};
