import { call, put, select, takeLatest } from '@redux-saga/core/effects';
import { Action, handleActions } from 'redux-actions';
import BookService from '../../Services/BookServices';
import { BookState, BookType } from '../../types';

const initialState: BookState = {
  book: null,
  loading: false,
  error: null,
};

const prefix = 'books/book';

const PENDING = `${prefix}/PENDING`;
const SUCCESS = `${prefix}/SUCCESS`;
const FAIL = `${prefix}/FAIL`;

const pending = () => {
  return { type: PENDING };
};

const success = (book: BookType) => {
  return { type: SUCCESS, payload: book };
};

const fail = (error: any) => {
  return { type: FAIL, payload: error };
};

const reducer = handleActions<BookState, BookType>(
  {
    [PENDING]: (state) => {
      return { ...state, loading: true, error: null };
    },
    [SUCCESS]: (state, action) => {
      return { book: action.payload, loading: false, error: null };
    },
    [FAIL]: (state, action: any) => {
      return { ...state, loading: false, error: action.payload };
    },
  },
  initialState
);

export default reducer;

// saga

export const GET_BOOK = `${prefix}/GET_BOOK`;

export const getBook = (targetId: number) => {
  return { type: GET_BOOK, payload: targetId };
};

function* getBookSaga(action: Action<number>) {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    const targetBook: BookType = yield call(BookService.getBook, token, action.payload);

    yield put(success(targetBook));
  } catch (error: any) {
    yield put(fail(new Error('NOT EXIST')));
  }
}

export function* bookSaga() {
  yield takeLatest(GET_BOOK, getBookSaga);
}
