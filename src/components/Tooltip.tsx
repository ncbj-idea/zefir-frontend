import InfoIcon from '@mui/icons-material/Info';
import {
  Box,
  IconButton,
  Tooltip as MUITooltip,
  type TooltipProps as MUITooltipProps,
  Typography,
  useTheme,
} from '@mui/material';
import { type FC } from 'react';

interface TooltipProps extends Omit<MUITooltipProps, 'title' | 'children'> {
  text: string;
  smallSize?: boolean;
}

const Tooltip: FC<TooltipProps> = ({ text, smallSize = false, placement = 'bottom-end', ...props }) => {
  const theme = useTheme();

  return (
    <MUITooltip
      placement={placement}
      componentsProps={{
        tooltip: {
          sx: {
            padding: smallSize ? '12px 18px' : '20px 30px',
            backgroundColor: theme.palette.background.default,
            minWidth: '150px',
            maxWidth: '405px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: theme.palette.divider,
          },
        },
      }}
      {...props}
      title={
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={smallSize ? '7px' : '15px'}>
            <Typography fontSize="16px" fontWeight="600" color="primary.main">
              Informacja
            </Typography>
            <InfoIcon
              sx={{
                width: smallSize ? '20px' : '30px',
                height: smallSize ? '20px' : '30px',
                color: 'primary.main',
              }}
            />
          </Box>
          <Typography fontSize="12px" fontWeight="600" color="text.secondary">
            {text}
          </Typography>
        </Box>
      }
    >
      <IconButton size="small">
        <InfoIcon fontSize="inherit" />
      </IconButton>
    </MUITooltip>
  );
};

export default Tooltip;
