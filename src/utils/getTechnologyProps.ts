import { DataCategory } from '@/types';

interface Dictionary {
  [key: string]: {
    title: string;
    color: string;
  };
}

const dictionary: Dictionary = {
  capex: {
    title: 'Koszty inwestycyjne (CAPEX)',
    color: '#438856',
  },
  opex: {
    title: 'Koszty stałe (OPEX)',
    color: '#73CB82',
  },
  ets: {
    title: 'Koszty emisji (ETS)',
    color: '#326BB1',
  },
  var_cost: {
    title: 'Koszty zmienne',
    color: '#B24483',
  },
  MULTI_FAMILY: {
    title: 'Wielorodzinne',
    color: '#549F45',
  },
  OFFICES_SHOPS: {
    title: 'Biurowe',
    color: '#B0518C',
  },
  SINGLE_FAMILY: {
    title: 'Jednorodzinne',
    color: '#A6D984',
  },
  COAL: {
    title: 'Węgiel kamienny',
    color: '#6B6B6B',
  },
  GAS: {
    title: 'Gaz ziemny',
    color: '#F2CB0A',
  },
  BIOMASS: {
    title: 'Biomasa',
    color: '#A2B874',
  },
  POWER_PLANT_COAL: {
    title: 'POWER_PLANT_COAL',
    color: '#AC9000',
  },
  PV_FARM: {
    title: 'PV_FARM',
    color: '#D2B41F',
  },
  CHP_COAL: {
    title: 'CHP_COAL',
    color: '#F2CB0A',
  },
  CHP_BIOMASS: {
    title: 'CHP_BIOMASS',
    color: '#49927E',
  },
  COAL_PLANT: {
    title: 'COAL_PLANT',
    color: '#5AC4A6',
  },
  GAS_PLANT: {
    title: 'GAS_PLANT',
    color: '#6B6B6B',
  },
  PV: {
    title: 'PV',
    color: '#8B6D5E',
  },
  HP: {
    title: 'HP',
    color: '#D2B41F',
  },
  COAL_BOILER: {
    title: 'COAL_BOILER',
    color: '#F2CB0A',
  },
  BATTERY: {
    title: 'BATTERY',
    color: '#49927E',
  },
  HEAT_STORAGE: {
    title: 'HEAT_STORAGE',
    color: '#6B6B6B',
  },
  GAS_BOILER: {
    title: 'GAS_BOILER',
    color: '#AC9000',
  },
  CHP_COAL_KSE: {
    title: 'CHP_COAL_KSE',
    color: '#AC9000',
  },
  POWER_PLANT_COAL_KSE: {
    title: 'POWER_PLANT_COAL_KSE',
    color: '#D2B41F',
  },
  EE: {
    title: 'Energia elektryczna',
    color: '#6A9DCF',
  },
  HEAT: {
    title: 'Ciepło',
    color: '#D86F53',
  },
};

const technologyColors = ['#AC9000', '#D2B41F', '#F2CB0A', '#49927E', '#5AC4A6', '#6B6B6B', '#8B6D5E'];
const buildingColors = ['#A6D984', '#549F45', '#B0518C', '#9A77D1'];
const emissionColors = ['#6B6B6B', '#F3A149', '#F2CB0A', '#8B6D5E'];
const costColors = ['#438856', '#73CB82', '#326BB1', '#6A9DCF', '#B24483'];
const fuelColors = ['#A2B874', '#8B6D5E', '#F3A149', '#F2CB0A', '#6B6B6B'];
const aggStacksColors = ['#28629B', '#CF6AAA', '#AAB2B9', '#EEBD69', '#70AAB9', '#B3CE84', '#B48557'];
const aggHeat = ['#6A9DCF', '#D86F53', '#8FD4D4'];

const getRandomColorForDataType = (dataCategory: DataCategory | 'agg_stacks' | 'agg_heat') => {
  let targetArr = technologyColors;
  switch (dataCategory) {
    case DataCategory.INSTALLED_POWER:
    case DataCategory.EE_PRODUCTION:
    case DataCategory.HEAT_PRODUCTION:
    case DataCategory.COLD_PRODUCTION:
    case DataCategory.AMOUNT_OF_DEVICES:
    case DataCategory.CAPEX:
    case DataCategory.OPEX:
    case DataCategory.ETS:
    case DataCategory.VAR_COST:
      targetArr = technologyColors;
      break;
    case DataCategory.TOTAL_COSTS:
      targetArr = costColors;
      break;
    case DataCategory.EMISSIONS:
      targetArr = emissionColors;
      break;
    case DataCategory.EE_USAGE:
    case DataCategory.HEAT_USAGE:
    case DataCategory.COLD_USAGE:
      targetArr = buildingColors;
      break;
    case DataCategory.FUEL_USAGE:
      targetArr = fuelColors;
      break;
    case 'agg_heat':
      targetArr = aggHeat;
      break;
    case 'agg_stacks':
      targetArr = aggStacksColors;
      break;
    default:
      break;
  }
  return targetArr[Math.floor(Math.random() * targetArr.length)]!;
};

const getTechnologyProps = ({
  name,
  dataCategory,
}: {
  name: string | undefined;
  dataCategory: DataCategory | 'agg_stacks' | 'agg_heat';
}): { title: string; color: string } => {
  if (!name) {
    return {
      title: 'undefined',
      color: getRandomColorForDataType(dataCategory),
    };
  }
  if (name in dictionary) {
    return dictionary[name]!;
  }
  return {
    title: name,
    color: getRandomColorForDataType(dataCategory),
  };
};

export { getTechnologyProps };
