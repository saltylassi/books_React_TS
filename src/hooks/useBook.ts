import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BookState, RootState } from '../types';
import { getBook as getBookSagaStart } from '../redux/modules/book';

const useBook = (targetId: number) => {
  const { book: target, loading, error } = useSelector<RootState, BookState>((state) => state.book);
  const dispatch = useDispatch();

  const getBook = useCallback(() => {
    dispatch(getBookSagaStart(targetId));
    console.log(targetId);
  }, [dispatch, targetId]);

  return { target, loading, error, getBook };
};

export default useBook;
