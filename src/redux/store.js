/*import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/index";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;*/

import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export default store;
