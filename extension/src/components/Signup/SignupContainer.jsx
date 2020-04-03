import React, { useContext } from "react";
import Signup from "./Signup";
import useFormInput from "../../hooks/useFormInput";
import axios from "axios";
import { baseUrl } from "../../constants";
import { store, actions } from "../../store";
import { goTo } from "route-lite";

import Home from "../Home";

export default function SignupContainer() {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const email = useFormInput();
  const username = useFormInput();
  const password = useFormInput();

  function signup() {
    if (email.value === "") return;
    if (username.value === "") return;
    if (password.value === "") return;
    axios
      .post(
        baseUrl + "/api/auth/signup",
        {
          email: email.value,
          username: username.value,
          password: password.value
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(response => {
        if (response.data.user) {
          dispatch({ type: actions.SET_USER, payload: response.data.user });
          goTo(Home);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <Signup
      email={email}
      username={username}
      password={password}
      signup={signup}
    />
  );
}
