const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  companyName: String,
  position: String,
  record: Object,
  createdBy: mongoose.Types.ObjectId
});

module.exports = mongoose.model("Job", JobSchema);
