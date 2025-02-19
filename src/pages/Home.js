import React from "react";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Bank Management System</h1>
      <p className="home-subtext">
        Your trusted partner for secure, efficient, and seamless banking solutions.
      </p>

      <h2 className="home-heading">Our Banking Services</h2>
      <ul className="home-services">
        <li><span>Savings & Current Accounts</span></li>
        <li><span>Loans & Credit Services</span></li>
        <li><span>Debit & Credit Cards</span></li>
        <li><span>Investment & Wealth Management</span></li>
        <li><span>Online & Mobile Banking</span></li>
        <li><span>Secure Transactions & Fraud Protection</span></li>
      </ul>

      <h2 className="home-heading">Why Choose Us?</h2>
      <p className="home-subtext">
        We provide a fast, secure, and user-friendly banking experience with 24/7 customer support.
      </p>
    </div>
  );
};

export default Home;
