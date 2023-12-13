'use client';

import { Box } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import InnerTabs from '@/components/InnerTabs';
import { LayoutTab, LayoutTabContainer, LayoutTabPanel } from '@/components/LayoutTab';
import { useDispatch } from '@/store';
import { updateTab } from '@/store/slices/uiSession';

import CityAgregatesTab from './CityAgregatesTab';
import CityBaselineTab from './CityBaselineTab';

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabValue = Number(searchParams.get('section'));

  const handleChangeTabValue = (newValue: number | string) => {
    const currentSearchParams = new URLSearchParams(Array.from(searchParams.entries()));

    currentSearchParams.set('section', newValue.toString());

    const search = currentSearchParams.toString();
    const query = search ? `?${search}` : '';
    const newPath = `${pathname}${query}`;

    router.replace(newPath);

    dispatch(
      updateTab({
        tabsType: 'baseline',
        tab: { tabID: 1, tabURL: newPath },
      }),
    );
  };

  return (
    <LayoutTabContainer sx={{ margin: 0, height: 'calc(100% - 240px)' }}>
      <Box display="flex" gap="2px">
        <LayoutTab
          isMain
          handleTabChange={() => undefined}
          // @TODO static year or dynamic from backend? At this moment we want 2023
          tab={{ label: 'Stan obecny 2023', tabID: 'main', tabURL: '/' }}
          activeTabID="main"
        />
      </Box>
      <LayoutTabPanel tabID={0} activeTabID={0} tabHeight="calc(100vh - 148px)" noPadding>
        <InnerTabs
          value={tabValue}
          onChange={handleChangeTabValue}
          tabNames={['Informacje podstawowe', 'Grupy odbiorców']}
        />
        <LayoutTabPanel noBorder noPadding activeTabID={tabValue} tabID={0}>
          <CityBaselineTab />
        </LayoutTabPanel>
        <LayoutTabPanel noBorder noPadding activeTabID={tabValue} tabID={1}>
          <CityAgregatesTab />
        </LayoutTabPanel>
      </LayoutTabPanel>
    </LayoutTabContainer>
  );
}
