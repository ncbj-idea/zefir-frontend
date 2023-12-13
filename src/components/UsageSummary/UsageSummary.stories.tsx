import type { Meta, StoryFn } from '@storybook/react';

import UsageSummaryComponent, { type UsageSummaryProps } from './UsageSummary';

type ComponentType = typeof UsageSummaryComponent;

export default {
  title: 'Components / UsageSummary',
  component: UsageSummaryComponent,
} as Meta;

export const UsageSummary: StoryFn<ComponentType> = (args) => <UsageSummaryComponent {...args} />;

UsageSummary.args = {
  amount: '120-200 kWh/m²/rok',
  iconVariant: '75%',
  percentage: '15%',
  title: 'Duże zużycie',
} as UsageSummaryProps;
