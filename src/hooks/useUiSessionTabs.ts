import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { usePrevious } from '@/hooks/usePrevious';
import { useDispatch, useSelector } from '@/store';
import type { TabID, TabType } from '@/store/slices/uiSession';
import { removeTab, setCurrentTab } from '@/store/slices/uiSession';

const useUiSessionTabs = (tabsType: TabType) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const tabs = useSelector((state) => state.uiSession[tabsType].tabs);
  const currentTabId = useSelector((state) => state.uiSession[tabsType].currentTabId);

  const previousTabId = usePrevious(currentTabId);

  const handleRemoveTab = (tabID: TabID) => dispatch(removeTab({ tabsType, tabID }));
  const handleTabChange = (tabID: TabID) => dispatch(setCurrentTab({ tabsType, tabID }));

  useEffect(() => {
    if (previousTabId === undefined || previousTabId === currentTabId) return;

    const currTab = tabs.find((t) => t.tabID === currentTabId);

    if (currTab) {
      router.push(currTab.tabURL);
    } else {
      // eslint-disable-next-line no-console
      console.warn(`Tab with currentTabId ${currentTabId} doesn't exist`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTabId, tabs.length]);

  return { tabs, currentTabId, handleRemoveTab, handleTabChange };
};

export { useUiSessionTabs };
