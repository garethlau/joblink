import React from "react";
import { Input, Button } from "semantic-ui-react";

export default function Auth({
  signup,
  login,
  email,
  username,
  password,
  submit
}) {
  return (
    <div>
      {signup && (
        <div>
          <Input
            placeholder="Email"
            value={email.value}
            onChange={email.onChange}
          />
        </div>
      )}
      <div>
        <Input
          placeholder="Username"
          value={username.value}
          onChange={username.onChange}
        />
      </div>
      <div>
        <Input
          placeholder="Password"
          value={password.value}
          onChange={password.onChange}
        />
      </div>
      <Button fluid primary onClick={submit}>
        {signup ? "Sign Up" : "Log In"}
      </Button>
    </div>
  );
}
