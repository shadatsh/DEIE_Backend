const mongoose = require("mongoose");

const formDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  picture: { type: String, required: true },
  court: { type: String, required: true },
});

const FormData = mongoose.model("FormData", formDataSchema);

module.exports = FormData;
