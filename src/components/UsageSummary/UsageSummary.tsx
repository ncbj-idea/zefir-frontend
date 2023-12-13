import { Box, Typography } from '@mui/material';
import { type FC } from 'react';

import MiniPieChart from '../MiniPieChart';

export interface UsageSummaryProps {
  iconVariant: '100%' | '75%' | '50%' | '25%';
  title: string;
  amount: string;
  percentage: string;
}

const UsageSummary: FC<UsageSummaryProps> = ({ amount, iconVariant, percentage, title }) => (
  <Box display="flex" justifyContent="space-around" width="190px" height="45px">
    <Box display="flex" gap="5px">
      <MiniPieChart variant={iconVariant} sx={{ marginTop: '5px' }} />
      <Box display="flex" flexDirection="column">
        <Typography fontWeight="600" fontSize="14px">
          {title}
        </Typography>
        <Typography color="text.secondary" fontSize="12px" whiteSpace="nowrap">
          {amount}
        </Typography>
      </Box>
    </Box>
    <Box display="flex" flexDirection="column" justifyContent="center" height="100%" ml="10px">
      <Typography fontWeight="bold" fontSize="21px" mb="8px">
        {percentage}
      </Typography>
    </Box>
  </Box>
);

export default UsageSummary;
