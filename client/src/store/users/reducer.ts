import { ActionType, getType } from "typesafe-actions";
import { UserActionsTypes } from "./actions";
import * as UserActions from "./actions";
import { UserState, MessageError, createUserState } from "./types";
import { User } from "../../types";

export const userReducer = (
  state: UserState = createUserState(),
  action: ActionType<typeof UserActionsTypes | any>
): UserState => {
  const { type, payload } = action;

  switch (type) {
    case getType(UserActions.register):
    case getType(UserActions.signIn):
    case getType(UserActions.updateEntries):
    case getType(UserActions.signOut):
      return { ...state, isLoading: true };
    case getType(UserActions.registerSuccess):
    case getType(UserActions.signInSuccess):
      return { ...state, user: payload, isLoading: false, status: null };
    case getType(UserActions.updateEntriesSuccess):
      const updatedUser = { ...state.user, ...payload };
      return { ...state, user: updatedUser, isLoading: false, status: null };
    case getType(UserActions.signOutSuccess):
      return { ...state, user: {} as User, isLoading: false, status: null };
    case getType(UserActions.registerError):
    case getType(UserActions.signInError):
    case getType(UserActions.updateEntriesError):
    case getType(UserActions.signOutError):
      return {
        ...state,
        isLoading: false,
        user: {} as User,
        status: {
          type: "error",
          error: payload as MessageError,
        },
      };
    case getType(UserActions.registerCancel):
    case getType(UserActions.signInCancel):
    case getType(UserActions.updateEntriesCancel):
    case getType(UserActions.signOutCancel):
      return { ...state, user: {} as User, isLoading: false };
    default:
      return state;
  }
};
