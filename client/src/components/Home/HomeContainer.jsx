import React, { useState } from "react";
import Home from "./Home";
import useFormInput from "../../hooks/useFormInput";
import axios from "axios";
import { baseUrl } from "../../constants";

const statusOptions = [
  { key: 1, text: "Applied", value: "Applied" },
  { key: 2, text: "In Progress", value: "In Progress" },
  { key: 3, text: "Apply Later", value: "Apply Later" },
  { key: 4, text: "Rejected", value: "Rejected" }
];
export default function HomeContainer() {
  const company = useFormInput();
  const position = useFormInput();
  const [status, setStatus] = useState("");

  function statusChange(event, data) {
    setStatus(data.value);
  }

  function reset() {
    company.clear();
    position.clear();
    setStatus("");
  }

  function cancel() {
    reset();
  }

  function save() {
    console.log(company.value, position.value, status);
    if (company.value === "") return;
    if (position.value === "") return;
    if (status === "") return;

    let user = JSON.parse(window.localStorage.getItem("user"));
    axios
      .post(
        baseUrl + "/api/job",
        {
          companyName: company.value,
          position: position.value,
          status: status,
          userId: user._id
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(response => {
        reset();
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <Home
      company={company}
      position={position}
      status={status}
      statusOptions={statusOptions}
      statusChange={statusChange}
      cancel={cancel}
      save={save}
    />
  );
}
