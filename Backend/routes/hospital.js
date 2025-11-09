const express = require("express");
const router = express.Router();
const { listHospitals, createHospital } = require("../controllers/hospitalController");

router.get("/", listHospitals);
router.post("/", createHospital);

module.exports = router;