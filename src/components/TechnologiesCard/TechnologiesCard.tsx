import { Box, Typography } from '@mui/material';
import { type FC } from 'react';

import colors from '@/theme/colors';

export interface TechnologiesCardProps {
  dotColor: string;
  title: string;
  technologies: string[];
}

const TechnologiesCard: FC<TechnologiesCardProps> = ({ dotColor, title, technologies }) => {
  return (
    <Box
      sx={{
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'divider',
        borderRadius: '5px',
        p: '15px',
        display: 'grid',
        gap: '5px',
        width: '100%',
        gridTemplateRows: '1fr',
        gridTemplateColumns: '10px 1fr',
      }}
    >
      <Box
        sx={{
          width: '10px',
          borderRadius: '50%',
          height: '10px',
          backgroundColor: dotColor,
          mt: '6px',
        }}
      />
      <Box overflow="hidden">
        <Typography fontWeight="600" fontSize="14px" mb="12px" overflow="hidden" textOverflow="ellipsis" width="100%">
          {title}
        </Typography>
        {technologies.map((t) => (
          <Typography fontSize="12px" color={colors.dark3} key={t}>
            {t}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default TechnologiesCard;
