/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BuildingGeometry } from './BuildingGeometry';
import type { BuildingProperty } from './BuildingProperty';

export type ZefirMapResponse = {
  type?: string;
  id: number;
  geometry: BuildingGeometry;
  properties: BuildingProperty;
};
