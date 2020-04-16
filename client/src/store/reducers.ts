import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import { UserState } from "./users/types";
import { userReducer } from "./users/reducer";
import { ClarifaiState } from "./clarifai/types";
import { clarifaiReducer } from "./clarifai/reducer";
export interface RootState {
  router: RouterState;
  userState: UserState;
  clarifaiState: ClarifaiState;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    userState: userReducer,
    clarifaiState: clarifaiReducer,
  });
