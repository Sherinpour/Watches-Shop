import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./redux/store";
import App from "./App";

import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer
          theme="dark"
          position="top-right"
          autoClose={3000}
          closeOnClick
          pauseOnHover={false}
        />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
