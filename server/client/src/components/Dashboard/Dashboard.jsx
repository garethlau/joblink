import React from "react";
import { Menu } from "semantic-ui-react";

export default function Dashboard() {
  return (
    <div>
      <Menu>
        <Menu.Item position="left">Joblink</Menu.Item>
        <Menu.Item position="right">Logout</Menu.Item>
      </Menu>
    </div>
  );
}
