export interface LegendLayerCategory {
  label: string;
  color?: string;
  checked: boolean;
}

export interface LegendLayer {
  label: LegendLayerKey;
  isOpen: boolean;
  checked: boolean;
  categories: LegendLayerCategory[];
  isListOpen?: boolean;
  disabled?: boolean;
}

export type LegendLayerKey =
  | 'Funkcje budynków'
  | 'Uzbrojenie terenu'
  | 'Źródło ogrzewania'
  | 'Kotły'
  | 'Emisje'
  | 'Transport';

export type LegendLayers = {
  [key in LegendLayerKey]: LegendLayer;
};

export type LayersActionPayload =
  | {
      type: 'switchOnAll' | 'switchOffAll';
      data: {
        layer: LegendLayerKey;
      };
    }
  | {
      type: 'switchOn' | 'switchOff';
      data: {
        layer: LegendLayerKey;
        category: string;
      };
    }
  | {
      type: 'toggleCategoriesList';
      data: {
        layer: LegendLayerKey;
        isOpen: boolean;
      };
    };
