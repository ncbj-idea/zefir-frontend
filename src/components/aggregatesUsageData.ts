import { AggregateType } from '@/types';

const aggregatesUsageData = {
  [AggregateType.SINGLE_FAMILY]: {
    heat: {
      very_high: 205.0,
      high: 158.0,
      average: 78.0,
      low: 56.26,
    },
    electricity: {
      very_high: 32.08,
      high: 32.08,
      average: 32.08,
      low: 32.08,
    },
    cooling: {
      very_high: 2.05,
      high: 1.58,
      average: 0.78,
      low: 0.56,
    },
  },
  [AggregateType.MULTI_FAMILY]: {
    heat: {
      very_high: 180.0,
      high: 123.0,
      average: 80.0,
      low: 50.11,
    },
    electricity: {
      very_high: 32.08,
      high: 32.08,
      average: 32.08,
      low: 32.08,
    },
    cooling: {
      very_high: 1.8,
      high: 1.24,
      average: 0.8,
      low: 0.5,
    },
  },
  [AggregateType.SERVICES]: {
    heat: {
      very_high: 210.0,
      high: 199.0,
      average: 164.0,
      low: 70.0,
    },
    electricity: {
      very_high: 32.08,
      high: 32.08,
      average: 32.08,
      low: 32.08,
    },
    cooling: {
      very_high: 4.2,
      high: 3.98,
      average: 3.28,
      low: 1.4,
    },
  },
  [AggregateType.OFFICES_SHOPS]: {
    heat: {
      very_high: 210.0,
      high: 156.0,
      average: 124.0,
      low: 56.7,
    },
    electricity: {
      very_high: 32.08,
      high: 32.08,
      average: 32.08,
      low: 32.08,
    },
    cooling: {
      very_high: 5.25,
      high: 3.9,
      average: 3.1,
      low: 1.42,
    },
  },
  [AggregateType.OTHER]: {
    heat: {
      very_high: 70.0,
      high: 164.0,
      average: 199.0,
      low: 210.0,
    },
    electricity: {
      very_high: 32.08,
      high: 32.08,
      average: 32.08,
      low: 32.08,
    },
    cooling: {
      very_high: 2.1,
      high: 1.99,
      average: 1.64,
      low: 0.7,
    },
  },
};

export { aggregatesUsageData };
