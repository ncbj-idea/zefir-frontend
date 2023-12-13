import { Box, Button } from '@mui/material';
import { type FC } from 'react';

import colors from '@/theme/colors';

export interface TabSelectProps {
  items: string[];
  activeItemIndex: number;
  setActiveItemIndex: (index: number) => void;
}

const TabSelect: FC<TabSelectProps> = ({ items, activeItemIndex, setActiveItemIndex }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        border: `1px solid ${colors.gray4}`,
        borderRadius: '30px',
        padding: '11px',
        display: 'flex',
        gap: '12px',
        width: 'fit-content',
        zIndex: 9,
        position: 'relative',
      }}
    >
      {items.map((itemContent, index) => {
        const isActive = index === activeItemIndex;
        return (
          <Button
            // eslint-disable-next-line react/no-array-index-key
            key={`tab-select-button-${index}`}
            sx={{
              borderRadius: '20px',
              border: '1px solid transparent',
              backgroundColor: isActive ? 'primary.main' : 'background.default',
              color: isActive ? 'background.default' : 'text.primary',
              fontWeight: '600',
              fontSize: '13px',
              textTransform: 'none',
              padding: '7px 13px',
              '&:hover': {
                backgroundColor: isActive ? 'primary.main' : colors.hoverGreen,
                borderColor: 'primary.main',
              },
            }}
            onClick={() => {
              setActiveItemIndex(index);
            }}
          >
            {itemContent}
          </Button>
        );
      })}
    </Box>
  );
};

export default TabSelect;
