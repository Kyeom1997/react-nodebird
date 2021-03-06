import { applyMiddleware, compose, createStore } from "redux";
const { createWrapper } = require("next-redux-wrapper");
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../reducers/index";
import createSagaMiddleware from "redux-saga";

const loggerMiddleware = ({dispatch, getState}) = (next) => (action) => {
  console.log(action);
  return next(action);
};

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, loggerMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
