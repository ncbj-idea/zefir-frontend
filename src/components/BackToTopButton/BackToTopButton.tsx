'use client';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, type SxProps, type Theme } from '@mui/material';
import { type FC } from 'react';

import colors from '@/theme/colors';

interface BackToTopButtonProps {
  sx?: SxProps<Theme>;
  isVisible: boolean;
  clickHandler: () => void;
}

const BackToTopButton: FC<BackToTopButtonProps> = ({ sx, isVisible, clickHandler }) => {
  return (
    <Box
      onClick={() => {
        clickHandler();
      }}
      sx={{
        ...sx,
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        display: isVisible ? 'flex' : 'none',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        boxShadow: '0px 3px 6px #00000029',
        border: `1px solid ${colors.gray3}`,
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'primary.main',
        backgroundColor: 'background.default',
        zIndex: 999,
        '&:hover': {
          backgroundColor: 'primary.main',
          color: 'background.default',
        },
      }}
    >
      <KeyboardArrowUpIcon />
    </Box>
  );
};

export default BackToTopButton;
