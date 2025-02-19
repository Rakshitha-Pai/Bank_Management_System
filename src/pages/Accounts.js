import React, { useState, useEffect } from "react";
import { Button, Table, TableHead, TableRow, TableCell, TableBody, TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import "../styles/Accounts.css"; // Ensure you have this CSS file

const Accounts = () => {
  const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [
    { id: 1, name: "John Doe", balance: 5000, type: "Savings", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", balance: 12000, type: "Current", email: "jane.smith@example.com" },
    { id: 3, name: "Michael Brown", balance: 8500, type: "Savings", email: "michael.brown@example.com" },
  ];

  const [accounts, setAccounts] = useState(storedAccounts);
  const [newAccount, setNewAccount] = useState({ name: "", balance: "", type: "", email: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  const handleInputChange = (e) => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!newAccount.name || !newAccount.balance || !newAccount.type || !newAccount.email) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingIndex !== null) {
      const updatedAccounts = [...accounts];
      updatedAccounts[editingIndex] = { ...newAccount, id: accounts[editingIndex].id };
      setAccounts(updatedAccounts);
      setEditingIndex(null);
    } else {
      setAccounts([...accounts, { id: accounts.length + 1, ...newAccount }]);
    }

    setNewAccount({ name: "", balance: "", type: "", email: "" });
  };

  const handleEdit = (index) => {
    setNewAccount(accounts[index]);
    setEditingIndex(index);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const confirmDeleteUser = () => {
    setAccounts(accounts.filter((acc) => acc.id !== deleteId));
    setOpen(false);
    setDeleteId(null);
  };

  return (
    <div className="account-container">
      <h2>Account Management</h2>
      <div className="input-fields">
        <TextField label="Name" name="name" value={newAccount.name} onChange={handleInputChange} variant="outlined" size="small" />
        <TextField label="Balance" name="balance" type="number" value={newAccount.balance} onChange={handleInputChange} variant="outlined" size="small" />
        <TextField label="Type" name="type" value={newAccount.type} onChange={handleInputChange} variant="outlined" size="small" />
        <TextField label="Email" name="email" type="email" value={newAccount.email} onChange={handleInputChange} variant="outlined" size="small" />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {editingIndex !== null ? "Update Account" : "Add Account"}
        </Button>
      </div>

      <Table className="account-table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((account, index) => (
            <TableRow key={account.id}>
              <TableCell>{account.id}</TableCell>
              <TableCell>{account.name}</TableCell>
              <TableCell>${account.balance}</TableCell>
              <TableCell>{account.type}</TableCell>
              <TableCell>{account.email}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleEdit(index)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => handleDeleteClick(account.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this user?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
          <Button onClick={confirmDeleteUser} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Accounts;
