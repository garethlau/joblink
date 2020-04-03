import React from "react";
import Nav from "../Nav";
import css from "./Home.module.scss";
import { Input, Dropdown, Button } from "semantic-ui-react";

export default function Home({
  company,
  position,
  status,
  statusOptions,
  statusChange,
  cancel,
  save
}) {
  return (
    <div className={css.container}>
      <Nav />
      Track a Job
      <div className={css.input}>
        <Input
          value={company.value}
          onChange={company.onChange}
          placeholder="Company"
        />
      </div>
      <div className={css.input}>
        <Input
          value={position.value}
          onChange={position.onChange}
          placeholder="Position"
        />
      </div>
      <div>
        <Dropdown
          style={{minWidth: "180px"}}
          value={status}
          onChange={statusChange}
          placeholder="Status"
          search
          selection
          options={statusOptions}
        />
      </div>
      <div className={css.btn}>
        <Button secondary onClick={cancel}>
          Cancel
        </Button>
        <Button primary onClick={save}>
          Save
        </Button>
      </div>
    </div>
  );
}
