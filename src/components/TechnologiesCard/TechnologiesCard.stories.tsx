import type { Meta, StoryFn } from '@storybook/react';

import TechnologiesCardComponent, { type TechnologiesCardProps } from './TechnologiesCard';

type ComponentType = typeof TechnologiesCardComponent;

export default {
  title: 'Components / TechnologiesCard',
  component: TechnologiesCardComponent,
} as Meta;

export const TechnologiesCard: StoryFn<ComponentType> = (args) => <TechnologiesCardComponent {...args} />;

TechnologiesCard.args = {
  dotColor: '#663399',
  title: 'LKT1 PC+KSE',
  technologies: ['Pompa ciepła', 'Energia z KSE', 'Kocioł gazowy', 'Technologia 4'],
} as TechnologiesCardProps;
