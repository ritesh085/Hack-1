const express = require("express");
const router = express.Router();
const { getEligibleDonors, updateDonation } = require("../controllers/donorController");

// Query donors by blood group; optional ?lat=..&lng=.. for distance sorting
router.get("/:bloodGroup", getEligibleDonors);

// Update donation record
router.put("/:donorId/donate", updateDonation);

module.exports = router;