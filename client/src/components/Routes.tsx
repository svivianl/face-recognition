import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router";
import { useHistory } from "react-router-dom";
import Register from "./features/Register";
import SignIn from "./features/SignIn";
import Main from "./features/main/Main";
import { GlobalContext } from "../context/GlobalContext";

const Routes = () => {
  const { user } = useContext(GlobalContext);
  const history = useHistory();

  const isLoggedOut =
    Object.keys(user).length === 0 && user.constructor === Object;

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
