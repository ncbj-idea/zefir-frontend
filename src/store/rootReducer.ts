import { combineReducers } from '@reduxjs/toolkit';

import { reducer as ui } from './slices/ui';
import { reducer as uiSession } from './slices/uiSession';

export const rootReducer = combineReducers({ ui, uiSession });
