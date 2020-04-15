import { createAction } from "typesafe-actions";
import { User, SignIn, Token, Register } from "../../types";

export enum UserActionsTypes {
  Register = "User/Register",
  RegisterSuccess = "User/RegisterSuccess",
  RegisterError = "User/RegisterError",
  RegisterCancel = "User/RegisterCancel",
  SignIn = "User/SignIn",
  SignInSuccess = "User/SignInSuccess",
  SignInError = "User/SignInError",
  SignInCancel = "User/SignInCancel",
  updateEntries = "User/updateEntries",
  updateEntriesSuccess = "User/updateEntriesSuccess",
  updateEntriesError = "User/updateEntriesError",
  updateEntriesCancel = "User/updateEntriesCancel",
  SignOut = "User/SignOut",
  SignOutSuccess = "User/SignOutSuccess",
  SignOutError = "User/SignOutError",
  SignOutCancel = "User/SignOutCancel",
}

export const register = createAction(
  UserActionsTypes.Register,
  (userBody: Register) => userBody
)();

export const registerSuccess = createAction(
  UserActionsTypes.RegisterSuccess,
  (user: User) => user
)();

export const registerError = createAction(
  UserActionsTypes.RegisterError,
  (error: Error) => ({ message: error.message, type: "register-user" })
)();

export const registerCancel = createAction(UserActionsTypes.RegisterCancel)();

export const signIn = createAction(
  UserActionsTypes.SignIn,
  (userBody: SignIn) => userBody
)();

export const signInSuccess = createAction(
  UserActionsTypes.SignInSuccess,
  (user: User) => user
)();

export const signInError = createAction(
  UserActionsTypes.SignInError,
  (error: Error) => ({ message: error.message, type: "signin-user" })
)();

export const signInCancel = createAction(UserActionsTypes.SignInCancel)();

export const updateEntries = createAction(
  UserActionsTypes.updateEntries,
  (token: Token) => token
)();

export const updateEntriesSuccess = createAction(
  UserActionsTypes.updateEntriesSuccess,
  (user: User) => user
)();

export const updateEntriesError = createAction(
  UserActionsTypes.updateEntriesError,
  (error: Error) => ({ message: error.message, type: "update-user-entries" })
)();

export const updateEntriesCancel = createAction(
  UserActionsTypes.updateEntriesCancel
)();

export const signOut = createAction(
  UserActionsTypes.SignOut,
  (token: Token) => token
)();

export const signOutSuccess = createAction(UserActionsTypes.SignOutSuccess)();

export const signOutError = createAction(
  UserActionsTypes.SignOutError,
  (error: Error) => ({ message: error.message, type: "signout-user" })
)();

export const signOutCancel = createAction(UserActionsTypes.SignOutCancel)();
