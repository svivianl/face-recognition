import React from "react";
import { shallow } from "enzyme";
import * as Redux from "react-redux";
import { Action } from "redux";
import { Nav } from "react-bootstrap";
import Navbar from "./Navbar";
import Logo from "./components/Logo";
import { User } from "../../types";

describe("Navbar component", () => {
  let tokenUserSelectorSpy: jest.SpyInstance;
  let mockDispatch: any;
  let useDispatchSpy: jest.SpyInstance;

  beforeEach(() => {
    tokenUserSelectorSpy = jest.spyOn(Redux, "useSelector");
    useDispatchSpy = jest.spyOn(Redux, "useDispatch");
    mockDispatch = jest.fn();
    useDispatchSpy.mockImplementation(() => (cb: Action) => cb);
  });

  it("should render Register and Sign In", () => {
    tokenUserSelectorSpy.mockReturnValue("");
    expect.assertions(3);
    const wrapper = shallow(<Navbar />);
    expect(wrapper.find(Logo).length).toEqual(1);
    expect(
      wrapper.containsMatchingElement(
        <Nav.Link href="/signin">Sign In</Nav.Link>
      )
    ).toBeTruthy();
    expect(
      wrapper.containsMatchingElement(
        <Nav.Link href="/register">Register</Nav.Link>
      )
    ).toBeTruthy();
  });

  it("should render Sign Out", () => {
    tokenUserSelectorSpy.mockReturnValue(
      "0d48c11f-a6b0-49dc-be35-1873af9f3624"
    );

    expect.assertions(2);
    const wrapper = shallow(<Navbar />);
    expect(wrapper.find(Logo).length).toEqual(1);
    expect(
      wrapper.containsMatchingElement(
        <Nav.Link href="/signout">Sign Out</Nav.Link>
      )
    ).toBeTruthy();
  });
});
