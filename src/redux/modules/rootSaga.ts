import { all } from 'redux-saga/effects';
import { authSaga } from './auth';
import { bookSaga } from './book';
import { booksSaga } from './books';

export default function* rootSaga() {
  yield all([authSaga(), booksSaga(), bookSaga()]);
}
