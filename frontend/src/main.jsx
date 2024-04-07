import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
document.querySelector("html").setAttribute("data-theme", "light");
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
