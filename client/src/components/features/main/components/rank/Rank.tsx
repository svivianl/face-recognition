import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import * as store from "../../../../../store/users/store";

const Rank = () => {
  const user = useSelector(store.userSelectors.getUser);
  return (
    <Fragment>
      <h3 className="text-center">{`${user.name}, your current entry count is...`}</h3>
      <h1 className="text-center">{user.entries}</h1>
    </Fragment>
  );
};

export default Rank;
