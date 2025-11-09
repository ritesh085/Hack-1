const express = require("express");
const connectDB = require("./connection");
require("dotenv").config();

const app = express();
connectDB();

app.use(express.json());

// Routes
app.use("/hospitals", require("./routes/hospital"));
app.use("/donors", require("./routes/donors"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));