import { RouterAction } from "connected-react-router";
import { ActionType } from "typesafe-actions";
import actions from "./actions";

type Action = ActionType<typeof actions> | RouterAction;

export default Action;
