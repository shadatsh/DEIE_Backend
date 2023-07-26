const express = require("express");
const multer = require("multer");
const FormData = require("../models/FormData");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5000000 },
});

router.get("/", async (req, res) => {
  try {
    const formData = await FormData.find();
    res.json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/submit", upload.single("picture"), async (req, res) => {
  try {
    const { name, court } = req.body;
    const picture = req.file ? req.file.path : null;

    const formData = new FormData({
      name,
      picture,
      court,
    });

    await formData.save();

    res.status(201).json({ message: "Form data submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const formDataId = req.params.id;
    const formData = await FormData.findById(formDataId);

    if (!formData) {
      return res.status(404).json({ error: "Form data not found" });
    }

    if (formData.picture) {
      const imagePath = path.join(__dirname, "..", formData.picture);
      fs.unlinkSync(imagePath);
    }

    await FormData.deleteOne({ _id: formDataId });

    res.json({ message: "Form data deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
