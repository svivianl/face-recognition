import { createStore } from "redux";
import { createBrowserHistory } from "history";
import { createRootReducer } from "./reducers";

export const history = createBrowserHistory();

export default function configureStore() {
  const store = createStore(createRootReducer(history));

  return store;
}
