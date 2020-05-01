import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import { AuthReducer } from "./AuthReducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    Auth: AuthReducer,
    form: FormReducer,
  });

export default createRootReducer;
