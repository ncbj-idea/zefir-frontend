import type { Meta, StoryFn } from '@storybook/react';

import MiniPieChartComponent, { type MiniPieChartProps } from './MiniPieChart';

type ComponentType = typeof MiniPieChartComponent;

export default {
  title: 'Components / MiniPieChart',
  component: MiniPieChartComponent,
} as Meta;

export const MiniPieChart: StoryFn<ComponentType> = (args) => <MiniPieChartComponent {...args} />;

MiniPieChart.args = {
  variant: '75%',
  size: '100px',
} as MiniPieChartProps;
