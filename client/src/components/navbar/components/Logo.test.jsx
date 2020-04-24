import React from "react";
import { shallow } from "enzyme";
import Tilt from "react-tilt";
import Logo from "./Logo";

it("should render", () => {
  // expect.assertions(3);
  const wrapper = shallow(<Logo />);
  const element = wrapper.find(`div.navbar-shadow`);
  expect(element.length).toBe(1);
  expect(wrapper.find(Tilt).length).toEqual(1);
  const elementImg = wrapper.find(`img`);
  expect(elementImg.length).toBe(1);
});
