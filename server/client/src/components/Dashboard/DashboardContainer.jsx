import React, { useEffect } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";

export default function DashboardContainer() {
  useEffect(() => {
    // Fetch applications
    axios
      .get("/api/job")
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return <Dashboard />;
}
