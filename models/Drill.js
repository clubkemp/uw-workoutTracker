const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DrillSchema = new Schema({
  name: String,
  type: String,
  location: String,
  duration: String,
  description: String,
  tags:[]
});

const Drill = mongoose.model("Drill", DrillSchema);

module.exports = Drill;
