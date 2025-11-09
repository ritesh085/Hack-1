const Donor = require("../models/donors");
const { distanceInKm } = require("../services/distanceService");

// Get donors by blood group, eligible (> 2 months since last donation), sorted nearest
exports.getEligibleDonors = async (req, res) => {
  try {
    const { bloodGroup } = req.params;
    const { lat, lng } = req.query;

    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    const donors = await Donor.find({
      bloodGroup,
      $or: [
        { lastDonationDate: { $lte: twoMonthsAgo } },
        { lastDonationDate: null },
      ],
    });

    const data = donors.map(d => {
      let dist = null;
      if (lat && lng && d.location?.lat && d.location?.lng) {
        dist = distanceInKm(
          Number(lat),
          Number(lng),
          Number(d.location.lat),
          Number(d.location.lng)
        );
      }
      return {
        id: d._id,
        name: d.name,
        distance: dist,
        mobile: d.mobile,
        address: d.address,
        lastDonationDate: d.lastDonationDate,
        donationFrequency: d.donationFrequency,
        beep: "X",     // initial state before click
        sos: "X",      // initial state before click
      };
    });

    data.sort((a, b) => {
      if (a.distance == null && b.distance == null) return 0;
      if (a.distance == null) return 1;
      if (b.distance == null) return -1;
      return a.distance - b.distance;
    });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// For updating donation history (when a donor donates)
exports.updateDonation = async (req, res) => {
  try {
    const { donorId } = req.params;
    const donor = await Donor.findById(donorId);
    if (!donor) return res.status(404).json({ error: "Donor not found" });

    donor.lastDonationDate = new Date();
    donor.donationFrequency = (donor.donationFrequency || 0) + 1;
    await donor.save();

    res.json({ message: "Donation updated", donor });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};