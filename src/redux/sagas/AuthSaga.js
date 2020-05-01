import { all, takeLatest, put, call } from "redux-saga/effects";
import { request, setupHttpConfig, restAuthRequest } from "../../utils/http";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from "../reducers/AuthReducer";

import { getSimplifiedError } from "../../utils/error";

function login(payload) {
  return request.post("/login/", payload);
}

function* handleLogin(action) {
  try {
    const { status, data } = yield call(login, action.payload);

    if (status === 200) {
      localStorage.setItem("BrandName_auth_token", data.token);
      localStorage.setItem("BrandName_user", JSON.stringify(data.user));
      setupHttpConfig();
      yield put({
        type: USER_LOGIN_SUCCESS,
        user: data.user,
      });
    } else {
      yield put({
        type: USER_LOGIN_ERROR,
        error: "Something went wrong, Please try again later",
      });
    }
  } catch (error) {
    console.log("login error :", error.response);
    yield put({
      type: USER_LOGIN_ERROR,
      error:
        getSimplifiedError(error) ||
        "Something went wrong, Please try again later",
    });
  }
}

function register(payload) {
  return request.post("/signup/", payload);
}

function* handleRegister(action) {
  try {
    const { status, data } = yield call(register, action.payload);

    if (status === 201) {
      localStorage.setItem("BrandName_user", JSON.stringify(data));
      yield put({
        type: USER_REGISTER_SUCCESS,
        user: data,
      });
    } else {
      yield put({
        type: USER_REGISTER_ERROR,
        error: "Something went wrong, Please try again later",
      });
    }
  } catch (error) {
    console.log("signup error :", error.response);
    yield put({
      type: USER_REGISTER_ERROR,
      error:
        getSimplifiedError(error) ||
        "Something went wrong, Please try again later",
    });
  }
}

function forgotPassword(payload) {
  return restAuthRequest.post(`/rest-auth/password/reset/`, payload);
}

function* handleForgotPassword(action) {
  try {
    const { status } = yield call(forgotPassword, action.payload);

    if (status === 200) {
      yield put({
        type: FORGOT_PASSWORD_SUCCESS,
      });
    } else {
      yield put({
        type: FORGOT_PASSWORD_ERROR,
        error: "Something went wrong, Please try again later",
      });
    }
  } catch (error) {
    console.log("forgot password error :", error.response);
    yield put({
      type: FORGOT_PASSWORD_ERROR,
      error:
        getSimplifiedError(error) ||
        "Something went wrong, Please try again later",
    });
  }
}

function resetPassword(payload) {
  return restAuthRequest.post(`/rest-auth/password/reset/confirm/`, payload);
}

function* handleResetPassword(action) {
  try {
    const { status } = yield call(resetPassword, action.payload);

    if (status === 200) {
      yield put({
        type: RESET_PASSWORD_SUCCESS,
      });
    } else {
      yield put({
        type: RESET_PASSWORD_ERROR,
        error: "Something went wrong, Please try again later",
      });
    }
  } catch (error) {
    console.log("reset password error :", error.response);
    yield put({
      type: RESET_PASSWORD_ERROR,
      error:
        getSimplifiedError(error) ||
        "Something went wrong, Please try again later",
    });
  }
}

function logout() {
  return request.post(`/signout/`);
}

function* handleLogout() {
  try {
    const { status } = yield call(logout);

    if (status === 200) {
      yield put({
        type: LOGOUT_SUCCESS,
      });
      localStorage.clear();
      window.location.reload();
    } else {
      yield put({
        type: LOGOUT_ERROR,
        error: "Something went wrong, Please try again later",
      });
    }
  } catch (error) {
    console.log("logout error :", error.response);
    yield put({
      type: LOGOUT_ERROR,
      error:
        getSimplifiedError(error) ||
        "Something went wrong, Please try again later",
    });
  }
}

export default all([
  takeLatest(USER_LOGIN_REQUEST, handleLogin),
  takeLatest(USER_REGISTER_REQUEST, handleRegister),
  takeLatest(FORGOT_PASSWORD_REQUEST, handleForgotPassword),
  takeLatest(RESET_PASSWORD_REQUEST, handleResetPassword),
  takeLatest(LOGOUT_REQUEST, handleLogout),
]);
