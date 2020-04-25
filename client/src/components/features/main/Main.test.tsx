import React from "react";
import { shallow } from "enzyme";
import * as Redux from "react-redux";
import { Action } from "redux";
import Main from "./Main";
import FormView from "./components/form/FormView";
import Rank from "./components/rank/Rank";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";
import Loader from "../../loader/Loader";

describe("Main component", () => {
  let userUseSelectorSpy: jest.SpyInstance;
  let isLoadingUserUseSelectorSpy: jest.SpyInstance;
  let isClarifaiUserUseSelectorSpy: jest.SpyInstance;
  let useDispatchSpy: jest.SpyInstance;
  let mockDispatch: any;

  beforeEach(() => {
    userUseSelectorSpy = jest.spyOn(Redux, "useSelector");
    isLoadingUserUseSelectorSpy = jest.spyOn(Redux, "useSelector");
    isClarifaiUserUseSelectorSpy = jest.spyOn(Redux, "useSelector");
    useDispatchSpy = jest.spyOn(Redux, "useDispatch");
    mockDispatch = jest.fn();
    useDispatchSpy.mockImplementation(() => (cb: Action) => cb);
  });

  describe("render Loader component", () => {
    beforeEach(() => {
      userUseSelectorSpy.mockReturnValue({
        name: "John Doe",
        entries: 15,
        token: "0d48c11f-a6b0-49dc-be35-1873af9f3624",
      });
    });

    it("when user is loading", () => {
      isLoadingUserUseSelectorSpy.mockReturnValue(true);
      const wrapper = shallow(<Main />);
      expect(wrapper.find(Loader).length).toEqual(1);
    });

    it("when face-recognition is loading", () => {
      isClarifaiUserUseSelectorSpy.mockReturnValue(true);
      const wrapper = shallow(<Main />);
      expect(wrapper.find(Loader).length).toEqual(1);
    });
  });

  it("should render", () => {
    expect.assertions(4);
    const wrapper = shallow(<Main />);
    expect(wrapper.find(FormView).length).toEqual(1);
    expect(wrapper.find(Rank).length).toEqual(1);
    expect(wrapper.find(FaceRecognition).length).toEqual(1);
    expect(wrapper.find(Loader).length).toEqual(1);
  });
});
