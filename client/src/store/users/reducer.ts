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
      return {
        ...state,
        isLoading: true,
        token: "",
        user: {} as User,
        status: null,
      };
    case getType(UserActions.getUser):
    // case getType(UserActions.update):
    case getType(UserActions.updateEntries):
    case getType(UserActions.signOut):
      return { ...state, isLoading: true, status: null };
    case getType(UserActions.registerSuccess):
    case getType(UserActions.signInSuccess):
      const { token, id } = payload;
      return { ...state, token, user: { id }, isLoading: false, status: null };
    case getType(UserActions.getUserSuccess):
      return { ...state, user: payload, isLoading: false, status: null };
    // case getType(UserActions.updateSuccess):
    case getType(UserActions.updateEntriesSuccess):
      const updatedUser = { ...state.user, ...payload };
      return { ...state, user: updatedUser, isLoading: false, status: null };
    case getType(UserActions.signOutSuccess):
      return {
        ...state,
        token: "",
        user: {} as User,
        isLoading: false,
        status: null,
      };
    case getType(UserActions.registerError):
    case getType(UserActions.signInError):
    case getType(UserActions.getUserError):
    // case getType(UserActions.updateError):
    case getType(UserActions.updateEntriesError):
    case getType(UserActions.signOutError):
      return {
        ...state,
        isLoading: false,
        status: {
          type: "error",
          error: payload as MessageError,
        },
      };
    case getType(UserActions.registerCancel):
    case getType(UserActions.signInCancel):
    case getType(UserActions.getUserCancel):
    case getType(UserActions.updateCancel):
    case getType(UserActions.updateEntriesCancel):
    case getType(UserActions.signOutCancel):
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
