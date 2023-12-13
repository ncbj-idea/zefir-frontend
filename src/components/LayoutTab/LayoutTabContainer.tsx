import { Box, Container, Typography } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/system';
import type { FC } from 'react';

export interface LayoutTabContainerProps extends BoxProps {
  title?: string;
  sx?: SxProps<Theme>;
}

const LayoutTabContainer: FC<LayoutTabContainerProps> = ({ sx = [], title, ...props }) => (
  <Box
    {...props}
    sx={[
      {
        height: '100%',
        width: '100%',
        backgroundColor: '#F4F5F7',
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <Container sx={{ pt: '45px', px: '0 !important' }} maxWidth={false}>
      {title && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '18px' }}>
          <Typography component="h1" fontSize="1.375rem" fontWeight={600}>
            {title}
          </Typography>
        </Box>
      )}
      {props.children}
    </Container>
  </Box>
);

export default LayoutTabContainer;
