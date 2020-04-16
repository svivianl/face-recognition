import { Dispatch } from "redux";
import * as actions from "./actions";
import * as selectors from "./selectors";
import { ImageUrl } from "../../types";

export const faceRecognition = (dispatch: Dispatch<any>) => (
  inputBody: ImageUrl
) => {
  dispatch(actions.faceRecognition(inputBody));
};

export const clarifaiSelectors = { ...selectors };
