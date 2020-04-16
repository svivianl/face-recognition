import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { handleRegisterErrors, UserInitialValues } from "../types";
import { User } from "../../types";
import FormView from "./components/FormView";
import Loader from "../loader/Loader";
import * as store from "../../store/users/store";
import "../../css/features/form.css";

const Register = () => {
  const [user, setUser] = useState(UserInitialValues);
  const [error, setError] = useState({} as User);
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(store.userSelectors.getIsLoading);
  const loggedUser = useSelector(store.userSelectors.getUser);

  useEffect(() => {
    if (loggedUser && loggedUser.token) {
      history.push("/");
    }
  }, [loggedUser, history]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({} as User);
    setUser({ ...user, [e.target.id]: e.target.value });
    e.preventDefault();
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { error, errorMessages } = handleRegisterErrors(user);

    setError(errorMessages);

    if (!error) {
      store.register(dispatch)(user);
      setUser(UserInitialValues);
    }

    e.preventDefault();
  };

  return (
    <Fragment>
      <FormView
        name={"Register"}
        buttonText={isLoading ? "Registering" : "Register"}
        buttonDisabled={isLoading ? true : false}
        user={user}
        error={error}
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <div className="form-input">
            <label htmlFor="name" className="mr-2">
              Name<span className="text-danger">*</span>
            </label>
            <input
              type="name"
              className="form-control d-inline-block"
              id="name"
              placeholder="John"
              onChange={handleChange}
              value={user.name}
            />
          </div>
          {error && error.name && (
            <div className="text-danger">{error.name}</div>
          )}
        </div>
      </FormView>
      <Loader showIf={isLoading} />
    </Fragment>
  );
};

export default Register;
