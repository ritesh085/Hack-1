const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    // Optional: latitude/longitude for precise distance calculations
    location: {
      lat: Number,
      lng: Number,
    },
    bloodStock: {
      Opos: { type: Number, default: 0 },
      Oneg: { type: Number, default: 0 },
      Apos: { type: Number, default: 0 },
      Aneg: { type: Number, default: 0 },
      Bpos: { type: Number, default: 0 },
      Bneg: { type: Number, default: 0 },
      ABpos: { type: Number, default: 0 },
      ABneg: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hospital", HospitalSchema);