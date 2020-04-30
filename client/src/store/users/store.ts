import { Dispatch } from "redux";
import * as actions from "./actions";
import * as selectors from "./selectors";
import { SignIn, Token, Register } from "../../types";

export const register = (dispatch: Dispatch<any>) => (userBody: Register) => {
  dispatch(actions.register(userBody));
};

export const signIn = (dispatch: Dispatch<any>) => (userBody: SignIn) => {
  dispatch(actions.signIn(userBody));
};

export const getUser = (dispatch: Dispatch<any>) => (token: Token) => {
  dispatch(actions.getUser(token));
};

export const update = (dispatch: Dispatch<any>) => (userBody: Register) => {
  dispatch(actions.update(userBody));
};

export const updateEntries = (dispatch: Dispatch<any>) => (token: Token) => {
  dispatch(actions.updateEntries(token));
};

export const signOut = (dispatch: Dispatch<any>) => (token: Token) => {
  dispatch(actions.signOut(token));
};

export const userSelectors = { ...selectors };
