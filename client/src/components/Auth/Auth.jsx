import React from "react";
import { Button, Input, Divider } from "semantic-ui-react";
import { Link } from "route-lite";
import Signup from "../Signup";
import Home from "../Home";
import css from "./Auth.module.scss";

export default function Auth() {
  return (
    <div className={css.main}>
      <div className={css.input}>
        <Input placeholder="Username" />
      </div>

      <div className={css.input}>
        <Input placeholder="Password" />
      </div>
      <div className={css.btn}>
        <Link component={Home}>
          <Button fluid primary>
            Log In
          </Button>
        </Link>
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
