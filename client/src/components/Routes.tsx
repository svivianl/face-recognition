import React, { FunctionComponent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { useHistory } from "react-router-dom";
import Register from "./features/Register";
import SignIn from "./features/SignIn";
import Main from "./features/main/Main";
import { getToken } from "../types";
import * as store from "../store/users/store";

const Routes: FunctionComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = getToken();
  const isLoggedOut = !token;

  useEffect(() => {
    if (token) {
      store.getUser(dispatch)();
    }
  }, [token]);

  if (history.location.pathname === "/" && isLoggedOut) {
    return <Redirect to="/signin" />;
  }

  if (history.location.pathname === "/signout" && isLoggedOut) {
    return <Redirect to="/signin" />;
  }

  return (
    <Switch>
      <Route path="/register" exact={true} component={Register} />
      <Route path="/signin" component={SignIn} />
      <Route path="/" component={Main} />
    </Switch>
  );
};

export default Routes;
