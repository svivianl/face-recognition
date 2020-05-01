import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { handleSignInErrors, SignInInitialValues } from "../types";
import { SignIn as SingInType } from "../../types";
import FormView from "./components/FormView";
import Loader from "../loader/Loader";
import { saveAuthToken } from "../../types";
import * as store from "../../store/users/store";

const SignIn = () => {
  const [user, setUser] = useState(SignInInitialValues);
  const [inputError, setInputError] = useState({} as SingInType);
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(store.userSelectors.getIsLoading);
  // const { id } = useSelector(store.userSelectors.getUser);
  const token = useSelector(store.userSelectors.getToken);
  const error = useSelector(store.userSelectors.getError);

  // useEffect(() => {
  //   if (id) {
  //     history.push("/");
  //   }
  // }, [id, history]);

  // useEffect(() => {
  //   if (token) {
  //     history.push("/");
  //   }
  // }, [token, history]);

  useEffect(() => {
    if (token) {
      saveAuthToken(token);
      history.push("/");
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputError({} as SingInType);
    setUser({ ...user, [e.target.id]: e.target.value });
    e.preventDefault();
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { error, errorMessages } = handleSignInErrors(user);

    setInputError(errorMessages);

    if (!error) {
      store.signIn(dispatch)(user);
      setUser(SignInInitialValues);
    }

    e.preventDefault();
  };

  return (
    <Fragment>
      <FormView
        name={"Sign In"}
        buttonText={isLoading ? "Signing in" : "Sign In"}
        buttonDisabled={isLoading ? true : false}
        user={user}
        inputError={inputError}
        error={error}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <Loader showIf={isLoading} />
    </Fragment>
  );
};

export default SignIn;
