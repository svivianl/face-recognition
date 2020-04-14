import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";

import { ActionType, getType } from "typesafe-actions";
import * as actions from "./actions";
// import { UserActionsTypes } from "./actions";
// import * as UserActions from "./actions";
import { UserState, MessageError, createUserState } from "./types";
import { User } from "../components/types";

export const userReducer = (
  state: UserState = createUserState(),
  action: ActionType<typeof actions.UserActionsTypes | any>
): UserState => {
  const { type, payload } = action;
  console.log("action: ", action);
  switch (type) {
    // case getType(actions.getUser):
    case getType(actions.postUser):
      return { ...state, user: payload, isLoading: false, status: null };
    case getType(actions.deleteUser):
      return { ...state, user: {} as User, isLoading: false, status: null };
    //   return { ...state, isLoading: true };
    // case getType(actions.getUserSuccess):
    // case getType(actions.postUserSuccess):
    //   return { ...state, user: payload, isLoading: false, status: null };
    // case getType(actions.deleteUserSuccess):
    //   return { ...state, user: {} as User, isLoading: false, status: null };
    // case getType(actions.getUserError):
    // case getType(actions.postUserError):
    // case getType(actions.deleteUserError):
    //   return {
    //     ...state,
    //     isLoading: false,
    //     status: {
    //       type: "error",
    //       error: payload as MessageError,
    //     },
    //   };
    // case getType(actions.getUserCancel):
    // case getType(actions.postUserCancel):
    // case getType(actions.deleteUserCancel):
    //   return { ...state, isLoading: false };
    default:
      return state;
  }
};

export interface RootState {
  router: RouterState;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
  });
