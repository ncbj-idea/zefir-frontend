import { Box, Card, CardContent, Typography } from '@mui/material';
import type { FC } from 'react';

import colors from '@/theme/colors';
import { formatThousands } from '@/utils/formatThousands';
import { getMapEmissionsScale } from '@/utils/getMapEmissionsScale';

interface MapEmissionsLegendProps {
  emissionType: string;
}

const MapEmissionsLegend: FC<MapEmissionsLegendProps> = ({ emissionType }) => {
  const getLegendTick = (divideBy?: number) => {
    const value = getMapEmissionsScale(emissionType);

    if (value) {
      const dividedValue = divideBy ? value / divideBy : undefined;
      return `${formatThousands(dividedValue || value)} kg`;
    }

    return '';
  };
  return (
    <Card
      sx={{
        position: 'absolute',
        bottom: '35px',
        right: '20px',
        width: '300px',
        height: '85px',
      }}
    >
      <CardContent>
        <Typography fontSize="12px" fontWeight={600}>
          Emisje {emissionType}
          <Box
            width="270px"
            height="7px"
            mt="10px"
            sx={{
              borderRadius: '4px',
              background:
                'transparent linear-gradient(90deg, #0521DD 0%, #6DFF00 24%, #FBFE00 50%, #FC9000 77%, #FF1000 100%) 0% 0% no-repeat padding-box;',
            }}
          />
          <Box display="flex" justifyContent="space-between" width="220px" m="0 auto" mb="4px">
            <Box width="1px" height="4px" bgcolor={colors.dark4} />
            <Box width="1px" height="4px" bgcolor={colors.dark4} />
            <Box width="1px" height="4px" bgcolor={colors.dark4} />
          </Box>
          <Box display="flex" justifyContent="space-between" width="250px" m="0 auto">
            <Typography fontSize="12px" fontWeight={600} color={colors.dark3}>
              {getLegendTick(10)}
            </Typography>
            <Typography fontSize="12px" fontWeight={600} color={colors.dark3} position="relative" left="7px">
              {getLegendTick(2)}
            </Typography>
            <Typography fontSize="12px" fontWeight={600} color={colors.dark3} position="relative" left="9px">
              &lt;{getLegendTick()}
            </Typography>
          </Box>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MapEmissionsLegend;
