import { useState } from '@storybook/client-api';
import type { Meta, StoryFn } from '@storybook/react';

import TabSelectComponent, { type TabSelectProps } from './TabSelect';

type ComponentType = typeof TabSelectComponent;

export default {
  title: 'Components / TabSelect',
  component: TabSelectComponent,
} as Meta;

export const TabSelect: StoryFn<ComponentType> = (args) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <TabSelectComponent
      {...args}
      activeItemIndex={activeIndex}
      setActiveItemIndex={(index) => {
        setActiveIndex(index);
      }}
    />
  );
};

TabSelect.args = {
  items: ['Jednorodzinne', 'Wielorodzinne', 'Biurowe', 'Handlowo-usługowe'],
} as TabSelectProps;
