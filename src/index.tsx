import "./index.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <Router>
    <QueryParamProvider ReactRouterRoute={Route}>
      <App />
    </QueryParamProvider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
