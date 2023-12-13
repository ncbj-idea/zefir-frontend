import { Box, Card, Grid } from '@mui/material';
import { useRef } from 'react';

import { BackToTopButton, BuildingsMap } from '@/components';
import { useBackToTopButton } from '@/hooks';

import { baseConfig } from './_config/baseConfig';

const CityBaselineTab = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { backToTopHandler, showBtn } = useBackToTopButton(containerRef);

  return (
    <Box
      ref={containerRef}
      sx={{
        height: 'calc(100% - 50px)',
        overflowY: 'scroll',
        overflowX: 'hidden',
        px: '21px',
        py: '32px',
      }}
    >
      <Box p="8px" mb={4}>
        <Card variant="outlined">
          <Box sx={{ height: '58vh', maxHeight: '800px' }}>
            <BuildingsMap />
          </Box>
        </Card>
      </Box>
      {baseConfig.rows.map((row, rowIndex) => (
        <Grid
          // eslint-disable-next-line react/no-array-index-key
          key={`row-${rowIndex}`}
          container
          mb="24px"
          sx={{ height: { xs: 'auto', lg: '390px' } }}
        >
          {row[0] !== undefined && (
            <Grid item xs={12} lg={6} height="100%" p={1} pr="10px">
              {row[0]}
            </Grid>
          )}
          {row[1] !== undefined && (
            <Grid item xs={12} lg={6} height="100%" p={1} pl="10px">
              {row[1]}
            </Grid>
          )}
        </Grid>
      ))}
      <BackToTopButton isVisible={showBtn} clickHandler={backToTopHandler} />
    </Box>
  );
};

export default CityBaselineTab;
