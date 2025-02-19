/* --- 4️⃣ components/Navbar.js --- */
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav>
      <h2>Banking System</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/accounts">Accounts</Link></li>
        <li><Link to="/transactions">Transactions</Link></li>
        <li><Link to="/reports">Reports</Link></li>
      </ul>
    </nav>
  );
}
export default Navbar;