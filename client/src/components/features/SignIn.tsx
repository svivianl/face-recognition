import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  SignIn as SingInType,
  handleSignInErrors,
  SignInInitialValues,
} from "../types";
import { GlobalContext } from "../../context/GlobalContext";
import FormView from "./components/FormView";

const SignIn = () => {
  const { postUser } = useContext(GlobalContext);
  const [user, setUser] = useState(SignInInitialValues);
  const [error, setError] = useState({} as SingInType);
  const [isSendingForm, setIsSendingForm] = useState(false);
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({} as SingInType);
    setUser({ ...user, [e.target.id]: e.target.value });
    e.preventDefault();
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { error, errorMessages } = handleSignInErrors(user);

    setError(errorMessages);

    if (!error) {
      setIsSendingForm(true);
      // TODO: call API
      postUser({ ...user, name: "" });
      setIsSendingForm(false);
      setUser(SignInInitialValues);
      history.push("/");
    }

    e.preventDefault();
  };
  return (
    <FormView
      name={"Sign In"}
      buttonText={isSendingForm ? "Signing in" : "Sign In"}
      buttonDisabled={isSendingForm ? true : false}
      user={user}
      error={error}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default SignIn;
