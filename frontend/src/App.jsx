import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import PaymentForm from "./components/PaymentForm";
import HistoryList from "./components/HistoryList";
import "./App.css";

function App() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <Header />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <Dashboard />
        <PaymentForm />
        <HistoryList />
      </div>
    </div>
  );
}

export default App;
