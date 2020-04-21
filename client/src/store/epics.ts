import { combineEpics } from "redux-observable";
import usersEpics from "./users/epics";
import clarifaiEpics from "../components/features/main/store/epics";

export default combineEpics<any>(...usersEpics, ...clarifaiEpics);
