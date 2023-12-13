'use client';

import HouseIcon from '@mui/icons-material/House';
import { Avatar, Box, Card, CardContent, Divider, Typography } from '@mui/material';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import merge from 'lodash.merge';
import type { Expression, LngLatLike } from 'mapbox-gl';
import proj4 from 'proj4';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { MapLayerMouseEvent, MapRef, ViewStateChangeEvent } from 'react-map-gl';
import { Layer, Source } from 'react-map-gl';
import type { SWRResponse } from 'swr';
import useImmutableSWR from 'swr/immutable';

import { Map } from '@/components/Map';
import { MapEmissionsLegend } from '@/components/MapEmissionsLegend';
import type { LegendLayerKey, LegendLayers } from '@/components/MapLegend';
import { MapLegend } from '@/components/MapLegend';
import { apiUrl, mapLegendStorageKey } from '@/config';
import { useMapLegendLayers } from '@/hooks';
import { useDispatch, useSelector } from '@/store';
import { setCurrentViewState } from '@/store/slices/ui';
import { fetcher } from '@/utils/fetcher';
import { getMapEmissionsScale } from '@/utils/getMapEmissionsScale';

const defaultLayers: LegendLayers = {
  'Funkcje budynków': {
    label: 'Funkcje budynków' as LegendLayerKey,
    isOpen: true,
    checked: true,
    categories: [
      { label: 'Biurowe', color: '#B0518C', checked: true },
      { label: 'Handlowo-usługowe', color: '#8F76B7', checked: true },
      { label: 'Jednorodzinne', color: '#A6D984', checked: true },
      { label: 'Wielorodzinne', color: '#6B9F60', checked: true },
      { label: 'Pozostałe', color: '#767E87', checked: true },
    ],
  },
  'Uzbrojenie terenu': {
    label: 'Uzbrojenie terenu' as LegendLayerKey,
    isOpen: true,
    checked: true,
    categories: [
      { label: 'Sieć gazowa', color: '#CED015', checked: true },
      { label: 'Sieć ciepłownicza', color: '#B23DFF', checked: true },
    ],
  },
  'Źródło ogrzewania': {
    label: 'Źródło ogrzewania' as LegendLayerKey,
    isOpen: false,
    checked: false,
    categories: [
      { label: 'Grzejniki elektryczne', color: '#6A9DCF', checked: false },
      { label: 'Kotły gazowe', color: '#F2CB0A', checked: false },
      { label: 'Kotły olejowe', color: '#F3A149', checked: false },
      { label: 'Kotły węglowe', color: '#6B6B6B', checked: false },
      { label: 'Pompy ciepła', color: '#086296', checked: false },
      {
        label: 'Przyłączenie do sieci ciepłowniczej',
        color: '#D86F53',
        checked: false,
      },
      { label: 'Kolektory słoneczne', color: '#3C3E3F', checked: false },
      { label: 'Kocioł węglowy (wysokoemisyjny)', color: '#212323', checked: false },
    ],
  },
  Kotły: {
    label: 'Kotły' as LegendLayerKey,
    isOpen: true,
    checked: true,
    categories: [{ label: 'Kotły wysokoemisyjne', color: '#000000', checked: true }],
  },
  Emisje: {
    label: 'Emisje' as LegendLayerKey,
    isOpen: false,
    checked: false,
    categories: [
      { label: 'CO2', checked: false },
      { label: 'CO', checked: false },
      { label: 'SOX', checked: false },
      { label: 'NOX', checked: false },
      { label: 'PM10', checked: false },
      { label: 'PM2,5', checked: false },
      { label: 'Benzo(a)piren', checked: false },
    ],
  },
  Transport: {
    label: 'Transport' as LegendLayerKey,
    isOpen: false,
    checked: false,
    disabled: true,
    categories: [],
  },
};

function getAllLabels(obj: LegendLayers): LegendLayerKey | string[] {
  const labels: string[] = [];

  Object.keys(obj).forEach((key) => {
    const { label, categories } = obj[key as LegendLayerKey];

    labels.push(label);

    if (categories) {
      labels.push(...categories.map((cat) => cat.label));
    }
  });

  return labels;
}

const areLabelsFromLayersTheSame = (data1: LegendLayers, data2: LegendLayers) => {
  const allLabels1 = getAllLabels(data1);
  const allLabels2 = getAllLabels(data2);

  return isEqual(allLabels1, allLabels2);
};

const getInitLayers = () => {
  if (typeof window === 'undefined') return defaultLayers;

  const rawLayersFromStorage = window.localStorage.getItem(mapLegendStorageKey);

  if (rawLayersFromStorage) {
    try {
      const layersFromStorage = JSON.parse(rawLayersFromStorage);

      // If there are any differences in labels, remove those layers from storage
      if (areLabelsFromLayersTheSame(defaultLayers, layersFromStorage)) {
        return merge(defaultLayers, layersFromStorage);
      }
      window.localStorage.removeItem(mapLegendStorageKey);
    } catch (ex) {
      window.localStorage.removeItem(mapLegendStorageKey);
      return defaultLayers;
    }
  }

  return defaultLayers;
};

proj4.defs(
  'EPSG:2180',
  '+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs',
);
proj4.defs(
  'EPSG:3857',
  '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs',
);

function useImmutableCancelableSWR(key: string | null, opts?: any): [SWRResponse<any, any, any>, AbortController] {
  const controller = new AbortController();
  return [useImmutableSWR(key, (url) => fetcher(url, { signal: controller.signal }), opts), controller];
}

const BuildingsMap = () => {
  const dispatch = useDispatch();
  const initLayers = useMemo(getInitLayers, []);

  const [hoveredBuildingInfo, setHoveredBuildingInfo] = useState<any>();
  const [layers, dispatchLayers] = useMapLegendLayers(initLayers);
  const [buildingsPolygonSearchParams, setBuildingsPolygonSearchParams] = useState<URLSearchParams | undefined>();

  const { data: features } = useImmutableSWR('/static/buildingsPointsFeatures.geojson', fetcher);
  const [{ data: featuresPolygons }, controller] = useImmutableCancelableSWR(
    buildingsPolygonSearchParams
      ? `${apiUrl}/zefir_map/get_buildings?${buildingsPolygonSearchParams.toString()}`
      : null,
  );

  const fromSessionMapViewState = useSelector((state) => state.ui.mapViewState);

  const mapRef = useRef<MapRef>();

  // In case of react-map-gl there is a need to use useCallback as useRef and then pass value to useRef
  const mapRefCallback = useCallback((node: MapRef | null) => {
    if (node) {
      mapRef.current = node;
    }
  }, []);

  const saveCurrentViewState = (map: MapRef) => {
    const { lng, lat } = map.getCenter();
    const bearing = map.getBearing();
    const padding = map.getPadding();
    const pitch = map.getPitch();
    const zoom = map.getZoom();

    dispatch(setCurrentViewState({ longitude: lng, latitude: lat, bearing, padding, pitch, zoom }));
  };

  // Before unmount save viewstate to session
  useEffect(() => {
    return () => {
      if (mapRef?.current) {
        saveCurrentViewState(mapRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMapHover = (ev: MapLayerMouseEvent) => {
    const { x, y } = ev.point;
    if (ev.features?.length) {
      setHoveredBuildingInfo({ feature: ev.features[0], x, y });
    } else if (!ev.features?.length && hoveredBuildingInfo) {
      setHoveredBuildingInfo(undefined);
    }
  };

  const in3857Out2180 = (bounds: string[]): string => {
    const projTransform = proj4('EPSG:3857', 'EPSG:2180');
    const EPSG3857SWIn = [Number(bounds[0]), Number(bounds[1])];
    const EPSG3857NEIn = [Number(bounds[2]), Number(bounds[3])];
    const EPSG2180SW = projTransform.forward(EPSG3857SWIn);
    const EPSG2180NE = projTransform.forward(EPSG3857NEIn);
    const formattedBounds = [
      EPSG2180SW[0]?.toString() || '',
      EPSG2180SW[1]?.toString() || '',
      EPSG2180NE[0]?.toString() || '',
      EPSG2180NE[1]?.toString() || '',
    ].join(',');
    return formattedBounds;
  };

  const colorsByBuildingType = layers['Funkcje budynków'].categories
    .map(({ label, checked, color }) => [label, checked ? color : 'transparent'])
    .flat();
  const colorForOtherTypes = '#767E87';

  const colorsByHeatType = layers['Źródło ogrzewania'].categories
    .map(({ label, checked, color }) => [label, checked ? color : 'transparent'])
    .flat();

  const isAnyBuildingLayerChecked = () => {
    return layers['Funkcje budynków'].checked || layers['Źródło ogrzewania'].checked || layers.Transport.checked;
  };

  const shouldShowClusteredLayers = () => {
    return layers['Funkcje budynków'].checked || layers['Źródło ogrzewania'].checked || layers.Kotły.checked;
  };

  const isGasChecked = layers['Uzbrojenie terenu'].categories?.[0]?.checked || false;
  const isHeatChecked = layers['Uzbrojenie terenu'].categories?.[1]?.checked || false;

  const queryString = [
    'https://wms.um.warszawa.pl/serwis',
    `?LAYERS=${isGasChecked ? 'SIEC_GAZOWA,' : ''}${isHeatChecked ? 'SIEC_CIEPLOWNICZA' : ''}`,
    '&REQUEST=GetMap',
    '&SERVICE=WMS',
    '&FORMAT=image/png',
    '&STYLES=,,,',
    '&VERSION=1.1.1',
    '&SRS=EPSG:2180',
    '&WIDTH=128',
    '&HEIGHT=128',
    `&BBOX={bbox-epsg-3857}`,
    '&TRANSPARENT=TRUE',
  ];

  const adjustHeatmapWeight = (): Expression | undefined => {
    const currEmissionType = layers.Emisje.categories?.find((c) => c.checked)?.label;

    if (currEmissionType) {
      return ['interpolate', ['linear'], ['get', currEmissionType], 0, 0, getMapEmissionsScale(currEmissionType), 1];
    }
    return undefined;
  };

  const getBoundsBasedOnExtremePoints = () => {
    // Those extreme points should be sent by backend, but at this moment we have static data
    const northPoint = { lng: 20.952912054650966, lat: 52.366522913237134 };
    const eastPoint = { lng: 21.253984816655617, lat: 52.25215714322937 };
    const southPoint = { lng: 21.082716635582898, lat: 52.099238164025536 };
    const westPoint = { lng: 20.853085964093367, lat: 52.19883739370678 };
    const points = [northPoint, eastPoint, southPoint, westPoint];

    const pointsLng = points.map((point) => point.lng);
    const pointsLat = points.map((point) => point.lat);

    const cornersLongLat: [LngLatLike, LngLatLike] = [
      [Math.min(...pointsLng), Math.min(...pointsLat)],
      [Math.max(...pointsLng), Math.max(...pointsLat)],
    ];

    return cornersLongLat;
  };

  const getFilteredFeatures = () => {
    if (!features) return [];
    const filteredFeatures = [...features];

    const buildingTypeFilters = layers['Funkcje budynków'].checked
      ? layers['Funkcje budynków'].categories.filter((cat) => cat.checked).map((cat) => cat.label)
      : [];
    const heatTypeFilters = layers['Źródło ogrzewania'].checked
      ? layers['Źródło ogrzewania'].categories.filter((cat) => cat.checked).map((cat) => cat.label)
      : [];
    const boilerEmissionsFilters = layers.Kotły.checked ? ['high_emission'] : [];

    if (buildingTypeFilters.length) {
      return filteredFeatures.filter((f) => buildingTypeFilters.includes(f.properties.buildingType));
    }
    if (heatTypeFilters.length) {
      return filteredFeatures.filter((f) => heatTypeFilters.includes(f.properties.heatType));
    }
    if (boilerEmissionsFilters.length) {
      return filteredFeatures.filter((f) => boilerEmissionsFilters.includes(f.properties.boilerEmission));
    }

    return features;
  };

  const bounds = useMemo(getBoundsBasedOnExtremePoints, []);
  const filteredFeatures = useMemo(getFilteredFeatures, [features, layers]);

  const checkedEmissionType = layers.Emisje.categories?.find((c) => c.checked)?.label;

  const initialViewState = { bounds, padding: { top: 50, right: 50, bottom: 50, left: 50 } };

  const handleMapMove = useCallback((ev: ViewStateChangeEvent) => {
    const marginFactor = 0.02;
    const margin = 2 ** (13 - ev.viewState.zoom) * marginFactor;
    const currBounds = ev.target.getBounds();
    const params = new URLSearchParams();

    /* eslint-disable no-underscore-dangle */
    params.append('bbox', (currBounds._sw.lng - margin).toString());
    params.append('bbox', (currBounds._sw.lat - margin).toString());
    params.append('bbox', (currBounds._ne.lng + margin).toString());
    params.append('bbox', (currBounds._ne.lat + margin).toString());
    /* eslint-enable no-underscore-dangle */

    setBuildingsPolygonSearchParams(params);
  }, []);

  const debouncedhandleMapMove = debounce(handleMapMove, 300);

  const onMapMoveEnd = useCallback(
    (ev: ViewStateChangeEvent) => {
      if (ev.viewState.zoom > 13) {
        controller?.abort();
        debouncedhandleMapMove(ev);
      }
    },
    [controller, debouncedhandleMapMove],
  );

  return (
    <Map
      reuseMaps
      ref={mapRefCallback}
      initialViewState={fromSessionMapViewState ?? initialViewState}
      onMouseMove={onMapHover}
      onMoveEnd={onMapMoveEnd}
      interactiveLayerIds={['building-points']}
      transformRequest={(url, resourceType) => {
        if (resourceType === 'Tile' && url.indexOf('wms.um.warszawa.pl') !== -1 && url.indexOf('BBOX') !== -1) {
          const originalURLWithoutBBOX = url.split('BBOX=')[1];
          const boundsFromURL = originalURLWithoutBBOX?.split('&TRANSPARENT')[0]?.split(',');
          const formattedBounds = in3857Out2180(boundsFromURL!);
          const oldURLSplit = url.split('&BBOX=')[0];
          const transformedURL = `${oldURLSplit}&BBOX=${formattedBounds}&TRANSPARENT=TRUE`;
          return { url: transformedURL };
        }
        return { url };
      }}
    >
      <Source
        id="building-polygons"
        type="geojson"
        data={{ type: 'FeatureCollection' as const, features: featuresPolygons }}
      >
        <Layer
          id="fill-building-polygon"
          minzoom={13}
          type="fill"
          paint={{
            ...(layers['Funkcje budynków'].checked && {
              'fill-color': ['match', ['get', 'buildingType'], ...colorsByBuildingType, colorForOtherTypes],
            }),
            ...(layers['Źródło ogrzewania'].checked && {
              'fill-color': ['match', ['get', 'heatType'], ...colorsByHeatType, colorForOtherTypes],
            }),
            'fill-opacity': 0.65,
          }}
        />

        <Layer
          id="outline-building-polygon"
          minzoom={13}
          type="line"
          paint={{
            ...(layers['Funkcje budynków'].checked && {
              'line-color': ['match', ['get', 'buildingType'], ...colorsByBuildingType, colorForOtherTypes],
            }),
            ...(layers['Źródło ogrzewania'].checked && {
              'line-color': ['match', ['get', 'heatType'], ...colorsByHeatType, colorForOtherTypes],
            }),
            'line-width': 1,
          }}
        />
      </Source>
      {!layers.Emisje.checked && (
        <Source
          id="building-points"
          type="geojson"
          cluster
          clusterMaxZoom={12}
          data={{ type: 'FeatureCollection' as const, features: filteredFeatures }}
        >
          {shouldShowClusteredLayers() && (
            <>
              <Layer
                source="building-points"
                id="clustered-points-circle"
                type="circle"
                filter={['has', 'point_count']}
                paint={{
                  'circle-color': ['step', ['get', 'point_count'], '#8BD16B', 100, '#EACA4E', 750, '#EF9757'],
                  'circle-radius': ['step', ['get', 'point_count'], 16, 100, 22, 750, 28],
                  'circle-stroke-width': ['step', ['get', 'point_count'], 4, 100, 5, 750, 6],
                  'circle-stroke-color': ['step', ['get', 'point_count'], '#BCDE98', 100, '#D6D583', 750, '#DFB09A'],
                }}
              />
              <Layer
                source="building-points"
                id="number-of-clustered-points"
                type="symbol"
                filter={['has', 'point_count']}
                layout={{
                  'text-field': ['get', 'point_count_abbreviated'],
                  'text-size': 12,
                }}
              />
            </>
          )}
          {isAnyBuildingLayerChecked() && (
            <Layer
              id="single-building-points"
              type="circle"
              maxzoom={13}
              filter={['!', ['has', 'point_count']]}
              paint={{
                'circle-radius': 5,
                'circle-opacity': 0.65,
                'circle-stroke-width': 1,
                'circle-stroke-opacity': 0.85,
                ...(layers['Źródło ogrzewania'].checked && {
                  'circle-color': ['match', ['get', 'heatType'], ...colorsByHeatType, colorForOtherTypes],
                  'circle-stroke-color': ['match', ['get', 'heatType'], ...colorsByHeatType, colorForOtherTypes],
                }),
                ...(layers['Funkcje budynków'].checked && {
                  'circle-color': ['match', ['get', 'buildingType'], ...colorsByBuildingType, colorForOtherTypes],
                  'circle-stroke-color': [
                    'match',
                    ['get', 'buildingType'],
                    ...colorsByBuildingType,
                    colorForOtherTypes,
                  ],
                }),
              }}
            />
          )}
          {layers.Kotły.checked && (
            <Layer
              id="high-boiler-emissions"
              type="circle"
              filter={['!', ['has', 'point_count']]}
              paint={{
                'circle-radius': 6,
                'circle-color': ['match', ['get', 'boilerEmission'], ...['high_emission', '#000000'], 'transparent'],
              }}
            />
          )}
        </Source>
      )}
      {layers['Uzbrojenie terenu'].checked && (
        <Source id="wms-land-development" type="raster" tileSize={128} tiles={[queryString.join('')]}>
          <Layer type="raster" />
        </Source>
      )}
      <Source id="emissions-heatmap" type="geojson" data={{ type: 'FeatureCollection' as const, features }}>
        {layers.Emisje.checked && (
          <Layer
            type="heatmap"
            paint={{
              'heatmap-weight': adjustHeatmapWeight(),
              'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 8, 0.6, 22, 0.3],
            }}
          />
        )}
      </Source>
      {hoveredBuildingInfo && (
        <Card
          sx={{
            position: 'absolute',
            top: hoveredBuildingInfo.y - 5,
            left: hoveredBuildingInfo.x + 5,
            minWidth: '200px',
            overflow: 'visible',
          }}
        >
          <CardContent sx={{ width: '95%' }}>
            <Box textAlign="center">
              <Avatar
                sx={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  bgcolor: 'black',
                  border: '4px solid white',
                }}
              >
                <HouseIcon />
              </Avatar>
            </Box>
            <Typography variant="h6" fontSize="14px" noWrap>
              ul. {hoveredBuildingInfo.feature.properties.address}
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Typography fontSize="12px">Miejscowość: {hoveredBuildingInfo.feature.properties.city}</Typography>
            <Typography fontSize="12px" sx={{ mt: '3px' }}>
              Typ: {hoveredBuildingInfo.feature.properties.buildingType}
            </Typography>
          </CardContent>
        </Card>
      )}
      <MapLegend layers={layers} dispatchLayers={dispatchLayers} />
      {layers.Emisje.checked && checkedEmissionType && <MapEmissionsLegend emissionType={checkedEmissionType} />}
    </Map>
  );
};

export default BuildingsMap;
