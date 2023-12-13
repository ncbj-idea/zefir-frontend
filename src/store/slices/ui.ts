/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ViewState } from 'react-map-gl';

const initialState: {
  isSidebarOpen: boolean;
  mapViewState?: ViewState;
  currScenarioYear: { [scenarioId: number]: number };
} = {
  isSidebarOpen: true,
  currScenarioYear: {},
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state, action: PayloadAction<boolean>) {
      state.isSidebarOpen = action.payload;
      window.localStorage.setItem('sidebar-state', `${action.payload}`);
    },
    setCurrentViewState(state, action: PayloadAction<ViewState>) {
      state.mapViewState = action.payload;
    },
    setCurrentScenarioYear(state, action: PayloadAction<{ scenarioId: number; year: number }>) {
      const { scenarioId, year } = action.payload;
      state.currScenarioYear[scenarioId] = year;
    },
  },
});

export const { reducer } = slice;
export const { toggleSidebar, setCurrentViewState, setCurrentScenarioYear } = slice.actions;
