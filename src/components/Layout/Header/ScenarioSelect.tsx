'use client';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

const ScenarioSelect = () => {
  const [scenarioId, setScenarioId] = useState(0);

  const scenarios = [
    { id: 0, name: 'Stan aktualny' },
    { id: 1, name: 'Pierwszy scenariusz' },
    { id: 2, name: 'Drugi scenariusz' },
  ];

  return (
    <FormControl sx={{ minWidth: '300px', height: '100%' }} color="secondary">
      <InputLabel id="scenario-select-label">Scenariusz</InputLabel>
      <Select
        labelId="scenario-select-label"
        variant="outlined"
        value={scenarioId}
        onChange={(ev) => {
          setScenarioId(Number(ev.target.value));
        }}
      >
        {scenarios.map((scenario) => (
          <MenuItem key={scenario.id} value={scenario.id}>
            {scenario.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ScenarioSelect;
