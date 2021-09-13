import { goBack } from 'connected-react-router';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { logout as LogoutSagaStart } from '../redux/modules/auth';
import Detail from '../components/Detail';
import useBook from '../hooks/useBook';
import { useParams } from 'react-router';

const DetailContainer = () => {
  const dispatch = useDispatch();

  const { id }: any = useParams();
  const targetId = parseInt(id);

  const { target, loading, error } = useBook(targetId);

  const back = useCallback(() => {
    dispatch(goBack());
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(LogoutSagaStart());
  }, [dispatch]);

  return <Detail loading={loading} back={back} logout={logout} target={target} />;
};
export default DetailContainer;
