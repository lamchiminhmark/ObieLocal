import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import { getFirebase, reactReduxFirebase } from "react-redux-firebase";
import fbConfig from "./shared/fbConfig";

const initialState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument({ getFirebase })),
    reactReduxFirebase(fbConfig, {
      attachAuthIsReady: true
    })
  )
);

export default store;
