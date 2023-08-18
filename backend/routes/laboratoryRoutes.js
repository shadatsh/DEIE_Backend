const express = require("express");
const Laboratory = require("../models/Laboratory");

const router = express.Router();

// API endpoint to add a new laboratory
router.post("/addLaboratory", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Laboratory name is required." });
  }

  try {
    const newLaboratory = new Laboratory({ name });
    await newLaboratory.save();
    res.status(201).json(newLaboratory);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add laboratory.", error: err.message });
  }
});

// API endpoint to get all laboratories
router.get("/laboratories", async (req, res) => {
  try {
    const laboratories = await Laboratory.find({});
    res.status(200).json(laboratories);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get laboratories.", error: err.message });
  }
});

module.exports = router;
