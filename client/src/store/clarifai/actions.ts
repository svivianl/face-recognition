import { createAction } from "typesafe-actions";
import { ImageUrl } from "../../types";

export enum ClarifaiActionsTypes {
  FaceRecognition = "Clarifai/FaceRecognition",
  FaceRecognitionSuccess = "Clarifai/FaceRecognitionSuccess",
  FaceRecognitionError = "Clarifai/FaceRecognitionError",
  FaceRecognitionCancel = "Clarifai/FaceRecognitionCancel",
}

export const faceRecognition = createAction(
  ClarifaiActionsTypes.FaceRecognition,
  (inputBody: ImageUrl) => inputBody
)();

export const faceRecognitionSuccess = createAction(
  ClarifaiActionsTypes.FaceRecognitionSuccess,
  (regions: any) => regions
)();

export const faceRecognitionError = createAction(
  ClarifaiActionsTypes.FaceRecognitionError,
  (error: Error) => ({ message: error.message, type: "face-recognition" })
)();

export const faceRecognitionCancel = createAction(
  ClarifaiActionsTypes.FaceRecognitionCancel
)();
