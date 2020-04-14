import React from "react";
import Particles from "react-particles-js";
import { particlesParams } from "./types";
import { GlobalProvider } from "../context/GlobalContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/App.css";

function App() {
  return (
    <div className="App">
      <Particles className="particles" params={particlesParams} />
      <GlobalProvider>
        <header>{/* TODO: navbar */}</header>
        <main className="d-flex justify-content-center">
          {/* TODO: routes */}
        </main>
      </GlobalProvider>
    </div>
  );
}

export default App;
