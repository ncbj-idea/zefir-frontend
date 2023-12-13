/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EmissionDataResponse } from './EmissionDataResponse';
import type { EnergyDataResponse } from './EnergyDataResponse';
import type { TechnologyDataResponse } from './TechnologyDataResponse';

export type ZefirDataResponse = {
  years: Array<number>;
  data: Array<TechnologyDataResponse | EmissionDataResponse | EnergyDataResponse>;
};
