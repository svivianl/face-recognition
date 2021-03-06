import { createAction } from "typesafe-actions";
import { User, SignIn, Register, Token } from "../../types";

export enum UserActionsTypes {
  Register = "user/Register",
  RegisterSuccess = "user/RegisterSuccess",
  RegisterError = "user/RegisterError",
  RegisterCancel = "user/RegisterCancel",
  SignIn = "user/SignIn",
  SignInSuccess = "user/SignInSuccess",
  SignInError = "user/SignInError",
  SignInCancel = "user/SignInCancel",
  SignInToken = "user/SignInToken",
  SignInTokenSuccess = "user/SignInTokenSuccess",
  SignInTokenError = "user/SignInTokenError",
  SignInTokenCancel = "user/SignInTokenCancel",
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
  (token: Token) => token
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
  (token: Token) => token
)();

export const signInError = createAction(
  UserActionsTypes.SignInError,
  (error: Error) => ({ message: error.message, type: "signin-user" })
)();

export const signInCancel = createAction(UserActionsTypes.SignInCancel)();

export const signInToken = createAction(UserActionsTypes.SignInToken)();

export const signInTokenSuccess = createAction(
  UserActionsTypes.SignInTokenSuccess,
  (token: Token) => token
)();

export const signInTokenError = createAction(
  UserActionsTypes.SignInTokenError,
  (error: Error) => ({ message: error.message, type: "signin-user" })
)();

export const signInTokenCancel = createAction(
  UserActionsTypes.SignInTokenCancel
)();

export const getUser = createAction(
  UserActionsTypes.GetUser,
  (id: number) => id
)();

export const getUserSuccess = createAction(
  UserActionsTypes.GetUserSuccess,
  (user: any) => user
)();

export const getUserError = createAction(
  UserActionsTypes.GetUserError,
  (error: Error) => ({ message: error.message, type: "get-user" })
)();

export const getUserCancel = createAction(UserActionsTypes.GetUserCancel)();

// export const update = createAction(
//   UserActionsTypes.Update,
//   (user: User) => user
// )();

// export const updateSuccess = createAction(
//   UserActionsTypes.UpdateSuccess,
//   (user: User) => user
// )();

// export const updateError = createAction(
//   UserActionsTypes.UpdateError,
//   (error: Error) => ({ message: error.message, type: "update-user" })
// )();

export const updateCancel = createAction(UserActionsTypes.UpdateCancel)();

export const updateEntries = createAction(
  UserActionsTypes.UpdateEntries,
  (id: number) => id
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

export const signOut = createAction(UserActionsTypes.SignOut)();

export const signOutSuccess = createAction(UserActionsTypes.SignOutSuccess)();

export const signOutError = createAction(
  UserActionsTypes.SignOutError,
  (error: Error) => ({ message: error.message, type: "signout-user" })
)();

export const signOutCancel = createAction(UserActionsTypes.SignOutCancel)();
