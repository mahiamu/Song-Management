import { all } from 'redux-saga/effects';
import songSaga from '../features/songs/songSaga'; 

export default function* rootSaga() {
  yield all([songSaga()]); // Changed watchSongSagas() to songSaga()
}
