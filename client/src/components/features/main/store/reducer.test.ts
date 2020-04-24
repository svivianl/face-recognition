import { shallow } from "enzyme";
import * as ClarifaiActions from "./actions";
import { ClarifaiState, MessageError, createClarifaiState } from "./types";
import { clarifaiReducer } from "./reducer";

describe("Clarifai Reducers", () => {
  it("properly captures a dispatch to change authenticated state", () => {
    const initialState = createClarifaiState();
    const regions: any = [
      {
        id: "srtacsx2buex",
        region_info: {
          bounding_box: {
            bottom_row: 0.47755477,
            left_col: 0.21245633,
            right_col: 0.30410764,
            top_row: 0.30901453,
          },
        },
      },
      {
        id: "wul57qdmqsds",
        region_info: {
          region_info: {
            bounding_box: {
              bottom_row: 0.35866204,
              left_col: 0.68258256,
              right_col: 0.74536127,
              top_row: 0.21136338,
            },
          },
        },
      },
    ];
    expect(
      clarifaiReducer(
        initialState,
        ClarifaiActions.faceRecognitionSuccess(regions)
      )
    ).toEqual({
      authenticated: true,
      authenticating: false,
    });
  });
});
