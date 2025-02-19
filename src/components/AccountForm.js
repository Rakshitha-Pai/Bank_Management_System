/* --- 6️⃣ components/AccountForm.js --- */
import React, { useState, useContext } from "react";
import { BankContext } from "../context/BankContext";
import "./styles/Accounts.css";
function AccountForm() {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const { addAccount } = useContext(BankContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && balance) {
      addAccount({ name, balance: parseFloat(balance) });
      setName("");
      setBalance("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Account Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Balance" value={balance} onChange={(e) => setBalance(e.target.value)} required />
      <button type="submit">Add Account</button>
    </form>
  );
}
export default AccountForm;
