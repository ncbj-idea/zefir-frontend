import 'mapbox-gl/dist/mapbox-gl.css';

import { useTheme } from '@mui/material';
import { forwardRef } from 'react';
import type { MapProps as ReactMapGLProps, MapRef } from 'react-map-gl';
import ReactMapGL, { NavigationControl } from 'react-map-gl';

import { Env } from '@/libs/Env.mjs';

const plCenter = { lon: 19.2, lat: 52 };
const defaultViewState = {
  longitude: plCenter.lon,
  latitude: plCenter.lat,
  zoom: 6,
};

const Map = forwardRef<MapRef, ReactMapGLProps>(function MapWrapper(
  { children, initialViewState = defaultViewState, ...props },
  ref,
) {
  const theme = useTheme();

  return (
    <ReactMapGL
      ref={ref}
      initialViewState={initialViewState}
      mapboxAccessToken={Env.NEXT_PUBLIC_MAPBOX_API_KEY}
      mapStyle="mapbox://styles/mizydorski/clod1dh2w00im01pbgncn125p"
      style={{ fontFamily: theme.typography.fontFamily }}
      {...props}
    >
      {children}
      <NavigationControl />
    </ReactMapGL>
  );
});

export default Map;
