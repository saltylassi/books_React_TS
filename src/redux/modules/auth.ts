import { call, put, takeEvery } from '@redux-saga/core/effects';
import { push } from 'connected-react-router';
import { Action, createActions, handleActions } from 'redux-actions';
import TokenService from '../../Services/TokenServices';
import UserService from '../../Services/UserServices';
import { LoginReqType } from '../../types';

interface AuthState {
  token: string | null;
  loading: boolean;
  error: Error | null;
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

const prefix = 'books/auth';

export const { pending, success, fail } = createActions('PENDING', 'SUCCESS', 'FAIL', { prefix });

const reducer = handleActions<AuthState, any>(
  {
    PENDING: (state) => {
      return { ...state, loading: true, error: null };
    },
    SUCCESS: (state, action) => {
      return { token: action.payload, loading: true, error: null };
    },
    FAIL: (state, action) => {
      return { ...state, loading: true, error: action.payload };
    },
  },
  initialState
);

export default reducer;

// saga

export const { login, logout } = createActions('LOGIN', 'LOGOUT', { prefix });

function* loginSaga(action: Action<LoginReqType>) {
  try {
    yield put(pending());
    const token: string = yield call(UserService.login, action.payload);
    TokenService.set(token); // 로컬 스토리지에
    yield put(success(token));
    yield put(push('/'));
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN ERROR')));
  }
}

function* logoutSaga() {}

export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga);
}
