import React from "react";
import { mount, shallow } from "enzyme";
import FormView from "./FormView";
import FormViewProps from "./FormViewProps";
import { User } from "../../../types";

describe("FormView component", () => {
  let onChangeMock: any = jest.fn();
  let onSubmitMock: any = jest.fn();
  let mockProps: FormViewProps;

  beforeEach(() => {
    onChangeMock.mockClear();
    onSubmitMock.mockClear();

    mockProps = {
      name: "Sign In",
      buttonText: "Sign in",
      buttonDisabled: false,
      user: {} as User,
      onChange: onChangeMock,
      onSubmit: onSubmitMock,
    };
  });

  it("should render", () => {
    expect.assertions(5);
    const wrapper = shallow(<FormView {...mockProps} />);

    expect(wrapper).toMatchSnapshot();

    const element = wrapper.find(`button`);
    expect(element.length).toBe(1);
    expect(element.props().disabled).toBeFalsy();

    const elementError = wrapper.find(`h1`);
    expect(elementError.length).toBe(1);
    expect(elementError.text()).toBe(mockProps.name);
  });

  describe("input", () => {
    describe("render error", () => {
      it("should display 'email' is mandatory", () => {
        expect.assertions(4);

        const error: User = { email: "Please insert your email address" };
        const wrapper = mount(
          <FormView {...mockProps} inputError={error} buttonDisabled={true} />
        );

        const element = wrapper.find(`button`);
        expect(element.length).toBe(1);
        expect(element.props().disabled).toBeTruthy();

        const elementError = wrapper.find(`[id="error-email"]`);
        expect(elementError.length).toBe(1);
        expect(elementError.text()).toBe(error.email);
      });

      it("should display 'password' is mandatory", () => {
        expect.assertions(4);

        const error: User = { password: "Please insert a password" };
        const wrapper = mount(
          <FormView {...mockProps} inputError={error} buttonDisabled={true} />
        );

        const element = wrapper.find(`button`);
        expect(element.length).toBe(1);
        expect(element.props().disabled).toBeTruthy();

        const elementError = wrapper.find(`[id="error-password"]`);
        expect(elementError.length).toBe(1);
        expect(elementError.text()).toBe(error.password);
      });
    });

    it("should change email", () => {
      expect.assertions(2);

      const input = "john@doe.com";
      const mockEvent = {
        preventDefault() {},
        target: { value: input },
      } as React.ChangeEvent<HTMLInputElement>;
      const wrapper = mount(<FormView {...mockProps} />);
      const component = wrapper.find(`[id="email"]`);

      expect(component.length).toBe(1);
      component.at(0).simulate("change", mockEvent);
      expect(onChangeMock.mock.calls.length).toBe(1);
    });

    it("should change password", () => {
      expect.assertions(2);

      const input = "1234567";
      const mockEvent = {
        preventDefault() {},
        target: { value: input },
      } as React.ChangeEvent<HTMLInputElement>;
      const wrapper = mount(<FormView {...mockProps} />);
      const component = wrapper.find(`[id="password"]`);

      expect(component.length).toBe(1);
      component.at(0).simulate("change", mockEvent);
      expect(onChangeMock.mock.calls.length).toBe(1);
    });
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

    const elementError = wrapper.find(`[id="form-error"]`);
    expect(elementError.length).toBe(1);
    expect(elementError.text()).toBe(error);
  });

  it("should render with error", () => {
    expect.assertions(2);

    const error = "Request failed with status code 400";
    const wrapper = mount(<FormView {...mockProps} error={error} />);
    const element = wrapper.find(`[id="form-error"]`);

    expect(element.length).toBe(1);
    expect(element.text()).toBe(error);
  });

  it("should submit form", () => {
    expect.assertions(2);

    const user = {
      email: "john@doe.com",
      password: "1234567",
    };
    const wrapper = mount(<FormView {...mockProps} user={user} />);
    const element = wrapper.find(`button`);
    expect(element.length).toBe(1);
    element.at(0).simulate("click");
    expect(onSubmitMock.mock.calls.length).toBe(1);
  });

  it("should change submit button when submitting", () => {
    expect.assertions(2);

    const wrapper = mount(
      <FormView {...mockProps} buttonDisabled={true} buttonText="Submitting" />
    );
    const element = wrapper.find(`button`);

    expect(element.length).toBe(1);
    expect(element.props().disabled).toBeTruthy();
  });
});
