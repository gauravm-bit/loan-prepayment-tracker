import { useState, useEffect } from "react";

const Dashboard = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/prepayments");
        const data = await response.json();

        // This takes all the payments and adds their amounts together
        const calculatedSum = data.reduce(
          (accumulator, payment) => accumulator + payment.amount,
          0
        );

        setTotal(calculatedSum);
      } catch (error) {
        console.error("Error fetching total:", error);
      }
    };

    fetchTotal();
  }, []);

  return (
    <div
      style={{
        background: "#ecf0f1",
        padding: "20px",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <h2 style={{ margin: "0 0 10px 0", color: "#34495e" }}>
        Total Prepays Made
      </h2>
      <h1 style={{ margin: "0", color: "#27ae60", fontSize: "2.5rem" }}>
        ₹{total.toLocaleString("en-IN")}
      </h1>
    </div>
  );
};

export default Dashboard;
