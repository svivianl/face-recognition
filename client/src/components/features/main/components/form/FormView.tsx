import React from "react";
import FormViewProps from "./FormViewProps";
import "../../../../../css/features/main/components/form/form.css";

const FormView = ({
  buttonText,
  buttonDisabled,
  url,
  error,
  onChange,
  onSubmit,
}: FormViewProps) => {
  return (
    <div className="border border-dark rounded url-form-container form-container mt-3">
      <form>
        <div className="form-group">
          <div className="form-input">
            <label htmlFor="url" className="mr-2">
              URL<span className="text-danger">*</span>
            </label>
            <input
              type="url"
              className="form-control d-inline-block"
              id="url"
              placeholder="https://samples.clarifai.com/face-det.jpg"
              onChange={onChange}
              value={url}
            />
            <button
              type="submit"
              className="btn btn-primary"
              onClick={onSubmit}
              disabled={buttonDisabled}
            >
              {buttonText}
            </button>
          </div>
          {error && <div className="text-danger">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default FormView;
