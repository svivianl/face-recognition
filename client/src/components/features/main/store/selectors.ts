import { createSelector, Selector } from "reselect";
import { RootState } from "../../../../store/reducers";
import { ClarifaiState } from "./types";

export const getClarifaiState = (state: RootState) => state.clarifaiState;

export const getUrl: Selector<RootState, string> = createSelector(
  getClarifaiState,
  (state: ClarifaiState) => state?.url || ""
);

export const getRegions: Selector<RootState, any> = createSelector(
  getClarifaiState,
  (state: ClarifaiState) => state?.regions || []
);

export const getIsLoading: Selector<RootState, boolean> = createSelector(
  getClarifaiState,
  (state: ClarifaiState) => state?.isLoading || false
);

export const getError: Selector<RootState, string> = createSelector(
  getClarifaiState,
  (state: ClarifaiState) =>
    (state &&
      state.status &&
      state.status.error &&
      state.status.error.message) ||
    ""
);
