import React from "react";
import Particles from "react-particles-js";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import { particlesParams } from "./types";
import Routes from "./Routes";
import NavBar from "./navbar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/App.css";

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Particles className="particles" params={particlesParams} />
      <header>
        <NavBar />
      </header>
      <main className="d-flex flex-column justify-content-center align-items-center mt-5 mb-5">
        <Router history={history}>
          <Routes />
        </Router>
      </main>
    </div>
  );
}

export default App;
