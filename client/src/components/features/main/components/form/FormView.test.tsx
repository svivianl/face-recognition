import React from "react";
import { mount, shallow } from "enzyme";
import FormView from "./FormView";
import FormViewProps from "./FormViewProps";

describe("FormView component", () => {
  let onChangeMock: any = jest.fn();
  let onSubmitMock: any = jest.fn();
  let mockProps: FormViewProps;

  beforeEach(() => {
    onChangeMock.mockClear();
    onSubmitMock.mockClear();

    mockProps = {
      buttonText: "Detect",
      buttonDisabled: false,
      onChange: onChangeMock,
      onSubmit: onSubmitMock,
    };
  });

  it("should render", () => {
    const wrapper = shallow(<FormView {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should change input url", () => {
    expect.assertions(3);

    const input = "https://samples.clarifai";
    const mockEvent = {
      preventDefault() {},
      target: { value: input },
    } as React.ChangeEvent<HTMLInputElement>;
    const wrapper = mount(<FormView {...mockProps} />);
    const component = wrapper.find(`[id="url"]`);

    expect(component.length).toBe(1);
    component.at(0).simulate("change", mockEvent);
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(onChangeMock).toMatchSnapshot();
  });
});
