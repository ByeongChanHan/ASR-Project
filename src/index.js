import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Manager from "./script/Manager";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route
          exact
          path="https://byeongchanhan.github.io/about"
          element={<Manager />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
