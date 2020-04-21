import { Epic } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, filter, map, switchMap, takeUntil } from "rxjs/operators";
import Action from "../../../../store/action";
import { RootState } from "../../../../store/reducers";
import { isActionOf } from "typesafe-actions";
import * as actions from "./actions";
import * as api from "../../../../api/clarifaiapi";
import { filterAction } from "../../../../store/types";

const faceRecognitionEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(isActionOf(actions.faceRecognition)),
    map((action) => action.payload),
    switchMap((inputBody) =>
      from(api.faceRecognition$(inputBody)).pipe(
        takeUntil(filterAction(action$, actions.faceRecognitionCancel)),
        map((regions) =>
          actions.faceRecognitionSuccess({ regions, url: inputBody.url })
        ),
        catchError((error) => {
          console.error("error: ", error);
          return of(actions.faceRecognitionError(error));
        })
      )
    )
  );

export default [faceRecognitionEpic];
