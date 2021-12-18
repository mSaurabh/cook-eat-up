import React from "react";
import ReactDOM from "react-dom";
// components
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
// styles
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
