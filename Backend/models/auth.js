const mongoose = require("mongoose");

// Individual user
const IndividualSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["individual"], default: "individual" },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    bloodGroup: { type: String, required: true },
    mobile: { type: String, required: true },
    mobileExtra: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

// Medical representative
const MedicalRepSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["medrep"], default: "medrep" },
    name: { type: String, required: true },
    hospitalName: { type: String, required: true },
    address: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Individual = mongoose.model("Individual", IndividualSchema);
const MedicalRep = mongoose.model("MedicalRep", MedicalRepSchema);

module.exports = { Individual, MedicalRep };