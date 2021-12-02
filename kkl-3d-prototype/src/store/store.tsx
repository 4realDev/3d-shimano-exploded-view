/* store.ts */

import { configureStore } from '@reduxjs/toolkit';
import cameraReducer from './camera/cameraSlice';
import meshReducer from './mesh/meshSlice';

export const store = configureStore({
	reducer: {
		mesh: meshReducer,
		camera: cameraReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
