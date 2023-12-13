import { Box, Typography } from '@mui/material';
import { type FC, type ReactNode } from 'react';

import colors from '@/theme/colors';

export interface IconSummaryProps {
  icon: ReactNode;
  text: string;
  value?: string;
}

const IconSummary: FC<IconSummaryProps> = ({ text, value, icon }) => (
  <Box sx={{ height: '48px', display: 'flex', gap: '10px' }}>
    <Box
      sx={{
        borderRadius: '5px',
        backgroundColor: colors.green,
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'primary.main',
      }}
    >
      {icon}
    </Box>
    <Box display="flex" flexDirection="column" justifyContent="space-between" maxWidth="133px">
      <Typography color="text.secondary" fontSize="12px">
        {text}
      </Typography>
      <Typography fontWeight="bold" fontSize="18px" whiteSpace="nowrap">
        {value}
      </Typography>
    </Box>
  </Box>
);

export default IconSummary;
