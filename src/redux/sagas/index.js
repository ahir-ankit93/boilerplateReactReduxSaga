import { all } from "redux-saga/effects";
import AuthSaga from "./AuthSaga";

export function* index() {
  yield all([AuthSaga]);
}
