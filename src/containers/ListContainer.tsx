import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import List from '../components/List';
import { logout as logoutSagaStart } from '../redux/modules/auth';
import { deleteBook as deleteBookSagaStart } from '../redux/modules/books';
import { push } from 'connected-react-router';
import useBooks from '../hooks/useBooks';

export default function ListContainer() {
  const dispatch = useDispatch();

  const { books, loading, error, getBooks } = useBooks();

  const logout = useCallback(() => {
    dispatch(logoutSagaStart());
  }, [dispatch]);

  const goAdd = useCallback(() => {
    dispatch(push('/add'));
  }, [dispatch]);

  const goEdit = useCallback(
    (bookId: number) => {
      dispatch(push(`edit/${bookId}`));
    },
    [dispatch]
  );

  const deleteBook = useCallback(
    (bookId: number) => {
      dispatch(deleteBookSagaStart(bookId));
    },
    [dispatch]
  );

  return (
    <List
      books={books}
      loading={loading}
      error={error}
      getBooks={getBooks}
      logout={logout}
      goAdd={goAdd}
      deleteBook={deleteBook}
      goEdit={goEdit}
    />
  );
}
