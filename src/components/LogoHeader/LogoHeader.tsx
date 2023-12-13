import { Box } from '@mui/material';
import { type FC } from 'react';

import { ZefirLogoTextIcon } from '@/icons';

const LogoHeader: FC = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: 1,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ZefirLogoTextIcon sx={{ width: 90, height: 90 }} />
    </Box>
  );
};

export default LogoHeader;
