import { createAction } from "typesafe-actions";
import { User } from "../components/types";

export enum UserActionsTypes {
  GetUser = "User/GetUser",
  GetUserSuccess = "User/GetUserSuccess",
  GetUserError = "User/GetUserError",
  GetUserCancel = "User/GetUserCancel",
  PostUser = "User/PostUser",
  PostUserSuccess = "User/PostUserSuccess",
  PostUserError = "User/PostUserError",
  PostUserCancel = "User/PostUserCancel",
  DeleteUser = "User/DeleteUser",
  DeleteUserSuccess = "User/DeleteUserSuccess",
  DeleteUserError = "User/DeleteUserError",
  DeleteUserCancel = "User/DeleteUserCancel",
}

export const getUser = createAction(UserActionsTypes.GetUser)();

export const getUserSuccess = createAction(
  UserActionsTypes.GetUserSuccess,
  (user: User) => user
)();

export const getUserError = createAction(
  UserActionsTypes.GetUserError,
  (error: Error) => ({ message: error.message, type: "get-user" })
)();

export const getUserCancel = createAction(UserActionsTypes.GetUserCancel)();

export const postUser = createAction(UserActionsTypes.PostUser)();

export const postUserSuccess = createAction(
  UserActionsTypes.PostUserSuccess,
  (user: User) => user
)();

export const postUserError = createAction(
  UserActionsTypes.PostUserError,
  (error: Error) => ({ message: error.message, type: "post-user" })
)();

export const postUserCancel = createAction(UserActionsTypes.PostUserCancel)();

export const deleteUser = createAction(UserActionsTypes.DeleteUser)();

export const deleteUserSuccess = createAction(
  UserActionsTypes.DeleteUserSuccess,
  (user: User) => user
)();

export const deleteUserError = createAction(
  UserActionsTypes.DeleteUserError,
  (error: Error) => ({ message: error.message, type: "delete-user" })
)();

export const deleteUserCancel = createAction(
  UserActionsTypes.DeleteUserCancel
)();
