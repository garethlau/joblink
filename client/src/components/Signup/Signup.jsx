import React from "react";
import Nav from "../Nav";
import { Button, Input, Divider } from "semantic-ui-react";
import css from "./Signup.module.scss";

export default function Signup({ email, username, password, signup }) {
  return (
    <div>
      <Nav back={true} noLogout={true} />
      <div className={css.main}>
        <div className={css.input}>
          <Input
            placeholder="Email"
            value={email.value}
            onChange={email.onChange}
          />
        </div>

        <div className={css.input}>
          <Input
            placeholder="Username"
            value={username.value}
            onChange={username.onChange}
          />
        </div>
        <div className={css.input}>
          <Input
            placeholder="Password"
            value={password.value}
            onChange={password.onChange}
          />
        </div>
        <div className={css.btn}>
          <Button onClick={signup} fluid primary>
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
}
