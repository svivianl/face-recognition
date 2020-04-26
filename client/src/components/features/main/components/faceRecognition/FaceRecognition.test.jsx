import React from "react";
import { shallow } from "enzyme";
import checkPropTypes from "check-prop-types";
import FaceRecognition from "./FaceRecognition";

describe("FaceRecognition component", () => {
  test("does not throw warning with expected props", () => {
    const defaultProps = {
      showIf: false,
    };

    const propError = checkPropTypes(
      FaceRecognition.propTypes,
      defaultProps,
      "prop",
      FaceRecognition.name
    );
    expect(propError).toBeUndefined();
  });

  it("should not render if 'showIf is 'false'", () => {
    const mockProps = {
      showIf: false,
    };
    const wrapper = shallow(<FaceRecognition {...mockProps} />);
    expect(wrapper.length).toBe(1);
    const element = wrapper.find(`div.d-flex`);
    expect(element.length).toBe(1);
  });

  describe("render", () => {
    const mockProps = {
      showIf: true,
      imageUrl: "https://samples.clarifai.com/face-det.jpg",
    };

    it("should render without the faces' regions", () => {
      expect(shallow(<FaceRecognition {...mockProps} />)).toMatchSnapshot();
    });

    it("should render with the faces' regions", () => {
      const faces = [
        {
          leftCol: 21.245633,
          topRow: 30.901453,
          rightCol: 69.589236,
          bottomRow: 52.244523,
        },
        {
          leftCol: 68.25825599999999,
          topRow: 21.136338,
          rightCol: 25.463873000000003,
          bottomRow: 64.133796,
        },
        {
          leftCol: 77.968097,
          topRow: 41.064595999999995,
          rightCol: 14.986973999999996,
          bottomRow: 40.807223,
        },
      ];

      expect(
        shallow(<FaceRecognition {...mockProps} faces={faces} />)
      ).toMatchSnapshot();
    });
  });
});
