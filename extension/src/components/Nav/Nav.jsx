import React from "react";
import { Menu, Button, Icon } from "semantic-ui-react";
import { goBack } from "route-lite";

export default function Nav({ back, logout, noLogout }) {
  return (
    <Menu>
      {back && (
        <Menu.Item onClick={() => goBack()}>
          <Icon name="angle left" />
        </Menu.Item>
      )}
      {!noLogout && (
        <Menu.Item position="right" onClick={logout}>
          <Icon name="sign out alternate" />
        </Menu.Item>
      )}
    </Menu>
  );
}
