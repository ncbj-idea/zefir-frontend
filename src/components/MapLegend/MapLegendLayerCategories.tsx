import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import type { Dispatch, FC } from 'react';

import colors from '@/theme/colors';

import type { LayersActionPayload, LegendLayerCategory, LegendLayerKey } from './types';

interface MapLegendLayerCategoriesProps {
  layerLabel: LegendLayerKey;
  categories: LegendLayerCategory[];
  dispatchLayers: Dispatch<LayersActionPayload>;
}

const MapLegendLayerCategories: FC<MapLegendLayerCategoriesProps> = ({ layerLabel, categories, dispatchLayers }) => {
  return (
    <Box position="relative" bottom="4px" ml="32px">
      {categories.map((category, index) => (
        <FormControlLabel
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          control={
            <Checkbox
              sx={{ p: '5px' }}
              checked={category.checked}
              onChange={(ev) => {
                dispatchLayers({
                  type: ev.target.checked ? 'switchOn' : 'switchOff',
                  data: { layer: layerLabel, category: category.label },
                });
              }}
            />
          }
          sx={{ width: '100%' }}
          label={
            <>
              {category.color && (
                <Box display="inline-block" width="10px" height="10px" bgcolor={category.color} mr="5px" />
              )}
              <Typography display="inline" fontSize="12px" fontWeight={600} color={colors.dark3}>
                {category.label}
              </Typography>
            </>
          }
          componentsProps={{ typography: { lineHeight: 1 } }}
        />
      ))}
    </Box>
  );
};

export default MapLegendLayerCategories;
