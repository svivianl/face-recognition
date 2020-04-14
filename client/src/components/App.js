import React from "react";
import Particles from "react-particles-js";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import { particlesParams } from "./types";
import { GlobalProvider } from "../context/GlobalContext";
import Routes from "./Routes";
import NavBar from "./navbar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/App.css";

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Particles className="particles" params={particlesParams} />
      <GlobalProvider>
        <header>
          <NavBar />
        </header>
        <main className="d-flex justify-content-center">
          <Router history={history}>
            <Routes />
          </Router>
        </main>
      </GlobalProvider>
    </div>
  );
}

export default App;
