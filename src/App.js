import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";

import { BankProvider } from "./context/BankContext";
import "./styles/App.css";

function App() {
  return (
    <BankProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/reports" element={<Reports />} />
          
        </Routes>
      </Router>
    </BankProvider>
  );
}

export default App;
