import React from "react";
import FormViewProps from "./FormViewProps";
import "../../../css/features/form.css";

const FormView = ({
  name,
  buttonText,
  buttonDisabled,
  user,
  error,
  onChange,
  onSubmit,
  children,
}: FormViewProps) => {
  return (
    <div className="border border-dark rounded form-container mt-5">
      <h1 className="text-center mb-5">{name}</h1>
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
          {error && error.email && (
            <div className="text-danger">{error.email}</div>
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
          {error && error.password && (
            <div className="text-danger">{error.password}</div>
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
