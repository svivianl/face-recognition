import { combineEpics } from "redux-observable";
import usersEpics from "./users/epics";
import clarifaiEpics from "./clarifai/epics";

export default combineEpics<any>(...usersEpics, ...clarifaiEpics);
