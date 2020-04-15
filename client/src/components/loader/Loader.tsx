import React from "react";
import LoaderProps from "./LoaderProps";
import "../../css/loader/loader.css";

const Loader = ({ showIf }: LoaderProps) => {
  if (!showIf) {
    return null;
  }

  return (
    <div className="loader">
      <div className="circular-progress"></div>
    </div>
  );
};

export default Loader;
