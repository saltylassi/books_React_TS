import { call, put, select, takeEvery, takeLatest } from '@redux-saga/core/effects';
import { push } from 'connected-react-router';
import { Action, handleActions } from 'redux-actions';
import BookService from '../../Services/BookServices';
import { BookReqType, BooksState, BookType } from '../../types';

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
export const GET_BOOK = `${prefix}/GET_BOOK`;
export const ADD_BOOK = `${prefix}/ADD_BOOK`;
export const DELETE_BOOK = `${prefix}/DELETE_BOOK`;
export const EDIT_BOOK = `${prefix}/EDIT_BOOK`;

export const getBooks = () => {
  return { type: GET_BOOKS };
};

export const addBook = (book: BookReqType) => {
  return { type: ADD_BOOK, payload: book };
};

export const deleteBook = (bookId: number) => {
  return { type: DELETE_BOOK, payload: bookId };
};

export const editBook = (bookId: number, book: BookReqType) => {
  return {
    type: EDIT_BOOK,
    payload: {
      bookId,
      book,
    },
  };
};

function* getBooksSaga() {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    const books: BookType[] = yield call(BookService.getBooks, token);
    yield put(success(books));
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN ERROR')));
  }
}

function* addBookSaga(action: Action<BookReqType>) {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    const book: BookType = yield call(BookService.addBook, token, action.payload);
    const books: BookType[] = yield select((state) => state.books.books);
    yield put(success([...books, book]));

    yield put(push('/'));
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN ERROR')));
  }
}

function* deleteBookSaga(action: Action<number>) {
  try {
    const bookId = action.payload;
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    yield call(BookService.deleteBook, token, bookId);
    const books: BookType[] = yield select((state) => state.books.books);
    yield put(success(books.filter((book) => book.bookId !== action.payload)));
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error) || 'UNKNOWN ERROR'));
  }
}

function* editBookSaga(action: any) {
  try {
    const targetBookId = action.payload.bookId;
    const targetBookData = action.payload.book;
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);

    yield call(BookService.editBook, token, targetBookId, targetBookData);
    const books: BookType[] = yield select((state) => state.books.books);

    yield put(
      success(
        books.map((book) => {
          if (book.bookId === targetBookId) {
            return targetBookData;
          } else {
            return book;
          }
        })
      )
    );

    yield put(push('/'));
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN ERROR')));
  }
}

export function* booksSaga() {
  yield takeLatest(GET_BOOKS, getBooksSaga);
  yield takeEvery(ADD_BOOK, addBookSaga);
  yield takeEvery(DELETE_BOOK, deleteBookSaga);
  yield takeEvery(EDIT_BOOK, editBookSaga);
}
