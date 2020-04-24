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
    expect.assertions(3);
    const wrapper = shallow(<FormView {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
    const element = wrapper.find(`button`);
    expect(element.length).toBe(1);
    expect(element.props().disabled).toBeFalsy();
  });

  it("should change input url", () => {
    expect.assertions(2);

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
  });

  it("should disable submit button when 'error' is not empty", () => {
    expect.assertions(4);
    const error = "Please insert a valid URL";
    const wrapper = mount(
      <FormView {...mockProps} error={error} buttonDisabled={true} />
    );

    const element = wrapper.find(`button`);
    expect(element.length).toBe(1);
    expect(element.props().disabled).toBeTruthy();

    const elementError = wrapper.find(`div p`);
    expect(elementError.length).toBe(1);
    expect(elementError.text()).toBe(error);
  });

  it("should render with error", () => {
    expect.assertions(2);

    const error = "Request failed with status code 400";
    const wrapper = mount(<FormView {...mockProps} error={error} />);
    const element = wrapper.find(`div p`);

    expect(element.length).toBe(1);
    expect(element.text()).toBe(error);
  });

  it("should submit url", () => {
    expect.assertions(2);

    const wrapper = mount(<FormView {...mockProps} />);
    const element = wrapper.find(`button`);
    expect(element.length).toBe(1);
    element.at(0).simulate("click");
    expect(onSubmitMock.mock.calls.length).toBe(1);
  });

  it("should change submit button when detecting", () => {
    expect.assertions(2);

    const wrapper = mount(
      <FormView {...mockProps} buttonDisabled={true} buttonText="Detecting" />
    );
    const element = wrapper.find(`button`);

    expect(element.length).toBe(1);
    expect(element.props().disabled).toBeTruthy();
  });
});
