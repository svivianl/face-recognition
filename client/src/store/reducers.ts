import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import { UserState } from "./users/types";
import { userReducer } from "./users/reducer";
export interface RootState {
  router: RouterState;
  userState: UserState;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    userState: userReducer,
  });
