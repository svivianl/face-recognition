import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import Particles from "react-particles-js";
import { Router } from "react-router";
import Routes from "./Routes";
import Navbar from "./navbar/NavigationBar";
import { configureStore } from "../store";

describe("App", () => {
  it("should render", () => {
    expect.assertions(4);
    const store = configureStore();
    const wrapper = shallow(<App store={store} />);
    expect(wrapper.find(Particles).length).toEqual(1);
    expect(wrapper.find(Navbar).length).toEqual(1);
    expect(wrapper.find(Router).length).toEqual(1);
    expect(wrapper.find(Routes).length).toEqual(1);
  });
});
