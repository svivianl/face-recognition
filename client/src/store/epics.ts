import { combineEpics } from "redux-observable";
import usersEpics from "./users/epics";

export default combineEpics<any>(...usersEpics);
