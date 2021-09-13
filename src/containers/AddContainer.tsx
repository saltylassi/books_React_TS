import { goBack } from 'connected-react-router';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Add from '../components/Add';
import { RootState } from '../types';
import { logout as LogoutStartSaga } from '../redux/modules/auth';

const AddContainer = () => {
  const loading = useSelector<RootState, boolean>((state) => state.books.loading);
  const dispatch = useDispatch();

  const back = useCallback(() => {
    dispatch(goBack());
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(LogoutStartSaga());
  }, [dispatch]);

  return <Add loading={loading} back={back} logout={logout} />;
};
export default AddContainer;
