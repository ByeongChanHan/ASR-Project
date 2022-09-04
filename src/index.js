import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Manager from "./script/Manager";
import Login from "./script/Login";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/about" element={<Manager />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
