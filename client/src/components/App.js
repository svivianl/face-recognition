import React from "react";
import Particles from "react-particles-js";
import { particlesParams } from "./types";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/App.css";

function App() {
  return (
    <div className="App">
      <Particles className="particles" params={particlesParams} />
    </div>
  );
}

export default App;
