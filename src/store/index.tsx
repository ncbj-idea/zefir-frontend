'use client';

import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import type { FC, ReactNode } from 'react';
import type { TypedUseSelectorHook } from 'react-redux';
import { Provider, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { createLogger } from 'redux-logger';

import { rootReducer } from './rootReducer';

const loggerMiddleware = createLogger({
  collapsed: true,
  duration: true,
  diff: true,
});

const storeDev = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});

const storeProd = configureStore({
  reducer: rootReducer,
  devTools: false,
});

export const store = process.env.NODE_ENV === 'production' ? storeProd : storeDev;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const useDispatch = () => useReduxDispatch<AppDispatch>();

export const ReduxProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
