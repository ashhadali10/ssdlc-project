const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();
const userDataRoute = require("./routes/userDataRoute");
const xssRoute = require("./routes/xssRoute");

app.use(cors());
app.use(express.json());

// Connect to mongodb database (locally)
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected Successfully");
    app.listen(process.env.PORT || 5000, (err) => {
      if (err) console.log(err);
      console.log(`running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("Failed to connect", error));

app.use(userDataRoute);
app.use("/xss-test", xssRoute);

// Endpoint to fetch data from a URL (Simulating SSRF)
app.get("/fetchurl", async (req, res) => {
  const { url } = req.query;

  try {
    // Validate the URL (optional step)
    const response = await fetch(url);
    const data = await response.text();

    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch URL" });
  }
});
