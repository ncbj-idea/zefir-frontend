'use client';

import { Box, Typography } from '@mui/material';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import useSWRImmutable from 'swr/immutable';

import { http } from '@/api';
import { scenarioConfig } from '@/app/_config/scenarioConfig';
import InnerTabs from '@/components/InnerTabs';
import { LayoutTab, LayoutTabContainer, LayoutTabPanel } from '@/components/LayoutTab';
import ScenarioInfoInnerTab from '@/components/ScenarioInfoInnerTab';
import ScenarioYearSelect from '@/components/ScenarioYearSelect';
import { useUiSessionTabs } from '@/hooks';
import { useDispatch } from '@/store';
import { setCurrentScenarioYear } from '@/store/slices/ui';
import { addTab, updateTab } from '@/store/slices/uiSession';

import ScenarioAggregatesTab from './ScenarioAggregatesTab';
import ScenarioInnerTab from './ScenarioInnerTab';

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { tabs, currentTabId, handleRemoveTab, handleTabChange } = useUiSessionTabs('scenarios');

  const scenarioId = Number(params.scenarioId);
  const tabValue = Number(searchParams.get('section'));

  const { data: yearData } = useSWRImmutable(['/zefir_data/get_years', scenarioId], ([, ...args]) =>
    http.default.getSequenceOfYearsZefirDataGetYearsGet({
      scenarioId: args[0],
    }),
  );

  useEffect(() => {
    if (yearData) {
      const firstYear = yearData.years[0] as number;
      dispatch(setCurrentScenarioYear({ scenarioId, year: firstYear + 2023 }));
    }
  }, [dispatch, scenarioId, yearData]);

  useEffect(() => {
    const tab = {
      tabID: scenarioId,
      label: `Scenariusz ${scenarioId}`,
      tabURL: `/scenarios/${scenarioId}/?section=0`,
    };
    dispatch(addTab({ tabsType: 'scenarios', tab }));
  }, [dispatch, scenarioId]);

  const handleChangeTabValue = (newValue: number | string) => {
    const currentSearchParams = new URLSearchParams(Array.from(searchParams.entries()));

    currentSearchParams.set('section', newValue.toString());

    const search = currentSearchParams.toString();
    const query = search ? `?${search}` : '';
    const newPath = `${pathname}${query}`;

    router.replace(newPath);

    dispatch(
      updateTab({
        tabsType: 'scenarios',
        tab: { tabID: scenarioId, tabURL: newPath },
      }),
    );
  };

  return (
    <LayoutTabContainer sx={{ height: 'calc(100% - 240px)' }}>
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
      <LayoutTabPanel tabID={scenarioId} activeTabID={currentTabId} tabHeight="calc(100vh - 148px)" noPadding>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: '18px',
            px: '30px',
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
            borderBottomColor: 'divider',
          }}
        >
          <Box display="flex" gap="34px">
            <Typography component="h3" fontSize="16px" fontWeight={600}>
              {scenarioId}
            </Typography>
            <Typography component="h3" fontSize="16px" fontWeight={600}>
              Scenariusz {scenarioId}
            </Typography>
          </Box>
          <ScenarioYearSelect scenarioId={scenarioId} />
        </Box>
        <InnerTabs
          value={tabValue}
          onChange={handleChangeTabValue}
          tabNames={['Założenia scenariusza', 'Energia i moc', 'Emisje i zużycie paliw', 'Koszty', 'Grupy odbiorców']}
        />
        <LayoutTabPanel noBorder noPadding activeTabID={tabValue} tabID={0}>
          <ScenarioInfoInnerTab />
        </LayoutTabPanel>
        <LayoutTabPanel noBorder noPadding activeTabID={tabValue} tabID={1}>
          <ScenarioInnerTab config={scenarioConfig.powerEnergy} />
        </LayoutTabPanel>
        <LayoutTabPanel noBorder noPadding activeTabID={tabValue} tabID={2}>
          <ScenarioInnerTab config={scenarioConfig.emissionsCons} />
        </LayoutTabPanel>
        <LayoutTabPanel noBorder noPadding activeTabID={tabValue} tabID={3}>
          <ScenarioInnerTab config={scenarioConfig.costs} />
        </LayoutTabPanel>
        <LayoutTabPanel noBorder noPadding activeTabID={tabValue} tabID={4}>
          <ScenarioAggregatesTab />
        </LayoutTabPanel>
      </LayoutTabPanel>
    </LayoutTabContainer>
  );
};

export default Page;
