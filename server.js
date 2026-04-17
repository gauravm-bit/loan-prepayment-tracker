require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Prepayment = require("./models/Prepayment")

const app = express();
const PORT = process.env.PORT || 5000;

// This middleware allows our app to read JSON data later on
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error.message);
  });

// Our very first Route (what happens when someone visits the main URL)
app.get("/", (req, res) => {
  res.send("Loan Prepayment Tracker Server is Live!");
});

app.post('/api/prepayments', async(req, res)=>{
    try{
        const newPayment = new Prepayment(req.body);

        const savedPayment = await newPayment.save();

        res.status(201).json(savedPayment);
    } catch (error){
        res.status(400).json({message: "Failed to save payment, error:error.message"});
    }
})

// Tells the server to start listening for requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
