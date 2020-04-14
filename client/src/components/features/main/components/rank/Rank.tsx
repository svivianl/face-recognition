import React, { Fragment, useContext } from "react";
import { GlobalContext } from "../../../../../context/GlobalContext";

const Rank = () => {
  const { user } = useContext(GlobalContext);
  return (
    <Fragment>
      <h3 className="text-center">{`${user.name}, your current entry count is...`}</h3>
      <h1 className="text-center">{10}</h1>
    </Fragment>
  );
};

export default Rank;
