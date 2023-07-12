// routes.js
const express = require("express");
const router = express.Router();

const adminController = require("../controllers/authControllers");

// ...

router.get("/api/v1/admin/users/lecturer", adminController.getLecturers);

// ...

module.exports = router;
