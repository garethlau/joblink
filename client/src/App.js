import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import Auth from "./components/Auth";
import Home from "./components/Home";

function App() {
  if (window.localStorage.getItem("user")) {
    return (
        <Home />
    );
  } else {
    return (
        <Auth />
    );
  }
}

export default App;
