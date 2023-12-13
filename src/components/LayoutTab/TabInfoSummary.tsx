import OfflineBoltRoundedIcon from '@mui/icons-material/OfflineBoltRounded';
import type { BoxProps } from '@mui/material';
import { Box, Chip, Typography } from '@mui/material';
import type { FC } from 'react';

type UnitValue = { value: number | string; unit: string };

interface UnitBoxProps {
  title: string;
  value: number | string;
  unit?: string;
}

const UnitBox: FC<UnitBoxProps> = ({ title, value, unit }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <Typography
      component="h3"
      sx={{
        color: 'text.secondary',
        fontSize: '12px',
        lineHeight: '18px',
        fontWeight: 600,
      }}
    >
      {title}
    </Typography>
    <Box sx={{ display: 'inline-flex', alignItems: 'baseline', gap: '4px' }}>
      {!value || value === 0 ? (
        <Typography
          sx={{
            fontSize: '16px',
            lineHeight: '17px',
            fontWeight: 600,
          }}
        >
          -
        </Typography>
      ) : (
        <>
          <Typography
            sx={{
              fontSize: '16px',
              lineHeight: '17px',
              whiteSpace: 'nowrap',
              fontWeight: 600,
            }}
          >
            {value}
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              lineHeight: '17px',
              whiteSpace: 'nowrap',
              fontWeight: 600,
            }}
          >
            {unit}
          </Typography>
        </>
      )}
    </Box>
  </Box>
);

export interface TabInfoSummaryProps extends BoxProps {
  ppeName?: string;
  fspName?: string;
  date: string;
  consumption?: UnitValue;
  generation?: UnitValue;
  installedPower?: UnitValue;
  contractedPower?: UnitValue;
  isActive?: boolean;
  hasGeneration: boolean;
  hasConsumption: boolean;
}

const TabInfoSummary: FC<TabInfoSummaryProps> = ({
  ppeName,
  fspName,
  date,
  consumption,
  installedPower,
  contractedPower,
  generation,
  isActive,
  hasGeneration,
  hasConsumption,
  ...props
}) => {
  return (
    <Box
      {...props}
      sx={{
        ...props.sx,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: 1,
        borderColor: 'divider',
        gap: '10px',
        p: 2,
        backgroundColor: 'background.default',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <OfflineBoltRoundedIcon sx={{ width: '33px', height: '33px', color: 'primary' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            component="h3"
            sx={{
              fontSize: '16px',
              lineHeight: '28px',
              whiteSpace: 'nowrap',
              fontWeight: 600,
            }}
          >
            {ppeName}
          </Typography>
          <Typography
            component="h4"
            sx={{
              color: 'text.secondary',
              fontSize: '12px',
              lineHeight: '28px',
              whiteSpace: 'nowrap',
              fontWeight: 600,
            }}
          >
            {fspName}
          </Typography>
        </Box>
        <Chip
          size="small"
          color="primary"
          label={isActive ? 'AKTYWNY' : 'NIEAKTYWNY'}
          sx={{
            alignSelf: 'flex-start',
            fontSize: '11px',
            fontWeight: 600,
            backgroundColor: isActive ? 'success.main' : 'error.main',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '55%',
          gap: '20px',
          mr: '24px',
        }}
      >
        <UnitBox title="Generacja energii ogółem" value={generation?.value || 0} unit={generation?.unit} />
        <UnitBox title="Pobór energii z sieci ogółem" value={consumption?.value || 0} unit={consumption?.unit} />
        {hasGeneration && !hasConsumption && (
          <UnitBox title="Moc instalacji" value={installedPower?.value || 0} unit={installedPower?.unit} />
        )}
        {!hasGeneration && hasConsumption && (
          <UnitBox title="Moc umowna" value={contractedPower?.value || 0} unit={contractedPower?.unit} />
        )}
        {hasGeneration && hasConsumption && (
          <>
            <UnitBox title="Moc instalacji" value={installedPower?.value || 0} unit={installedPower?.unit} />
            <UnitBox title="Moc umowna" value={contractedPower?.value || 0} unit={contractedPower?.unit} />
          </>
        )}
        <UnitBox title="Data utworzenia" value={date} />
      </Box>
    </Box>
  );
};

export default TabInfoSummary;
