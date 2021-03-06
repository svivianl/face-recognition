import React, { Fragment, FunctionComponent } from "react";
import { useSelector } from "react-redux";
import * as store from "../../../../../store/users/store";
import "../../../../../css/App.css";

const Rank: FunctionComponent = () => {
  const user = useSelector(store.userSelectors.getUser);
  return (
    <Fragment>
      <h3 className="text-center">{`${user.name}, your current entry count is`}</h3>
      <h1 className="text-center">{user.entries}</h1>
    </Fragment>
  );
};

export default Rank;
