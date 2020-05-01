import { Dispatch } from "redux";
import * as actions from "./actions";
import * as selectors from "./selectors";
import { SignIn, Register } from "../../types";

export const register = (dispatch: Dispatch<any>) => (userBody: Register) => {
  dispatch(actions.register(userBody));
};

export const signIn = (dispatch: Dispatch<any>) => (userBody: SignIn) => {
  dispatch(actions.signIn(userBody));
};

export const getUser = (dispatch: Dispatch<any>) => () => {
  dispatch(actions.getUser());
};

export const update = (dispatch: Dispatch<any>) => (userBody: Register) => {
  dispatch(actions.update(userBody));
};

export const updateEntries = (dispatch: Dispatch<any>) => () => {
  dispatch(actions.updateEntries());
};

export const signOut = (dispatch: Dispatch<any>) => () => {
  dispatch(actions.signOut());
};

export const userSelectors = { ...selectors };
