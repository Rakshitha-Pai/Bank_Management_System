import React, { useContext, useEffect, useState } from "react";
import { BankContext } from "../context/BankContext";
import "../styles/Report.css"; // Import CSS

const Report = () => {
  const { transactions } = useContext(BankContext);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [balance, setBalance] = useState(0);

  // Calculate Total Credit, Debit, and Balance
  useEffect(() => {
    const credit = transactions.filter(txn => txn.amount > 0).reduce((sum, txn) => sum + txn.amount, 0);
    const debit = transactions.filter(txn => txn.amount < 0).reduce((sum, txn) => sum + txn.amount, 0);
    setTotalCredit(credit);
    setTotalDebit(debit);
    setBalance(credit + debit);
  }, [transactions]);

  // Format numbers with commas
  const formatCurrency = (amount) => {
    return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
  };

  return (
    <div className="report-container">
      <h2>Financial Report</h2>
      <div className="summary">
        <p>Total Credit: <span className="credit">+ {formatCurrency(totalCredit)}</span></p>
        <p>Total Debit: <span className="debit">- {formatCurrency(Math.abs(totalDebit))}</span></p>
        <p>Current Balance: <span className={balance >= 0 ? "balance-positive" : "balance-negative"}>{formatCurrency(balance)}</span></p>
      </div>

      <h3>Transaction Summary</h3>
      {transactions.length === 0 ? (
        <p>No transactions available.</p>
      ) : (
        <table className="report-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr key={index}>
                <td>{txn.description}</td>
                <td className={txn.amount > 0 ? "credit" : "debit"}>
                  {txn.amount > 0 ? `+ ${formatCurrency(txn.amount)}` : `- ${formatCurrency(Math.abs(txn.amount))}`}
                </td>
                <td>{new Date(txn.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Report;
