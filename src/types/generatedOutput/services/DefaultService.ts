/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AggregateType } from '../models/AggregateType';
import type { DataCategory } from '../models/DataCategory';
import type { ScenarioId } from '../models/ScenarioId';
import type { ZefirAggregateDetail } from '../models/ZefirAggregateDetail';
import type { ZefirAggregateStacks } from '../models/ZefirAggregateStacks';
import type { ZefirAggregateTotals } from '../models/ZefirAggregateTotals';
import type { ZefirDataResponse } from '../models/ZefirDataResponse';
import type { ZefirMapResponse } from '../models/ZefirMapResponse';
import type { ZefirTechnologyTranslationResponse } from '../models/ZefirTechnologyTranslationResponse';
import type { ZefirYearsResponse } from '../models/ZefirYearsResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DefaultService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Get Zefir Version
   * @returns any Successful Response
   * @throws ApiError
   */
  public getZefirVersionPyzefirVersionGet(): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/pyzefir_version',
    });
  }

  /**
   * Get Analytics Version
   * @returns any Successful Response
   * @throws ApiError
   */
  public getAnalyticsVersionZefirAnalyticsVersionGet(): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/zefir_analytics_version',
    });
  }

  /**
   * Get Zefir Data
   * @returns ZefirDataResponse Successful Response
   * @throws ApiError
   */
  public getZefirDataZefirDataGetDataGet({
    dataCategory,
    scenarioId,
  }: {
    dataCategory: DataCategory;
    scenarioId?: ScenarioId;
  }): CancelablePromise<ZefirDataResponse> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/zefir_data/get_data',
      query: {
        data_category: dataCategory,
        scenario_id: scenarioId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Sequence Of Years
   * @returns ZefirYearsResponse Successful Response
   * @throws ApiError
   */
  public getSequenceOfYearsZefirDataGetYearsGet({
    scenarioId,
  }: {
    scenarioId: ScenarioId;
  }): CancelablePromise<ZefirYearsResponse> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/zefir_data/get_years',
      query: {
        scenario_id: scenarioId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Translated Tags Map
   * @returns ZefirTechnologyTranslationResponse Successful Response
   * @throws ApiError
   */
  public getTranslatedTagsMapZefirDataGetTagsMapGet(): CancelablePromise<ZefirTechnologyTranslationResponse> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/zefir_data/get_tags_map',
    });
  }

  /**
   * Get Zefir Agg Totals
   * @returns ZefirAggregateTotals Successful Response
   * @throws ApiError
   */
  public getZefirAggTotalsZefirAggregateGetTotalsGet({
    aggregateType,
    scenarioId,
  }: {
    aggregateType: AggregateType;
    scenarioId?: ScenarioId;
  }): CancelablePromise<ZefirAggregateTotals> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/zefir_aggregate/get_totals',
      query: {
        aggregate_type: aggregateType,
        scenario_id: scenarioId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Zefir Agg Stacks
   * @returns ZefirAggregateStacks Successful Response
   * @throws ApiError
   */
  public getZefirAggStacksZefirAggregateGetStacksGet({
    aggregateType,
    scenarioId,
  }: {
    aggregateType: AggregateType;
    scenarioId?: ScenarioId;
  }): CancelablePromise<Array<ZefirAggregateStacks>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/zefir_aggregate/get_stacks',
      query: {
        aggregate_type: aggregateType,
        scenario_id: scenarioId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Zefir Agg Details
   * @returns ZefirAggregateDetail Successful Response
   * @throws ApiError
   */
  public getZefirAggDetailsZefirAggregateDetailsGet({
    aggregateType,
    scenarioId,
  }: {
    aggregateType: AggregateType;
    scenarioId?: ScenarioId;
  }): CancelablePromise<Array<ZefirAggregateDetail>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/zefir_aggregate/details',
      query: {
        aggregate_type: aggregateType,
        scenario_id: scenarioId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Filtered Geometries
   * @returns ZefirMapResponse Successful Response
   * @throws ApiError
   */
  public getFilteredGeometriesZefirMapGetBuildingsGet({
    bbox,
  }: {
    /**
     * Bounding box as a list of coordinates
     */
    bbox: Array<number>;
  }): CancelablePromise<Array<ZefirMapResponse>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/zefir_map/get_buildings',
      query: {
        bbox: bbox,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
