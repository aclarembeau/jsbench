import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Editor } from "./components/editor.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>
);
