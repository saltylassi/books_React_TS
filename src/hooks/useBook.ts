import { useSelector } from 'react-redux';
import { BookType, RootState } from '../types';

const useBook = (targetId: number) => {
  const books = useSelector<RootState, BookType[] | null>((state) => state.books.books);
  const loading = useSelector<RootState, boolean>((state) => state.books.loading);
  const error = useSelector<RootState, Error | null>((state) => state.books.error);

  const target = books?.filter((book) => {
    return book.bookId === targetId;
  })[0];

  return { target, loading, error };
};

export default useBook;
