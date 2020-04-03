import React from "react";
import Auth from "./Auth";
import useFormInput from "../../hooks/useFormInput";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function AuthContainer({ login, signup }) {
  const history = useHistory();
  const email = useFormInput();
  const username = useFormInput();
  const password = useFormInput();

  function submit() {
    if (login) {
      // Login
      if (username.value === "" || password.value === "") {
        return;
      }
      axios
        .post(
          "/api/auth/login",
          {
            username: username.value,
            password: password.value
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          username.clear();
          password.clear();
          history.push("/dashboard");
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      // Signup method
      if (email.value === "" || username.value === "" || password.value === "") {
        return;
      }
      axios
        .post(
          "/api/auth/signup",
          {
            email: email.value,
            username: username.value,
            password: password.value
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          email.clear();
          username.clear();
          password.clear();
          history.push("/dashboard");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  return <Auth login={login} signup={signup} email={email} username={username} password={password} submit={submit} />;
}
