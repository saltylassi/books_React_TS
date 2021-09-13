import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BookType, RootState } from '../types';
import { getBooks as getBooksSagaStart } from '../redux/modules/books';

const useBooks = () => {
  const books = useSelector<RootState, BookType[] | null>((state) => state.books.books);
  const loading = useSelector<RootState, boolean>((state) => state.books.loading);
  const error = useSelector<RootState, Error | null>((state) => state.books.error);

  const dispatch = useDispatch();

  const getBooks = useCallback(() => {
    dispatch(getBooksSagaStart());
  }, [dispatch]);

  return { books, loading, error, getBooks };
};

export default useBooks;
