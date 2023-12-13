import { Box, Typography } from '@mui/material';
import type { FC } from 'react';
import useSWRImmutable from 'swr/immutable';

import { http } from '@/api';
import { useDispatch, useSelector } from '@/store';
import { setCurrentScenarioYear } from '@/store/slices/ui';

import Select from './Form/Select';

interface ScenarioYearSelectProps {
  scenarioId: number;
}

const ScenarioYearSelect: FC<ScenarioYearSelectProps> = ({ scenarioId }) => {
  const dispatch = useDispatch();
  const year = useSelector((state) => state.ui.currScenarioYear[scenarioId]) || 2023;

  const { data: yearData } = useSWRImmutable(['/zefir_data/get_years', scenarioId], ([, ...args]) =>
    http.default.getSequenceOfYearsZefirDataGetYearsGet({
      scenarioId: args[0],
    }),
  );

  const yearOptions =
    yearData?.years
      .map((el) => el + 2023)
      .map((el) => ({
        value: el,
        label: el.toString(),
      })) || [];

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Select
        onChange={(option) => dispatch(setCurrentScenarioYear({ scenarioId, year: option.value as number }))}
        options={yearOptions}
        value={year || 2023}
        sx={{ width: '120px', mr: '10px' }}
        InputProps={{
          sx: {
            color: 'white',
            fontWeight: 600,
            bgcolor: '#16B559',
            '& .MuiSelect-select': {
              padding: '10px',
            },
          },
        }}
        iconColor="background.default"
      />
      <Typography fontSize="14px" fontWeight={600} sx={{ maxWidth: '153px' }}>
        Wybierz rok do analizy w tym scenariuszu
      </Typography>
    </Box>
  );
};

export default ScenarioYearSelect;
