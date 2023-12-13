import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type ISOString = string;
export type TabID = string | number;
export type TabURL = string;
export type TabType = 'scenarios' | 'baseline';

export interface UISessionTab {
  label: string;
  tabID: TabID;
  tabURL: TabURL;
}

export interface UISessionControler {
  tabs: UISessionTab[];
  currentTabId: TabID;
}

const initialState: {
  [n in TabType]: UISessionControler;
} = {
  scenarios: {
    tabs: [{ tabID: 'main', label: 'Scenariusze transformacji', tabURL: '/scenarios' }],
    currentTabId: 'main',
  },
  baseline: {
    tabs: [{ tabID: 'main', label: 'Stan obecny 2023', tabURL: '/baseline' }],
    currentTabId: 'main',
  },
};

type WithTabsType<T> = { tabsType: keyof typeof initialState } & T;

const slice = createSlice({
  name: 'uiSession',
  initialState,
  reducers: {
    addTab(state, action: PayloadAction<WithTabsType<{ tab: UISessionTab }>>) {
      const { tab, tabsType } = action.payload;
      const tabAlreadyOpen = state[tabsType].tabs.some((t) => t.tabID === tab.tabID);
      if (tabAlreadyOpen) {
        state[tabsType].currentTabId = tab.tabID;
        return;
      }
      const tabIsNotOpenedYet = state[tabsType].tabs.every((t) => t.tabID !== tab.tabID);
      if (tabIsNotOpenedYet) {
        state[tabsType].tabs = [...state[tabsType].tabs, tab];
        state[tabsType].currentTabId = tab.tabID;
      }
    },
    addTabs(state, action: PayloadAction<WithTabsType<{ tabs: UISessionTab[] }>>) {
      const { tabs, tabsType } = action.payload;
      const existingTabsIds = state[tabsType].tabs.map((tab) => tab.tabID);
      const tabsWithoutDuplicates = tabs.filter((tab) => !existingTabsIds.includes(tab.tabID));

      state[tabsType].tabs = [...state[tabsType].tabs, ...tabsWithoutDuplicates];
    },
    replaceCurrentTab(state, action: PayloadAction<WithTabsType<{ tab: UISessionTab }>>) {
      const { tab, tabsType } = action.payload;
      const { currentTabId } = state[tabsType];

      if (currentTabId === 'main') {
        state[tabsType].tabs = [...state[tabsType].tabs, tab];
      } else {
        state[tabsType].tabs = state[tabsType].tabs.map((t) => (t.tabID === currentTabId ? tab : t));
      }
      state[tabsType].currentTabId = tab.tabID;
    },
    removeTab(state, action: PayloadAction<WithTabsType<{ tabID: TabID }>>) {
      const { tabID, tabsType } = action.payload;
      const newTabs = state[tabsType].tabs.filter((t) => t.tabID !== tabID);
      state[tabsType].tabs = newTabs;
      // @TODO
      state[tabsType].currentTabId =
        newTabs.length > 1 ? (state[tabsType].tabs[newTabs.length - 1] as any).tabID : 'main';
    },
    setCurrentTab(state, action: PayloadAction<WithTabsType<{ tabID: TabID }>>) {
      const { tabID, tabsType } = action.payload;
      if (state[tabsType]) {
        state[tabsType].currentTabId = tabID;
      }
    },
    updateTab(state, action: PayloadAction<WithTabsType<{ tab: Partial<UISessionTab> }>>) {
      const { tab, tabsType } = action.payload;
      const tabToUpdateIndex = state[tabsType].tabs.findIndex((t) => t.tabID === tab.tabID);
      // @TODO
      if (tabToUpdateIndex !== -1) {
        (state[tabsType].tabs[tabToUpdateIndex] as any) = {
          ...state[tabsType].tabs[tabToUpdateIndex],
          ...tab,
        };
      }
    },
  },
});

export const { reducer } = slice;
export const { addTab, addTabs, removeTab, setCurrentTab, replaceCurrentTab, updateTab } = slice.actions;
