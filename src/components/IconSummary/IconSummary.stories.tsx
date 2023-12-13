import type { Meta, StoryFn } from '@storybook/react';

import { HomeIcon, M2Icon } from '@/icons';

import IconSummaryComponent, { type IconSummaryProps } from './IconSummary';

type ComponentType = typeof IconSummaryComponent;

export default {
  title: 'Components / IconSummary',
  component: IconSummaryComponent,
} as Meta;

export const IconSummaryValue: StoryFn<ComponentType> = (args) => <IconSummaryComponent {...args} />;

IconSummaryValue.args = {
  text: 'Powierzchnia użytkowa',
  value: '2 105 369 m²',
  icon: <M2Icon />,
} as IconSummaryProps;

export const IconSummaryText: StoryFn<ComponentType> = (args) => <IconSummaryComponent {...args} />;

IconSummaryText.args = {
  text: 'Podział powierzchni użytkowej względem poziomu zużycia ciepła',
  icon: <HomeIcon />,
} as IconSummaryProps;
