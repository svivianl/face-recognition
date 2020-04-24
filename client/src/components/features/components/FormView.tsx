import React from "react";
import FormViewProps from "./FormViewProps";
import "../../../css/features/form.css";

const FormView = ({
  name,
  buttonText,
  buttonDisabled,
  user,
  inputError,
  error,
  onChange,
  onSubmit,
  children,
}: FormViewProps) => {
  return (
    <div className="border border-dark rounded form-container mt-5">
      <div className="mb-5">
        <h1 className="text-center">{name}</h1>
        {error && (
          <p id="form-error" className="text-danger text-center mb-3 mt-3">
            {error}
          </p>
        )}
      </div>
      <form>
        {children}
        <div className="form-group">
          <div className="form-input">
            <label htmlFor="email" className="mr-2">
              E-mail<span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control d-inline-block"
              id="email"
              placeholder="name@example.com"
              onChange={onChange}
              value={user.email}
            />
          </div>
          {inputError && inputError.email && (
            <div>
              <p id="error-email" className="text-danger">
                {inputError.email}
              </p>
            </div>
          )}
        </div>
        <div className="form-group column">
          <div className="form-input">
            <label htmlFor="password" className="mr-2">
              Password<span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              id="password"
              type="password"
              onChange={onChange}
              value={user.password}
            />
          </div>
          {inputError && inputError.password && (
            <div>
              <p id="error-password" className="text-danger">
                {inputError.password}
              </p>
            </div>
          )}
        </div>
        <div className="col text-center">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={onSubmit}
            disabled={buttonDisabled}
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormView;
