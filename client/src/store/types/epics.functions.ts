import { ActionsObservable } from "redux-observable";
import { filter } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import Action from "../action";
import { User } from "../../types";

export const filterAction = (
  filterAction$: ActionsObservable<Action>,
  actionCreator: () => { type: string; payload?: any }
) => filterAction$.pipe(filter(isActionOf(actionCreator)));
