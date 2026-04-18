import { useState } from "react";

const PaymentForm = () => {
  // 1. Setup "State" to remember what the user types
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  // 2. What happens when we click Submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stops the page from refreshing

    // Package the data exactly how our Mongoose Schema expects it
    const paymentData = {
      amount: Number(amount),
      date: date || undefined, // If blank, let backend use the default Date.now
      notes,
    };

    try {
      // Send the POST request to our Node server
      const response = await fetch("http://localhost:5000/api/prepayments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        alert("✅ Payment Saved Successfully!");
        // Clear the form boxes
        setAmount("");
        setDate("");
        setNotes("");
      } else {
        alert("❌ Failed to save payment.");
      }
    } catch (error) {
      console.error("Error saving payment:", error);
    }
  };

  // 3. The actual UI on the screen
  return (
    <div
      style={{
        border: "1px solid #bdc3c7",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h3 style={{ marginTop: "0", color: "#2c3e50" }}>Add New Prepayment</h3>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Amount (₹)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="e.g. 50000"
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Date (Optional)
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Notes (Optional)
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g., Annual Bonus"
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "12px",
            background: "#2980b9",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
