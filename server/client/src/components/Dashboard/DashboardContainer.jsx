import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";

export default function DashboardContainer() {
  const [jobs, setJobs] = useState([]);

  const statusOptions = [
    { key: 1, text: "Applied", value: "Applied" },
    { key: 2, text: "In Progress", value: "In Progress" },
    { key: 3, text: "Apply Later", value: "Apply Later" },
    { key: 4, text: "Rejected", value: "Rejected" }
  ];
  useEffect(() => {
    // Fetch applications
    axios
      .get("/api/job")
      .then(response => {
        console.log(response);
        setJobs(response.data.jobs);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  function logout() {
    console.log("Logout");
  }

  function saveStatusChange(jobId, status) {
    console.log(jobId, status);
  }

  function deleteJob(id) {
    console.log("Delete", id);
  }

  function editJob(id) {
    console.log("edit", id);
  }

  return (
    <Dashboard
      jobs={jobs}
      logout={logout}
      statusOptions={statusOptions}
      editJob={editJob}
      deleteJob={deleteJob}
      saveStatusChange={saveStatusChange}
    />
  );
}
