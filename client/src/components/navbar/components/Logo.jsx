import React from "react";
import Tilt from "react-tilt";
import face from "../../../img/face.png";
import "../../../css/navbar/components/logo.css";

const Logo = () => {
  return (
    <div className="navbar-shadow ">
      <Tilt className="Tilt" options={{ max: 55 }}>
        <img alt="logo" src={face} />
      </Tilt>
    </div>
  );
};

export default Logo;
