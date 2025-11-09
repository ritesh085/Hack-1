const Hospital = require("../models/hospital");
const { distanceInKm } = require("../services/distanceService");

// List hospitals sorted by distance from a given location (optional query lat/lng)
exports.listHospitals = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const hospitals = await Hospital.find();

    // If lat/lng provided, compute distances and sort
    let data = hospitals.map(h => {
      let dist = null;
      if (lat && lng && h.location?.lat && h.location?.lng) {
        dist = distanceInKm(
          Number(lat),
          Number(lng),
          Number(h.location.lat),
          Number(h.location.lng)
        );
      }
      return {
        id: h._id,
        name: h.name,
        address: h.address,
        distance: dist, // may be null if location missing
        bloodStock: h.bloodStock,
      };
    });

    // Sort: nearest first if distance exists
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

// Create hospital (for setup/testing)
exports.createHospital = async (req, res) => {
  try {
    const hospital = await Hospital.create(req.body);
    res.status(201).json(hospital);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};