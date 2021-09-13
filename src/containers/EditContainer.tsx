import { goBack } from 'connected-react-router';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BookReqType, RootState } from '../types';
import { logout as LogoutSagaStart } from '../redux/modules/auth';
import { editBook as editBookSagaStart } from '../redux/modules/books';
import Edit from '../components/Edit';

const EditContainer = () => {
  const loading = useSelector<RootState, boolean>((state) => state.books.loading);
  const dispatch = useDispatch();

  const back = useCallback(() => {
    dispatch(goBack());
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(LogoutSagaStart());
  }, [dispatch]);

  const edit = useCallback(
    (bookId: number, book: BookReqType) => {
      dispatch(editBookSagaStart(bookId, book));
    },
    [dispatch]
  );

  return <Edit loading={loading} back={back} logout={logout} edit={edit} />;
};
export default EditContainer;
