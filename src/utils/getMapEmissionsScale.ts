interface EmissionsScaleMap {
  [key: string]: number;
}

export const getMapEmissionsScale = (key: string) => {
  const KilogramsScaleMap: EmissionsScaleMap = {
    CO2: 1000,
    CO: 500,
    NOX: 100,
    SOX: 100,
    PM10: 100,
    'PM2,5': 100,
    'Benzo(a)piren': 1,
  };

  return KilogramsScaleMap[key];
};
