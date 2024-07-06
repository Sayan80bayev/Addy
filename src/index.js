import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/style/backGround.css";
import "react-advanced-cropper/dist/style.css";

import "./index.css";
import "cropperjs/dist/cropper.css";
import App from "./components/App";
import { store } from "./store";
import { Provider } from "react-redux";
const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
