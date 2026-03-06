import React from "react";
import ReactDOM from "react-dom/client";
import "formsflow-wc";
import App from "./App.jsx";
import "./index.css";

// Expose React globally for formsflow-wc
window.React = React;
window.ReactDOM = ReactDOM;

const container = document.getElementById("root");

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}