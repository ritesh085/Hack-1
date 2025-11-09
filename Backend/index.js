const express = require("express");
const connectDB = require("./connection");
require("dotenv").config();
const cors = require("cors");

const app = express();
connectDB();

// 2. register middleware BEFORE routes
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());


// Health check route
app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

// Routes
app.use("/hospitals", require("./routes/hospital"));
app.use("/donors", require("./routes/donors"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));