import React from "react";
import { shallow } from "enzyme";
import FaceRecognition from "./FaceRecognition";
import { Box } from "./FaceRecognitionProps";

describe("FaceRecognition component", () => {
  it("should render without the faces' regions", () => {
    const mockProps = {
      imageUrl: "",
    };
    expect(shallow(<FaceRecognition {...mockProps} />)).toMatchSnapshot();
  });

  it("should render with the faces' regions", () => {
    const faces: Box[] = [
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

    const mockProps = {
      imageUrl: "https://samples.clarifai.com/face-det.jpg",
      faces,
    };

    expect(shallow(<FaceRecognition {...mockProps} />)).toMatchSnapshot();
  });
});
