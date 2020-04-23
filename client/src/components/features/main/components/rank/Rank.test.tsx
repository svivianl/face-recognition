import React from "react";
import { shallow } from "enzyme";
import * as Redux from "react-redux";
import Rank from "./Rank";
import { RootState } from "../../../../../store/reducers";
import { UserState } from "../../../../../store/users/types";

// describe("Rank component", () => {
//   it("should not render without been logged in", () => {
//     expect(shallow(<Rank />)).toMatchSnapshot();
//   });

//   it("should render when user is logged in", () => {

//     expect(shallow(<Rank />)).toMatchSnapshot();
//   });
// });

describe("Rank component", () => {
  let useSelectorSpy: jest.SpyInstance;
  beforeEach(() => {
    useSelectorSpy = jest.spyOn(Redux, "useSelector");
  });
  it("should work", () => {
    useSelectorSpy.mockReturnValue({
      name: "John Doe",
      entries: 15,
      token: "0d48c11f-a6b0-49dc-be35-1873af9f3624",
    });
    const wrapper = shallow(<Rank />);
    const component = wrapper.find(`h3`);
    expect(component.length).toBe(1);
    expect(component.text()).toBe("John Doe, your current entry count is");
    // expect(wrapper).toMatchSnapshot();
  });
});
