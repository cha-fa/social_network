import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./authentication/authReducer";

const store = createStore(
  authReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
