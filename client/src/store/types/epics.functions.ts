import { ActionsObservable } from "redux-observable";
import { filter } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import Action from "../action";

export const filterAction = (
  filterAction$: ActionsObservable<Action>,
  actionCreator: () => { type: string; payload?: any }
) => filterAction$.pipe(filter(isActionOf(actionCreator)));
