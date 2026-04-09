import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import { dashboardData } from "./config/dashboard-data.js";
import { App } from "./App.jsx";

const APP_CONFIG = {
  rootSelector: "#app"
};

const rootElement = document.querySelector(APP_CONFIG.rootSelector);
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App data={dashboardData} />
  </React.StrictMode>
);
