const express = require("express");
const router = express.Router();

router.use("/api/auth", require("./auth"));
router.use("/api/job", require("./job"));

module.exports = router;
