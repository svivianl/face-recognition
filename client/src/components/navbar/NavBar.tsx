import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import Logo from "./components/Logo";
import * as store from "../../store/users/store";
import "../../css/navbar/navbar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(store.userSelectors.getUser);
  const { token } = user;

  const isLoggedOut = !token;

  const onSignOut = () => {
    if (token) {
      store.signOut(dispatch)({ token });
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center m-2">
      <Logo />
      <div className="d-flex">
        {isLoggedOut ? (
          <Fragment>
            <Nav.Link href="/signin" className="nav-link-text">
              Sign In
            </Nav.Link>
            <Nav.Link href="/register" className="nav-link-text">
              Register
            </Nav.Link>
          </Fragment>
        ) : (
          <Nav.Link
            href="/signout"
            className="nav-link-text"
            onClick={onSignOut}
          >
            Sign Out
          </Nav.Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
