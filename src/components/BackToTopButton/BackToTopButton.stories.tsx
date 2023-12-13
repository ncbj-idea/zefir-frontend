import { Box } from '@mui/material';
import { useRef, useState } from '@storybook/client-api';
import type { Meta, StoryFn } from '@storybook/react';
import { type SyntheticEvent } from 'react';

import BackToTopButtonComponent from './BackToTopButton';

type ComponentType = typeof BackToTopButtonComponent;

export default {
  title: 'Components / BackToTopButton',
  component: BackToTopButtonComponent,
} as Meta;

export const BackToTopButton: StoryFn<ComponentType> = (args) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showBtn, setShowBtn] = useState(false);

  return (
    <Box
      sx={{ overflowY: 'scroll', height: '600px', position: 'relative', border: '1px solid black' }}
      onScroll={(e: SyntheticEvent) => {
        const target = e.target as HTMLDivElement;
        if (target.scrollTop > 0) {
          setShowBtn(true);
        } else {
          setShowBtn(false);
        }
      }}
    >
      <Box sx={{ height: '300vh' }} />
      <BackToTopButtonComponent
        {...args}
        sx={{ position: 'absolute !important' }}
        isVisible={showBtn}
        clickHandler={() => {
          if (containerRef?.current) {
            containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />
    </Box>
  );
};
