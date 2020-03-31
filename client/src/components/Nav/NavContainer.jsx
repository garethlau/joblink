import React, { useContext } from "react";
import axios from "axios";
import { goTo } from "route-lite";
import { baseUrl } from "../../constants";
import { store, actions } from "../../store";
import Auth from "../Auth";
import Nav from "./Nav";

export default function NavContainer(props) {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  function logout() {
    axios
      .get(baseUrl + "/api/auth/logout")
      .then(response => {
        // Succesfully logged out
        dispatch({ type: actions.CLEAR_USER });
        goTo(Auth);
      })
      .catch(err => {
        console.log(err);
      });
  }
  return <Nav logout={logout} {...props} />;
}
