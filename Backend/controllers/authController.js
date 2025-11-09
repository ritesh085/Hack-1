const { Individual, MedicalRep } = require("../models/auth");

// Individual signup
exports.signupIndividual = async (req, res) => {
  try {
    const user = await Individual.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Medical representative signup
exports.signupMedRep = async (req, res) => {
  try {
    const rep = await MedicalRep.create(req.body);
    res.status(201).json(rep);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};