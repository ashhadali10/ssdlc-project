const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fetch = require("node-fetch");
const userDataRoute = require("./routes/userDataRoute");
const xssRoute = require("./routes/xssRoute");
const storedXSSRoute = require("./routes/storedXSSRoute");
const blindxssRoute = require("./routes/blindxssRoute");
const authRoutes = require("./routes/auth"); // Import authRoutes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Define PORT here

app.use(cors());
app.use(express.json());

// Use routes with specific paths
app.use("/user-data", userDataRoute);
app.use("/xss-test", xssRoute);
app.use("/storedxss", storedXSSRoute);
app.use("/blindxss", blindxssRoute);

// New endpoint for reflected XSS demo
app.use(express.urlencoded({ extended: true }));

app.get('/reactxss', (req, res) => {
  const { code } = req.query;

  // Reflect user input directly in the response
  res.send(`
    <html>
      <body>
        <div id="validation">${code}</div>
        <form action="/reactxss" method="post">
          <input type="text" name="code" placeholder="Enter your referral code below" />
          <button type="submit">Submit</button>
        </form>
        <script>
          const validationElement = document.getElementById('validation');
          const validationMessage = \`Oops! This seems like an invalid referral code. \${validationElement.innerHTML}\`;
          validationElement.innerHTML = validationMessage;
        </script>
      </body>
    </html>
  `);
});

// Endpoint to handle form submission
app.post('/reactxss', (req, res) => {
  const { code } = req.body;

  // Redirect to GET /reactxss with the code in the query parameter
  res.redirect(`/reactxss?code=${code}`);
});

// Endpoint to fetch data from a URL (Simulating SSRF)
app.get("/fetchurl", async (req, res) => {
  const { url } = req.query;

  try {
    const response = await fetch(url);
    const data = await response.text();

    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch URL" });
  }
});

// Use authRoutes for API routes
app.use('/api', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
