import React from "react";
import ReactDOM from "react-dom";
import "./pages/index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import {HashRouter} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App></App>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
