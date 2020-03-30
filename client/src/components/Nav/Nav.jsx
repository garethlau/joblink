import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { goBack } from "route-lite";

export default function Nav({ back }) {
  return (
    <Menu>
      {back && (
        <Menu.Item>
          <Button onClick={() => goBack()}>Back</Button>
        </Menu.Item>
      )}
    </Menu>
  );
}
