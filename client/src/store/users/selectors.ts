import { createSelector, Selector } from "reselect";
import { User } from "../../types";
import { RootState } from "../reducers";
import { UserState } from "./types";

export const getUsersState = (state: RootState) => state.userState;

export const getUser: Selector<RootState, User> = createSelector(
  getUsersState,
  (state: UserState) => state?.user || {}
);

export const getIsLoading: Selector<RootState, boolean> = createSelector(
  getUsersState,
  (state: UserState) => state?.isLoading || false
);
