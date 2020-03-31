import React from "react";
import { Button, Input, Divider } from "semantic-ui-react";
import { Link } from "route-lite";
import Signup from "../Signup";
import Home from "../Home";
import css from "./Auth.module.scss";

export default function Auth({
  username,
  password,
  login
}) {
  return (
    <div className={css.main}>
      <div className={css.input}>
        <Input placeholder="Username" value={username.value} onChange={username.onChange}  />
      </div>

      <div className={css.input}>
        <Input placeholder="Password" value={password.value} onChange={password.onChange}/>
      </div>
      <div className={css.btn}>
          <Button fluid primary onClick={login}>
            Log In
          </Button>
      </div>
      <Divider horizontal>OR</Divider>
      <div className={css.btn}>
        <Link component={Signup}>
          <Button fluid primary>
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
}
