import { ClarifaiState } from "./clarifaiState";

export function createClarifaiState(): ClarifaiState {
  return {
    isLoading: false,
    url: "",
    regions: [],
    status: null,
  };
}
