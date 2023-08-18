const mongoose = require("mongoose");

const laboratorySchema = new mongoose.Schema({
  name: String,
});

const Laboratory = mongoose.model("Laboratory", laboratorySchema);

module.exports = Laboratory;
