import { ActionType, getType } from "typesafe-actions";
import { ClarifaiActionsTypes } from "./actions";
import * as ClarifaiActions from "./actions";
import { ClarifaiState, MessageError, createClarifaiState } from "./types";

export const clarifaiReducer = (
  state: ClarifaiState = createClarifaiState(),
  action: ActionType<typeof ClarifaiActionsTypes | any>
): ClarifaiState => {
  const { type, payload } = action;

  switch (type) {
    case getType(ClarifaiActions.faceRecognition):
      return { ...state, isLoading: true, status: null };
    case getType(ClarifaiActions.faceRecognitionSuccess):
      console.log(payload.regions);
      return {
        ...state,
        url: payload.url,
        regions: payload.regions,
        isLoading: false,
        status: null,
      };
    case getType(ClarifaiActions.faceRecognitionError):
      return {
        ...state,
        url: "",
        regions: [],
        isLoading: false,
        status: {
          type: "error",
          error: payload as MessageError,
        },
      };
    case getType(ClarifaiActions.faceRecognitionCancel):
      return { ...state, url: "", regions: [], isLoading: false };
    default:
      return state;
  }
};
