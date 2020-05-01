import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { handleRegisterErrors, UserInitialValues } from "../types";
import { UserBody } from "../../types";
import FormView from "./components/FormView";
import Loader from "../loader/Loader";
import * as store from "../../store/users/store";
import { saveAuthToken } from "../../types";
import "../../css/features/form.css";

const Register = () => {
  const [user, setUser] = useState(UserInitialValues);
  const [inputError, setInputError] = useState({} as UserBody);
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(store.userSelectors.getIsLoading);
  const token = useSelector(store.userSelectors.getToken);
  const error = useSelector(store.userSelectors.getError);

  useEffect(() => {
    if (token) {
      saveAuthToken(token);
      history.push("/");
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputError({} as UserBody);
    setUser({ ...user, [e.target.id]: e.target.value });
    e.preventDefault();
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { error, errorMessages } = handleRegisterErrors(user);

    setInputError(errorMessages);

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
        inputError={inputError}
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
          {inputError && inputError.name && (
            <div>
              <p className="text-danger">{inputError.name}</p>
            </div>
          )}
        </div>
      </FormView>
      <Loader showIf={isLoading} />
    </Fragment>
  );
};

export default Register;
