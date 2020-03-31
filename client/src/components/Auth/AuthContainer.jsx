import React, { useContext } from "react";
import Auth from "./Auth";
import axios from "axios";
import useFormInput from "../../hooks/useFormInput";
import { baseUrl } from "../../constants";
import { goTo } from "route-lite";
import { store, actions } from "../../store";
import Home from "../Home";

export default function AuthContainer() {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const username = useFormInput();
  const password = useFormInput();

  function login() {
    if (username.value === "") return;
    if (password.value === "") return;

    axios
      .post(baseUrl + "/api/auth/login", {
        username: username.value,
        password: password.value
      })
      .then(response => {
        console.log(response);
        if (response.data.user) {
          dispatch({ type: actions.SET_USER, payload: response.data.user });
          goTo(Home);
        }
        username.clear();
        password.clear();
      })
      .catch(err => {
        console.log(err);
      });
  }

  return <Auth username={username} password={password} login={login} />;
}
