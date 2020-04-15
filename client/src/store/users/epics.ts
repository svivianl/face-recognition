import { Epic } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, filter, map, switchMap, takeUntil } from "rxjs/operators";
import Action from "../action";
import { RootState } from "../reducers";
import { isActionOf } from "typesafe-actions";
import * as actions from "./actions";
import * as api from "../../api/user.api";
import { filterAction } from "../types";

const registerEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(isActionOf(actions.register)),
    map((action) => action.payload),
    switchMap((userBody) =>
      from(api.register$(userBody)).pipe(
        takeUntil(filterAction(action$, actions.registerCancel)),
        map((user) => actions.registerSuccess(user)),
        catchError((error) => {
          console.error("error: ", error);
          return of(actions.registerError(error));
        })
      )
    )
  );

const signInEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(isActionOf(actions.signIn)),
    map((action) => action.payload),
    switchMap((userBody) =>
      from(api.signIn$(userBody)).pipe(
        takeUntil(filterAction(action$, actions.signInCancel)),
        map((user) => actions.signInSuccess(user)),
        catchError((error) => {
          console.error("error: ", error);
          return of(actions.signInError(error));
        })
      )
    )
  );

const updateEntriesEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(isActionOf(actions.updateEntries)),
    map((action) => action.payload),
    switchMap((token) =>
      from(api.updateEntries$(token)).pipe(
        takeUntil(filterAction(action$, actions.updateEntriesCancel)),
        map((user) => actions.updateEntriesSuccess(user)),
        catchError((error) => {
          console.error("error: ", error);
          return of(actions.updateEntriesError(error));
        })
      )
    )
  );

const signOutEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(isActionOf(actions.signOut)),
    map((action) => action.payload),
    switchMap((token) =>
      from(api.signOut(token)).pipe(
        takeUntil(filterAction(action$, actions.signOutCancel)),
        map(() => actions.signOutSuccess()),
        catchError((error) => {
          console.error("error: ", error);
          return of(actions.signOutError(error));
        })
      )
    )
  );

export default [registerEpic, signInEpic, updateEntriesEpic, signOutEpic];
