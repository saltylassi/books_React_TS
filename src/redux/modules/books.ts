import { call, put, select, takeLatest } from '@redux-saga/core/effects';
import { handleActions } from 'redux-actions';
import BookService from '../../Services/BookServices';
import { BooksState, BookType } from '../../types';

const initialState: BooksState = {
  books: null,
  loading: false,
  error: null,
};

const prefix = 'books/books';

const PENDING = `${prefix}/PENDING`;
const SUCCESS = `${prefix}/SUCCESS`;
const FAIL = `${prefix}/FAIL`;

const pending = () => {
  return { type: PENDING };
};

const success = (book: BookType[]) => {
  return { type: SUCCESS, payload: book };
};

const fail = (error: any) => {
  return { type: FAIL, payload: error };
};

const reducer = handleActions<BooksState, BookType[]>(
  {
    [PENDING]: (state) => {
      return { ...state, loading: true, error: null };
    },
    [SUCCESS]: (state, action) => {
      return { books: action.payload, loading: false, error: null };
    },
    [FAIL]: (state, action: any) => {
      return { ...state, loading: false, error: action.payload };
    },
  },
  initialState
);

export default reducer;

// saga

export const GET_BOOKS = `${prefix}/GET_BOOKS`;

export const getBooks = () => {
  return { type: GET_BOOKS };
};

function* getBooksSaga() {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    const books: BookType[] = yield call(BookService.getBooks, token);
    yield put(success(books));
  } catch (error) {
    yield put(fail(error));
  }
}

export function* booksSaga() {
  yield takeLatest(GET_BOOKS, getBooksSaga);
}
