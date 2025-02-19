import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from "@mui/material";
import "../styles/Transactions.css"; // Import CSS

const Transactions = () => {
  // Load transactions from localStorage or use an empty array
  const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
  const [transactions, setTransactions] = useState(storedTransactions);
  const [newTransaction, setNewTransaction] = useState({ description: "", amount: "", date: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  // Save transactions to localStorage on change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Handle input changes
  const handleInputChange = (e) => {
    setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
  };

  // Add or Update Transaction
  const handleSubmit = () => {
    if (!newTransaction.description || !newTransaction.amount || !newTransaction.date) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingIndex !== null) {
      const updatedTransactions = [...transactions];
      updatedTransactions[editingIndex] = { ...newTransaction, amount: parseFloat(newTransaction.amount) };
      setTransactions(updatedTransactions);
      setEditingIndex(null);
    } else {
      setTransactions([...transactions, { ...newTransaction, amount: parseFloat(newTransaction.amount) }]);
    }

    setNewTransaction({ description: "", amount: "", date: "" });
  };

  // Edit Transaction
  const handleEdit = (index) => {
    setNewTransaction(transactions[index]);
    setEditingIndex(index);
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setOpen(true);
  };

  // Confirm delete action
  const confirmDelete = () => {
    setTransactions(transactions.filter((_, index) => index !== deleteIndex));
    setOpen(false);
  };

  return (
    <div className="transactions-container">
      <h2>Transaction Management</h2>

      {/* Transaction Input Form */}
      <div className="input-fields">
        <TextField label="Description" name="description" value={newTransaction.description} onChange={handleInputChange} variant="outlined" size="small" />
        <TextField label="Amount" name="amount" type="number" value={newTransaction.amount} onChange={handleInputChange} variant="outlined" size="small" />
        <TextField label="Date" name="date" type="date" value={newTransaction.date} onChange={handleInputChange} variant="outlined" size="small" InputLabelProps={{ shrink: true }} />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {editingIndex !== null ? "Update Transaction" : "Add Transaction"}
        </Button>
      </div>

      {/* Transaction History Table */}
      {transactions.length === 0 ? (
        <p>No transactions available.</p>
      ) : (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr key={index}>
                <td>{txn.description}</td>
                <td className={txn.amount > 0 ? "credit" : "debit"}>
                  {txn.amount > 0 ? `+ $${txn.amount}` : `- $${Math.abs(txn.amount)}`}
                </td>
                <td>{new Date(txn.date).toLocaleDateString()}</td>
                <td>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(index)}>Edit</Button>
                  <Button variant="contained" color="error" onClick={() => handleDeleteClick(index)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this transaction?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
          <Button onClick={confirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Transactions;
