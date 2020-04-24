import React from "react";
import { shallow } from "enzyme";
import Loader from "./Loader";

describe("Loader component", () => {
  it("should not render", () => {
    const wrapper = shallow(<Loader showIf={false} />);
    const element = wrapper.find(`div.loader`);
    expect(element.length).toBe(0);
  });

  it("should render", () => {
    expect.assertions(2);
    const wrapper = shallow(<Loader showIf={true} />);
    const element = wrapper.find(`div.loader`);
    expect(element.length).toBe(1);
    const elementCirular = wrapper.find(`div.circular-progress`);
    expect(elementCirular.length).toBe(1);
  });
});
