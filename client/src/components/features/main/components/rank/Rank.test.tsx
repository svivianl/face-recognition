import React from "react";
import { shallow } from "enzyme";
import * as Redux from "react-redux";
import Rank from "./Rank";

describe("Rank component", () => {
  let useSelectorSpy: jest.SpyInstance;
  beforeEach(() => {
    useSelectorSpy = jest.spyOn(Redux, "useSelector");
  });
  it("should render", () => {
    expect.assertions(4);
    useSelectorSpy.mockReturnValue({
      name: "John Doe",
      entries: 15,
      token: "0d48c11f-a6b0-49dc-be35-1873af9f3624",
    });
    const wrapper = shallow(<Rank />);
    const elementH3 = wrapper.find(`h3`);
    expect(elementH3.length).toBe(1);
    expect(elementH3.text()).toBe("John Doe, your current entry count is");
    const elementH1 = wrapper.find(`h1`);
    expect(elementH1.length).toBe(1);
    expect(elementH1.text()).toBe("15");
  });
});
