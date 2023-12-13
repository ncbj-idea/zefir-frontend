import { Box, type SxProps, type Theme } from '@mui/material';
import { type FC } from 'react';

export interface MiniPieChartProps {
  sx?: SxProps<Theme>;
  variant: '100%' | '75%' | '50%' | '25%';
  size?: string;
}

const MiniPieChart: FC<MiniPieChartProps> = ({ sx, variant, size = '12px' }) => {
  return (
    <Box
      sx={{
        ...sx,
        display: 'block',
        width: size,
        height: size,
        borderRadius: '50%',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'text.secondary',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: '50%',
          width: size,
          height: size,
          backgroundColor: 'text.secondary',
        }}
      />
      {(variant === '100%' || variant === '75%' || variant === '50%') && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: size,
            height: size,
            backgroundColor: 'text.secondary',
          }}
        />
      )}
      {(variant === '75%' || variant === '100%') && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '50%',
            right: '50%',
            width: size,
            height: size,
            backgroundColor: 'text.secondary',
          }}
        />
      )}
      {variant === '100%' && (
        <Box
          sx={{
            position: 'absolute',
            top: '-50%',
            left: '50%',
            width: size,
            height: size,
            backgroundColor: 'text.secondary',
          }}
        />
      )}
    </Box>
  );
};

export default MiniPieChart;
