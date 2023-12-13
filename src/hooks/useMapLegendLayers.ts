import type { Dispatch } from 'react';
import { useReducer } from 'react';

import type { LayersActionPayload, LegendLayerKey, LegendLayers } from '@/components/MapLegend';

const switchLayersCategory = ({
  state,
  layer,
  category,
  checked,
}: {
  state: LegendLayers;
  layer: LegendLayerKey;
  category: string;
  checked: boolean;
}) => {
  const currCategory = state[layer]?.categories.find((cat) => category === cat.label);

  if (currCategory) {
    currCategory.checked = checked;
    // For at least one checked category - set also layer to be checked
    if (checked) {
      state[layer].checked = true;

      // If there is no more checked categories, change layer to be unchecked
    } else if (!state[layer]?.categories.some((cat) => cat.checked === true)) {
      state[layer].checked = false;
    }
  }
};

const switchEntireLayer = ({
  state,
  layer,
  checked,
}: {
  state: LegendLayers;
  layer: LegendLayerKey;
  checked: boolean;
}) => {
  state[layer].checked = checked;
  state[layer].categories.forEach((cat) => {
    // eslint-disable-next-line no-param-reassign
    cat.checked = checked;
  });
};

// Usually we can't see all the layers at once, so after switching on one, we have to switch off another one
const manageLayers = (state: LegendLayers, action: LayersActionPayload) => {
  if (!['switchOn', 'switchOnAll'].includes(action.type)) return;

  const checked = false;

  switch (action.data.layer) {
    case 'Funkcje budynków':
      switchEntireLayer({ state, layer: 'Źródło ogrzewania', checked });
      switchEntireLayer({ state, layer: 'Emisje', checked });
      switchEntireLayer({ state, layer: 'Transport', checked });
      break;
    case 'Uzbrojenie terenu':
      switchEntireLayer({ state, layer: 'Emisje', checked });
      break;
    case 'Źródło ogrzewania':
      switchEntireLayer({ state, layer: 'Funkcje budynków', checked });
      switchEntireLayer({ state, layer: 'Emisje', checked });
      switchEntireLayer({ state, layer: 'Transport', checked });
      break;
    case 'Emisje':
      switchEntireLayer({ state, layer: 'Funkcje budynków', checked });
      switchEntireLayer({ state, layer: 'Uzbrojenie terenu', checked });
      switchEntireLayer({ state, layer: 'Źródło ogrzewania', checked });
      switchEntireLayer({ state, layer: 'Kotły', checked });
      switchEntireLayer({ state, layer: 'Transport', checked });
      break;
    case 'Kotły':
      switchEntireLayer({ state, layer: 'Emisje', checked });
      break;
    case 'Transport':
      switchEntireLayer({ state, layer: 'Funkcje budynków', checked });
      switchEntireLayer({ state, layer: 'Kotły', checked });
      switchEntireLayer({ state, layer: 'Źródło ogrzewania', checked });
      switchEntireLayer({ state, layer: 'Emisje', checked });
      break;
    default:
  }
};

const layersReducer = (state: LegendLayers, action: LayersActionPayload) => {
  const { layer } = action.data;

  switch (action.type) {
    case 'switchOn':
      if (layer === 'Emisje') {
        const alreadyCheckedCategory = state[layer].categories?.find((cat) => cat.checked);
        if (alreadyCheckedCategory) {
          alreadyCheckedCategory.checked = false;
        }
      }
      switchLayersCategory({ state, layer, category: action.data.category, checked: true });

      break;
    case 'switchOff':
      switchLayersCategory({ state, layer, category: action.data.category, checked: false });
      break;
    case 'switchOnAll':
      if (layer === 'Emisje') {
        switchLayersCategory({ state, layer, category: 'CO2', checked: true });
      } else {
        switchEntireLayer({ state, layer, checked: true });
      }
      break;
    case 'switchOffAll':
      switchEntireLayer({ state, layer, checked: false });
      break;
    case 'toggleCategoriesList':
      state[layer].isOpen = action.data.isOpen;
      break;
    default:
  }

  if (action.type !== 'toggleCategoriesList') {
    manageLayers(state, action);
  }

  return { ...state };
};

export function useMapLegendLayers(
  initLayers: LegendLayers,
): [layers: LegendLayers, dispatchLayers: Dispatch<LayersActionPayload>] {
  const [layers, dispatchLayers] = useReducer(layersReducer, initLayers);

  return [layers, dispatchLayers];
}
