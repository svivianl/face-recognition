import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { User, handleRegisterErrors, UserInitialValues } from "../types";
import FormView from "./components/FormView";
import "../../css/features/form.css";
import { GlobalContext } from "../../context/GlobalContext";

const Register = () => {
  const { postUser } = useContext(GlobalContext);
  const [user, setUser] = useState(UserInitialValues);
  const [error, setError] = useState({} as User);
  const [isSendingForm, setIsSendingForm] = useState(false);
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({} as User);
    setUser({ ...user, [e.target.id]: e.target.value });
    e.preventDefault();
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { error, errorMessages } = handleRegisterErrors(user);

    setError(errorMessages);

    if (!error) {
      setIsSendingForm(true);
      // TODO: call API
      postUser(user);
      setIsSendingForm(false);
      setUser(UserInitialValues);
      history.push("/");
    }

    e.preventDefault();
  };

  return (
    <FormView
      name={"Register"}
      buttonText={isSendingForm ? "Submitting" : "Submit"}
      buttonDisabled={isSendingForm ? true : false}
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
        {error && error.name && <div className="text-danger">{error.name}</div>}
      </div>
    </FormView>
  );
};

export default Register;
