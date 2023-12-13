/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TechnologyDataResponse } from './TechnologyDataResponse';

export type EmissionDataResponse = {
  emission_type: string;
  data: Array<TechnologyDataResponse>;
};
