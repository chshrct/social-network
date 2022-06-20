import { FormikHelpers } from 'formik';
import { Reducer } from 'redux';

import { ThunkApp } from './redux-store';

import { authApi, LoginInfoType } from 'api/auth';
import { ZERO } from 'constant';

enum ActionTypes {
  SET_USER_DATA = 'SET_USER_DATA',
}

type SetUserDataAction = {
  type: ActionTypes.SET_USER_DATA;
  data: {
    userId: number | null;
    email: string | null;
    login: string | null;
  };
};

export type RootAuthAction = SetUserDataAction;
type StateType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

const initialState: StateType = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
};

const authReducer: Reducer<StateType, RootAuthAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ActionTypes.SET_USER_DATA:
      return { ...state, ...action.data, isAuth: !!action.data.userId };
    default:
      return state;
  }
};

export const setUserData = (
  userId: number | null,
  email: string | null,
  login: string | null,
): SetUserDataAction => ({
  type: ActionTypes.SET_USER_DATA,
  data: {
    userId,
    email,
    login,
  },
});

// thunk

export const getAuthUserData = (): ThunkApp => dispatch => {
  return authApi.me().then(response => {
    if (response.data.resultCode === ZERO)
      dispatch(
        setUserData(
          response.data.data.id,
          response.data.data.email,
          response.data.data.login,
        ),
      );
  });
};
export const login =
  (
    loginInfo: LoginInfoType,
    actions: FormikHelpers<{
      email: string;
      password: string;
      rememberMe: boolean;
    }>,
  ): ThunkApp =>
  dispatch => {
    actions.setSubmitting(true);
    authApi.login(loginInfo).then(response => {
      if (response.data.resultCode === ZERO) dispatch(getAuthUserData());
      actions.setSubmitting(false);
    });
  };

export const logout = (): ThunkApp => dispatch => {
  authApi.logout().then(response => {
    if (response.data.resultCode === ZERO) dispatch(setUserData(null, null, null));
  });
};

export default authReducer;
