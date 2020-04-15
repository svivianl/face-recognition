import { RouterAction, routerMiddleware } from "connected-react-router";
import { createStore, compose, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { createBrowserHistory } from "history";
import epics from "./epics";
import { createRootReducer, RootState } from "./reducers";
import Action from "./action";

export const history = createBrowserHistory();

const composeEnhancers: typeof compose =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware<
  Action | RouterAction,
  Action | RouterAction,
  RootState
>();

export default function configureStore() {
  const store = createStore(
    createRootReducer(history),
    composeEnhancers(applyMiddleware(epicMiddleware, routerMiddleware(history)))
  );

  epicMiddleware.run(epics);

  return store;
}
