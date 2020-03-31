import React from "react";
import Auth from "./Auth";
import axios from "axios";
import useFormInput from "../../hooks/useFormInput";
import { baseUrl } from "../../constants";

export default function AuthContainer({ setUser }) {
  const username = useFormInput();
  const password = useFormInput();

  function login() {
    if (username === "") return;
    if (password === "") return;

    axios
      .post(baseUrl + "/api/auth/login", {
        username: username.value,
        password: password.value
      })
      .then(response => {
        console.log(response);
        if (response.data.user) {
          setUser(response.data.user);
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
