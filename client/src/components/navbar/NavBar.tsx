import React, { Fragment, useContext } from "react";
import { Nav } from "react-bootstrap";
import Logo from "./components/Logo";
import { GlobalContext } from "../../context/GlobalContext";
import "../../css/navbar/navbar.css";

const NavBar = () => {
  const { user, deleteUser } = useContext(GlobalContext);

  const isLoggedOut = !Object.keys(user).length && user.constructor === Object;

  const onSignOut = () => {
    deleteUser();
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
