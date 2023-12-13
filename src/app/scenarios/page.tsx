'use client';

import { Box, Grid } from '@mui/material';
import { type GridRowsProp } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ScenarioInfo } from '@/components';
import { Autocomplete, type InputOption } from '@/components/Form';
import { LayoutTab, LayoutTabContainer, LayoutTabPanel } from '@/components/LayoutTab';
import { useUiSessionTabs } from '@/hooks';
import { setCurrentTab } from '@/store/slices/uiSession';

import ScenariosTable from './ScenariosTable';

const min = 100;
const max = 500;
const getRandom = () => Math.floor(Math.random() * (max - min + 1) + min);

const gridData: GridRowsProp = [
  {
    id: 1,
    col1: 1,
    col2: 'Scenariusz #1',
    col3: getRandom(),
    col4: getRandom(),
    col5: getRandom(),
    col6: getRandom(),
    col7: getRandom(),
    col8: '2023-12-15',
  },
  {
    id: 2,
    col1: 2,
    col2: 'Scenariusz #2',
    col3: getRandom(),
    col4: getRandom(),
    col5: getRandom(),
    col6: getRandom(),
    col7: getRandom(),
    col8: '2023-12-15',
  },
  {
    id: 3,
    col1: 4,
    col2: 'Scenariusz #3',
    col3: getRandom(),
    col4: getRandom(),
    col5: getRandom(),
    col6: getRandom(),
    col7: getRandom(),
    col8: '2023-12-15',
  },
];

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedId, selectId] = useState(1);
  const [rowFilter, setRowFilter] = useState('');
  const { tabs, currentTabId, handleRemoveTab, handleTabChange } = useUiSessionTabs('scenarios');

  useLayoutEffect(() => {
    if (currentTabId !== 'main') {
      dispatch(setCurrentTab({ tabsType: 'scenarios', tabID: currentTabId }));
      const tabURL = tabs.find((t) => t.tabID === currentTabId)?.tabURL;
      if (tabURL) {
        router.replace(tabURL);
      }
    }
  }, [currentTabId, dispatch, router, tabs]);

  const filteredRows = gridData.filter((row) => (rowFilter ? row.id.toString() === rowFilter : true));

  const onAutocompleteChange = (option: InputOption) => {
    if (option) {
      if (typeof option.value === 'string') {
        setRowFilter(option.value);
      } else {
        setRowFilter(option.value.toString());
      }
    } else {
      setRowFilter('');
    }
  };

  return (
    <LayoutTabContainer sx={{ margin: 0, height: 'calc(100% - 240px)' }}>
      <Box display="flex" gap="2px">
        {tabs.map((tab, index) => (
          <LayoutTab
            key={tab.tabID}
            tab={tab}
            isMain={index === 0}
            activeTabID={currentTabId}
            handleRemoveTab={handleRemoveTab}
            handleTabChange={handleTabChange}
          />
        ))}
      </Box>
      <LayoutTabPanel tabID="main" activeTabID={currentTabId} tabHeight="calc(100vh - 148px)">
        <Box>
          <Box width="350px" mt={1} mb={3}>
            <Autocomplete
              placeholder="Wszystkie"
              label="Nazwa scenariusza"
              onChange={onAutocompleteChange}
              options={gridData.map((el) => ({
                label: el.col2,
                value: el.id,
              }))}
            />
          </Box>
          <Box>
            <Grid
              container
              sx={{
                borderRadius: '4px',
                height: 'calc(100vh - 260px)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'divider',
              }}
            >
              <Grid
                item
                xs={9}
                height="100%"
                sx={{
                  borderRightWidth: '1px',
                  borderRightColor: 'divider',
                  borderRightStyle: 'solid',
                }}
              >
                <ScenariosTable
                  rows={filteredRows}
                  onRowClick={(scenarioId) => {
                    selectId(scenarioId);
                  }}
                />
              </Grid>
              <Grid item xs={3} height="100%">
                <ScenarioInfo scenarioId={selectedId} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </LayoutTabPanel>
    </LayoutTabContainer>
  );
}
