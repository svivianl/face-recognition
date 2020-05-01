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
        map((token) => actions.registerSuccess(token)),
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
        map((token) => actions.signInSuccess(token)),
        catchError((error) => {
          console.error("error: ", error);
          return of(actions.signInError(error));
        })
      )
    )
  );

const signInTokenEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(isActionOf(actions.signInToken)),
    switchMap(() =>
      from(api.signInToken$()).pipe(
        takeUntil(filterAction(action$, actions.signInTokenCancel)),
        map((token) => actions.signInTokenSuccess(token)),
        catchError((error) => {
          console.error("error: ", error);
          return of(actions.signInTokenError(error));
        })
      )
    )
  );

const getUserEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(isActionOf(actions.getUser)),
    map((action) => action.payload),
    switchMap((id) =>
      from(api.getUser(id)).pipe(
        takeUntil(filterAction(action$, actions.getUserCancel)),
        map((user) => actions.getUserSuccess(user)),
        catchError((error) => {
          console.error("error: ", error);
          return of(actions.getUserError(error));
        })
      )
    )
  );

// const updateUserEpic: Epic<Action, Action, RootState> = (action$) =>
//   action$.pipe(
//     filter(isActionOf(actions.update)),
//     map((action) => action.payload),
//     switchMap((userBody) =>
//       from(api.update$(userBody)).pipe(
//         takeUntil(filterAction(action$, actions.updateCancel)),
//         map((user) => actions.updateSuccess(user)),
//         catchError((error) => {
//           console.error("error: ", error);
//           return of(actions.updateError(error));
//         })
//       )
//     )
//   );

const updateEntriesEpic: Epic<Action, Action, RootState> = (action$) =>
  action$.pipe(
    filter(isActionOf(actions.updateEntries)),
    map((action) => action.payload),
    switchMap((id) =>
      from(api.updateEntries$(id)).pipe(
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
    switchMap(() =>
      from(api.signOut()).pipe(
        takeUntil(filterAction(action$, actions.signOutCancel)),
        map(() => actions.signOutSuccess()),
        catchError((error) => {
          console.error("error: ", error);
          return of(actions.signOutError(error));
        })
      )
    )
  );

export default [
  registerEpic,
  signInEpic,
  signInTokenEpic,
  getUserEpic,
  // updateUserEpic,
  updateEntriesEpic,
  signOutEpic,
];
