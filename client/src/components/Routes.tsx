import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { useHistory } from "react-router-dom";
import Register from "./features/Register";
import SignIn from "./features/SignIn";
import Main from "./features/main/Main";
import * as store from "../store/users/store";

const Routes: FunctionComponent = () => {
  const token = useSelector(store.userSelectors.getToken);
  const history = useHistory();

  const isLoggedOut = !token;

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
