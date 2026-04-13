const express = require("express");
const app = express();
const PORT = 5000;

// This middleware allows our app to read JSON data later on
app.use(express.json());

// Our very first Route (what happens when someone visits the main URL)
app.get("/", (req, res) => {
  res.send("Loan Prepayment Tracker Server is Live!");
});

// Tells the server to start listening for requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
