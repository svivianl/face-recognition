import React, { FunctionComponent, createContext, useReducer } from "react";
import { userReducer } from "../store/reducers";
import { createUserState } from "../store/types";
import { User } from "../components/types";
import * as actions from "../store/actions";

const initialState = createUserState();

export const GlobalContext = createContext(initialState);

export const GlobalProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const postUser = (user: User) =>
    dispatch({ type: actions.UserActionsTypes.PostUser, payload: user });

  const deleteUser = () =>
    dispatch({
      type: actions.UserActionsTypes.DeleteUser,
    });

  return (
    <GlobalContext.Provider value={{ ...state, postUser, deleteUser }}>
      {children}
    </GlobalContext.Provider>
  );
};
