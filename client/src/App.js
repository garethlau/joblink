import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Router from "route-lite";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import axios from "axios";
import Auth from "./components/Auth";
import Home from "./components/Home";

import { baseUrl } from "./constants";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(baseUrl + "/api/auth/")
      .then(response => {
        if (response.data.user) {
          setUser(response.data.user);
        }
      })
      .catch(err => {
        console.log(err);
      });
  });

  return <Router>{user ? <Home /> : <Auth setUser={setUser} />}</Router>;
}

export default App;
