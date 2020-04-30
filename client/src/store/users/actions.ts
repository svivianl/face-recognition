import { createAction } from "typesafe-actions";
import { User, SignIn, Token, Register } from "../../types";

export enum UserActionsTypes {
  Register = "user/Register",
  RegisterSuccess = "user/RegisterSuccess",
  RegisterError = "user/RegisterError",
  RegisterCancel = "user/RegisterCancel",
  SignIn = "user/SignIn",
  SignInSuccess = "user/SignInSuccess",
  SignInError = "user/SignInError",
  SignInCancel = "user/SignInCancel",
  GetUser = "user/GetUser",
  GetUserSuccess = "user/GetUserSuccess",
  GetUserError = "user/GetUserError",
  GetUserCancel = "user/GetUserCancel",
  Update = "user/update",
  UpdateSuccess = "user/UpdateSuccess",
  UpdateError = "user/UpdateError",
  UpdateCancel = "user/UpdateCancel",
  UpdateEntries = "user/UpdateEntries",
  UpdateEntriesSuccess = "user/UpdateEntriesSuccess",
  UpdateEntriesError = "user/UpdateEntriesError",
  UpdateEntriesCancel = "user/UpdateEntriesCancel",
  SignOut = "user/SignOut",
  SignOutSuccess = "user/SignOutSuccess",
  SignOutError = "user/SignOutError",
  SignOutCancel = "user/SignOutCancel",
}

export const register = createAction(
  UserActionsTypes.Register,
  (userBody: Register) => userBody
)();

export const registerSuccess = createAction(
  UserActionsTypes.RegisterSuccess,
  (token: string) => token
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
  (token: string) => token
)();

export const signInError = createAction(
  UserActionsTypes.SignInError,
  (error: Error) => ({ message: error.message, type: "signin-user" })
)();

export const signInCancel = createAction(UserActionsTypes.SignInCancel)();

export const getUser = createAction(
  UserActionsTypes.GetUser,
  (token: Token) => token
)();

export const getUserSuccess = createAction(
  UserActionsTypes.GetUserSuccess,
  (user: User) => user
)();

export const getUserError = createAction(
  UserActionsTypes.GetUserError,
  (error: Error) => ({ message: error.message, type: "get-user" })
)();

export const getUserCancel = createAction(UserActionsTypes.GetUserCancel)();

export const update = createAction(
  UserActionsTypes.Update,
  (user: User) => user
)();

export const updateSuccess = createAction(
  UserActionsTypes.UpdateSuccess,
  (user: User) => user
)();

export const updateError = createAction(
  UserActionsTypes.UpdateError,
  (error: Error) => ({ message: error.message, type: "update-user" })
)();

export const updateCancel = createAction(UserActionsTypes.UpdateCancel)();

export const updateEntries = createAction(
  UserActionsTypes.UpdateEntries,
  (token: Token) => token
)();

export const updateEntriesSuccess = createAction(
  UserActionsTypes.UpdateEntriesSuccess,
  (user: User) => user
)();

export const updateEntriesError = createAction(
  UserActionsTypes.UpdateEntriesError,
  (error: Error) => ({ message: error.message, type: "update-user-entries" })
)();

export const updateEntriesCancel = createAction(
  UserActionsTypes.UpdateEntriesCancel
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
