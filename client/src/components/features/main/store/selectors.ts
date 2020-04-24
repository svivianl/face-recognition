import { createSelector, Selector } from "reselect";
import { RootState } from "../../../../store/reducers";
import { ClarifaiState } from "./types";

export const getClarifaiState = (state: RootState) => state.clarifaiState;

export const getUrl = createSelector(
  getClarifaiState,
  (state: ClarifaiState) => state?.url || ""
);

export const getRegions = createSelector(
  getClarifaiState,
  (state: ClarifaiState) => state?.regions || []
);

export const getIsLoading = createSelector(
  getClarifaiState,
  (state: ClarifaiState) => state?.isLoading || false
);

export const getError = createSelector(
  getClarifaiState,
  (state: ClarifaiState) =>
    (state &&
      state.status &&
      state.status.error &&
      state.status.error.message) ||
    ""
);
