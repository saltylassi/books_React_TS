import { call, put, select, takeEvery } from '@redux-saga/core/effects';
import { push } from 'connected-react-router';
import { Action, handleActions } from 'redux-actions';
import TokenService from '../../Services/TokenServices';
import UserService from '../../Services/UserServices';
import { AuthState, LoginReqType } from '../../types';

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

const prefix = 'books/auth';

const PENDING = `${prefix}/PENDING`;
const SUCCESS = `${prefix}/SUCCESS`;
const FAIL = `${prefix}/FAIL`;

const pending = () => {
  return { type: PENDING };
};

const success = (token: string | null) => {
  return { type: SUCCESS, payload: token };
};

const fail = (error: any) => {
  return { type: FAIL, payload: error };
};

const reducer = handleActions<AuthState, any>(
  {
    [PENDING]: (state) => {
      return { ...state, loading: true, error: null };
    },
    [SUCCESS]: (state, action) => {
      return { token: action.payload, loading: true, error: null };
    },
    [FAIL]: (state, action) => {
      return { ...state, loading: true, error: action.payload };
    },
  },
  initialState
);

export default reducer;

// saga

const LOGIN = `${prefix}/LOGIN`;
const LOGOUT = `${prefix}/LOGOUT`;

export const login = (data: any) => {
  return { type: LOGIN, payload: data };
};

export const logout = () => {
  return { type: LOGOUT };
};

function* loginSaga(action: Action<LoginReqType>) {
  try {
    yield put(pending());
    const token: string = yield call(UserService.login, action.payload);
    TokenService.set(token);
    yield put(success(token));
    yield put(push('/'));
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN ERROR')));
  }
}

function* logoutSaga() {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    yield call(UserService.logout, token);
  } catch (error) {
  } finally {
    TokenService.remove();
    yield put(success(null));
  }
}

export function* authSaga() {
  yield takeEvery(LOGIN, loginSaga);
  yield takeEvery(LOGOUT, logoutSaga);
}
