import { combineReducers } from '@reduxjs/toolkit';
import songsReducer from '../features/songs/songSlice';

const rootReducer = combineReducers({
  songs: songsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
