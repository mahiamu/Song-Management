import { call, put, takeEvery } from 'redux-saga/effects';
import axiosInstance from '../../api/axiosInstance';
import { fetchSongs, addSong, updateSong, deleteSong } from './songSlice';
import { Song } from './songTypes';

function* fetchSongsSaga(): Generator<any, void, any> {
  try {
    const response: { data: Song[] } = yield call(axiosInstance.get, '/api/songs');
    yield put(fetchSongs.fulfilled(response.data, '', undefined));
  } catch (error: any) {
    yield put(fetchSongs.rejected(error.message, '', undefined));
  }
}

function* addSongSaga(action: { payload: Song | undefined }): Generator<any, void, any> {
  try {
    const payload: Song | undefined = action.payload;

    if (payload === undefined) {
      // Handle the case where payload is undefined
      return;
    }

    const response: { data: Song } = yield call(axiosInstance.post, '/api/songs', payload);
    yield put(addSong.fulfilled(response.data, '', payload));
  } catch (error: any) {
    yield put(addSong.rejected(error.message, '', action.payload || {} as Song));
  }
}

function* updateSongSaga(action: { payload: Song | undefined }): Generator<any, void, any> {
  try {
    const payload: Song | undefined = action.payload;

    if (payload === undefined) {
      // Handle the case where payload is undefined
      return;
    }

    const response: { data: Song } = yield call(axiosInstance.put, `/api/songs/${payload._id}`, payload);
    yield put(updateSong.fulfilled(response.data, '', payload));
  } catch (error: any) {
    yield put(updateSong.rejected(error.message, '', action.payload || {} as Song));
  }
}

function* deleteSongSaga(action: { payload: string | undefined }): Generator<any, void, any> {
  try {
    const payload: string | undefined = action.payload;

    if (payload === undefined) {
      // Handle the case where payload is undefined
      return;
    }

    yield call(axiosInstance.delete, `/api/songs/${payload}`);
    yield put(deleteSong.fulfilled(payload, '', payload));
  } catch (error: any) {
    yield put(deleteSong.rejected(error.message, '', action.payload || ''));
  }
}

export default function* songSaga() {
  yield takeEvery(fetchSongs.pending, fetchSongsSaga);
  yield takeEvery(addSong.pending, addSongSaga);
  yield takeEvery(updateSong.pending, updateSongSaga);
  yield takeEvery(deleteSong.pending, deleteSongSaga);
}
