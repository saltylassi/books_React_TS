import { RouterState } from 'connected-react-router';
import { AnyAction, Reducer } from 'redux';

export type LoginReqType = {
  email: string;
  password: string;
};

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: Error | null;
}

export interface BooksState {
  books: BookType[] | null;
  loading: boolean;
  error: Error | null;
}

export interface BookState {
  book: BookType | null;
  loading: boolean;
  error: Error | null;
}

export interface RootState {
  auth: AuthState;
  books: BooksState;
  book: BookState;
  router: Reducer<RouterState<unknown>, AnyAction>;
}

export interface BookType {
  bookId: number;
  title: string;
  author: string;
  createdAt: string;
  message: string;
  url: string;
}

export interface BookReqType {
  title: string;
  message: string;
  author: string;
  url: string;
}
