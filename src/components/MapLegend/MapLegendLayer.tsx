import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Box, CardContent, Checkbox, Collapse, FormControlLabel, IconButton } from '@mui/material';
import type { Dispatch, FC } from 'react';

import colors from '@/theme/colors';

import Tooltip from '../Tooltip';
import MapLegendLayerCategories from './MapLegendLayerCategories';
import type { LayersActionPayload, LegendLayer } from './types';

interface MapLegendLayerProps extends LegendLayer {
  dispatchLayers: Dispatch<LayersActionPayload>;
}

const MapLegendLayer: FC<MapLegendLayerProps> = ({ label, isOpen, checked, categories, disabled, dispatchLayers }) => {
  return (
    <CardContent sx={{ p: '8px 16px' }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              disabled={disabled}
              onChange={(ev) => {
                dispatchLayers({
                  type: ev.target.checked ? 'switchOnAll' : 'switchOffAll',
                  data: { layer: label },
                });
              }}
            />
          }
          label={label}
          componentsProps={{
            typography: { fontSize: '12px', fontWeight: 600, noWrap: true },
          }}
        />
        <Box>
          {label === 'Uzbrojenie terenu' && (
            <Tooltip text="Przybliż mapę, żeby zobaczyć uzbrojenie terenu." placement="bottom-start" smallSize />
          )}
          {label === 'Transport' && (
            <Tooltip text="Brak danych." placement="bottom-start" smallSize sx={{ mr: '32px' }} />
          )}
          {Boolean(categories.length) && (
            <IconButton
              onClick={() => dispatchLayers({ type: 'toggleCategoriesList', data: { layer: label, isOpen: !isOpen } })}
              sx={{ position: 'relative', left: '5px' }}
            >
              <ExpandLessIcon
                sx={{
                  color: colors.dark3,
                  fontSize: '16px',
                  transform: isOpen ? 'unset' : 'rotate(180deg)',
                  transition: 'transform .3s',
                }}
              />
            </IconButton>
          )}
        </Box>
      </Box>
      {Boolean(categories.length) && (
        <Collapse in={isOpen}>
          <MapLegendLayerCategories layerLabel={label} categories={categories} dispatchLayers={dispatchLayers} />
        </Collapse>
      )}
    </CardContent>
  );
};

export default MapLegendLayer;
