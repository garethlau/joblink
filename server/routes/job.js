const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Job = mongoose.model("Job");
const requireAuth = require("../middleware/requireAuth");

// Create a new job application entry
router.post("/", (req, res) => {
  console.log("IN POST ");
  let { companyName, position, status, userId } = req.body;
  let record = {
    status: status,
    date: Date.now()
  };
  Job({
    companyName: companyName,
    position: position,
    record: [record],
    createdBy: userId
  })
    .save()
    .then(savedJob => {
      console.log(savedJob);
      return res.status(200).send();
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send();
    });
});

router.get("/", requireAuth, (req, res) => {
  let userId = req.user._id;
  Job.find({ createdBy: userId }, (err, jobs) => {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    if (!jobs) {
      return res.status(200).send({ jobs: [] });
    } else {
      return res.status(200).send({ jobs: jobs });
    }
  });
});

router.patch("/:jobId", requireAuth, (req, res) => {
  let jobId = req.params.jobId;

  let { companyName, position, status } = req.body;

  Job.findById(jobId, (err, job) => {
    if (err) {
      return res.status(500).send();
    }
    if (!job) {
      return res.status(404).send();
    } else {
      console.log(job);
      job.companyName = companyName;
      job.position = position;
      let record = job.record;
      record.push({
        status: status,
        date: Date.now()
      });
      job.record = record;
      job
        .save()
        .then(savedJob => {
          return res.status(200).send({ job: savedJob });
        })
        .catch(err => {
          console.log(err);
          return res.status(500).send();
        });
    }
  });
});

router.delete("/:jobId", requireAuth, (req, res) => {
  let jobId = req.params.jobId;
  Job.findByIdAndDelete(jobId, (err, job) => {
    if (err) {
      return res.status(500).send();
    } else {
      return res.status(200).send();
    }
  });
});

module.exports = router;
