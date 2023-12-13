import { Box, Card, CardContent, Divider, IconButton, Typography } from '@mui/material';
import type { Dispatch, FC } from 'react';
import { Fragment, useEffect, useRef, useState } from 'react';

import { mapLegendStorageKey } from '@/config';
import { CloseIcon, LayersIcon } from '@/icons';
import colors from '@/theme/colors';

import { Scrollbar } from '../Scrollbar';
import MapLegendLayer from './MapLegendLayer';
import type { LayersActionPayload, LegendLayer, LegendLayerKey, LegendLayers } from './types';

interface MapLegendProps {
  layers: LegendLayers;
  dispatchLayers: Dispatch<LayersActionPayload>;
}

const MapLegend: FC<MapLegendProps> = ({ layers, dispatchLayers }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [maxScrollbarHeight, setMaxScrollbarHeight] = useState<number | undefined>();

  const legendScrollContainer = useRef<HTMLDivElement>(null);

  const saveMapLegendStateToStorage = () => {
    const layersKeys = Object.keys(layers) as LegendLayerKey[];
    const onlyCheckedAndIsOpenValues = layersKeys.reduce(
      (layersToSave, layer) => {
        // eslint-disable-next-line no-param-reassign
        layersToSave[layer] = {
          isOpen: layers[layer].isOpen,
          checked: layers[layer].checked,
          categories: layers[layer].categories?.map((cat) => ({ checked: cat.checked, label: cat.label })),
        };

        return layersToSave;
      },
      {} as { [key in LegendLayerKey]: Partial<LegendLayer> },
    );
    window.localStorage.setItem(mapLegendStorageKey, JSON.stringify(onlyCheckedAndIsOpenValues));
  };

  useEffect(() => {
    if (legendScrollContainer?.current?.offsetHeight) {
      setMaxScrollbarHeight(legendScrollContainer.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    return () => {
      saveMapLegendStateToStorage();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isOpen) {
    return (
      <Card sx={{ position: 'absolute', top: '20px', left: '20px', width: '46px', height: '60px' }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          onClick={() => setIsOpen(true)}
          sx={{ '&:hover': { color: 'primary.main', cursor: 'pointer' } }}
        >
          <LayersIcon sx={{ position: 'relative', top: '4px', left: '4px' }} />
        </Box>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        width: '23%',
        height: 'calc(100% - 55px)',
        minWidth: '230px',
        maxWidth: '300px',
      }}
    >
      <CardContent sx={{ position: 'relative', p: '18px 11px' }}>
        <Box display="flex">
          <LayersIcon
            sx={{
              color: 'primary.main',
              position: 'relative',
              top: '4px',
              left: '4px',
              mr: '12px',
            }}
          />
          <Typography fontSize="14px" fontWeight={600}>
            Warstwy
          </Typography>
          <Box position="absolute" top="8px" right="6px">
            <IconButton onClick={() => setIsOpen(false)}>
              <CloseIcon
                sx={{ position: 'relative', top: '4px', left: '4px', color: colors.dark3, fontSize: '28px' }}
              />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
      <Divider />
      <Box ref={legendScrollContainer} height="calc(100% - 68px)">
        <Scrollbar sx={{ maxHeight: maxScrollbarHeight, overflowX: 'hidden' }}>
          {Object.keys(layers).map((layerKey, index) => {
            if (index === Object.keys(layers).length - 1) {
              return (
                <MapLegendLayer
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  {...layers[layerKey as LegendLayerKey]}
                  dispatchLayers={dispatchLayers}
                />
              );
            }
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={index}>
                <MapLegendLayer {...layers[layerKey as LegendLayerKey]} dispatchLayers={dispatchLayers} />
                <Divider />
              </Fragment>
            );
          })}
        </Scrollbar>
      </Box>
    </Card>
  );
};

export default MapLegend;
