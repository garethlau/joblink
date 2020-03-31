import React, { useContext } from "react";
import Signup from "./Signup";
import useFormInput from "../../hooks/useFormInput";
import axios from "axios";
import { baseUrl } from "../../constants";
import { store, actions } from "../../store";

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
      .post(baseUrl + "/api/auth/signup", {
        email: email.value,
        username: username.value,
        password: password.value
      })
      .then(response => {
        if (response.data.user) {
          dispatch({ type: actions.SET_USER, payload: response.data.user });
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
