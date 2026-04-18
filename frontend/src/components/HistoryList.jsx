import { useState, useEffect } from "react";

const HistoryList = () => {
  // 1. Setup state to hold the array of payments from the database
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch the data when the component loads
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/prepayments");
        const data = await response.json();

        setPayments(data); // Save the database info into our React state
        setLoading(false); // Turn off the loading text
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []); // The empty brackets mean "only run this ONCE when the page loads"

  // 3. The UI
  if (loading) return <p style={{ color: "#7f8c8d" }}>Loading history...</p>;

  return (
    <div
      style={{
        border: "1px solid #bdc3c7",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h3 style={{ marginTop: "0", color: "#2c3e50" }}>Payment History</h3>

      {payments.length === 0 ? (
        <p style={{ color: "#7f8c8d" }}>
          No payments made yet. Start your journey!
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {/* 4. Loop through the data and create a visual card for each payment */}
          {payments.map((payment) => (
            <div
              key={payment._id}
              style={{
                background: "#ecf0f1",
                padding: "15px",
                borderRadius: "6px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong style={{ fontSize: "1.2rem", color: "#27ae60" }}>
                  ₹{payment.amount.toLocaleString("en-IN")}
                </strong>
                {payment.notes && (
                  <p
                    style={{
                      margin: "5px 0 0 0",
                      color: "#7f8c8d",
                      fontSize: "0.9rem",
                    }}
                  >
                    {payment.notes}
                  </p>
                )}
              </div>
              <div style={{ color: "#95a5a6", fontSize: "0.9rem" }}>
                {new Date(payment.date).toLocaleDateString("en-IN")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryList;
