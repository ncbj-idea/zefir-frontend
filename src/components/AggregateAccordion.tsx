import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionDetails, AccordionSummary, Box, Grid, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import { type FC, type ReactNode } from 'react';

import { formatThousands } from '@/utils/formatThousands';

import MiniPieChart from './MiniPieChart';

export interface AggregateAccordionProps {
  iconVariant: '100%' | '75%' | '50%' | '25%';
  title: string;
  heatUsage: number;
  electricityUsage: number;
  coolingUsage: number;
  area: number;
  areaPercent: number;
  buildings: number;
  id: number;
  expanded?: boolean;
  onChange?: (id: number) => void;
  children?: ReactNode;
}

const AggregateAccordion: FC<AggregateAccordionProps> = ({
  id,
  areaPercent,
  buildings,
  coolingUsage,
  electricityUsage,
  heatUsage,
  title,
  area,
  children,
  iconVariant,
  expanded = false,
  onChange,
}) => {
  return (
    <Accordion
      sx={{ mb: '40px' }}
      expanded={expanded}
      onChange={() => {
        onChange?.(id);
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: 'text.secondary', height: '32px', width: '32px' }} />}
        aria-controls="agregates-content"
      >
        <Grid container spacing={4}>
          <Grid item xs={2} display="flex" gap="10px">
            <Box>
              <MiniPieChart sx={{ mt: '5px' }} size="16px" variant={iconVariant} />
            </Box>
            <Typography fontSize="16px" fontWeight="bold">
              {title}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Box display="flex" flexDirection="column">
              <Typography color="text.secondary" fontSize="12px">
                Obecny poziom zużycia ciepła
              </Typography>
              <Typography color="text.secondary" fontSize="12px">
                <Typography component="span" color="text.primary" fontSize="14px" fontWeight="bold">
                  {heatUsage}{' '}
                </Typography>
                kWh/m²/rok
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3} display="flex">
            <Box display="flex" flexDirection="column" flex={1}>
              <Typography color="text.secondary" fontSize="12px">
                Powierzchnia użytkowa
              </Typography>
              <Typography fontSize="14px" fontWeight="bold">
                {formatThousands(area)}m²
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" flex={1}>
              <Typography color="text.secondary" fontSize="12px">
                % wzgl. całk. pow. użytkowej
              </Typography>
              <Typography fontSize="14px" fontWeight="bold">
                {areaPercent}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box display="flex" flexDirection="column">
              <Typography color="text.secondary" fontSize="12px">
                Liczba budynków
              </Typography>
              <Typography fontSize="14px" fontWeight="bold">
                {formatThousands(buildings)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box display="flex" flexDirection="column">
              <Typography color="text.secondary" fontSize="12px">
                Średni poziom zużycia Energii elektr.
              </Typography>
              <Typography fontSize="14px" fontWeight="bold">
                {electricityUsage} kWh/m²/rok
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box display="flex" flexDirection="column">
              <Typography color="text.secondary" fontSize="12px">
                Średni poziom zużycia chłodu
              </Typography>
              <Typography fontSize="14px" fontWeight="bold">
                {coolingUsage} kWh/m²/rok
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>{expanded && children}</AccordionDetails>
    </Accordion>
  );
};

export default AggregateAccordion;
