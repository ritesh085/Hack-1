const express = require("express");
const router = express.Router();
const { signupIndividual, signupMedRep } = require("../controllers/authController");

// Individuals
router.post("/signup/individual", signupIndividual);

// Medical Representatives
router.post("/signup/medrep", signupMedRep);

module.exports = router;