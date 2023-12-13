/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { Http } from './Http';

export { ApiError } from './core/ApiError';
export { BaseHttpRequest } from './core/BaseHttpRequest';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export { AggregateType } from './models/AggregateType';
export type { AreaData } from './models/AreaData';
export type { BuildingGeometry } from './models/BuildingGeometry';
export type { BuildingProperty } from './models/BuildingProperty';
export { DataCategory } from './models/DataCategory';
export type { EmissionDataResponse } from './models/EmissionDataResponse';
export type { EnergyDataResponse } from './models/EnergyDataResponse';
export type { HTTPValidationError } from './models/HTTPValidationError';
export { ScenarioId } from './models/ScenarioId';
export type { TechnologyDataResponse } from './models/TechnologyDataResponse';
export type { UsagePerBuildingData } from './models/UsagePerBuildingData';
export type { ValidationError } from './models/ValidationError';
export type { ZefirAggregateDetail } from './models/ZefirAggregateDetail';
export type { ZefirAggregateStacks } from './models/ZefirAggregateStacks';
export type { ZefirAggregateTotals } from './models/ZefirAggregateTotals';
export type { ZefirDataResponse } from './models/ZefirDataResponse';
export type { ZefirMapResponse } from './models/ZefirMapResponse';
export type { ZefirTechnologyTranslationResponse } from './models/ZefirTechnologyTranslationResponse';
export type { ZefirYearsResponse } from './models/ZefirYearsResponse';

export { DefaultService } from './services/DefaultService';
