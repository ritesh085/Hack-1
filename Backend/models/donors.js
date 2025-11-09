const mongoose = require("mongoose");

const DonorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bloodGroup: { type: String, required: true }, // e.g., "O+", "A-"
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    location: {
      lat: Number,
      lng: Number,
    },
    lastDonationDate: { type: Date, default: null },
    donationFrequency: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donor", DonorSchema);