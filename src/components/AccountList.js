import React, { useContext, useState } from "react";
import { BankContext } from "../context/BankContext";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import "./styles/Accounts.css";
function AccountList() {
  const { accounts, deleteAccount } = useContext(BankContext);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleDeleteClick = (index) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  const confirmDeleteUser = () => {
    deleteAccount(selectedIndex);
    setOpen(false);
  };

  return (
    <div>
      <h2>Account List</h2>
      <ul>
        {accounts.map((account, index) => (
          <li key={index}>
            {account.name} - ${account.balance}
            <Button variant="contained" color="error" onClick={() => handleDeleteClick(index)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this account?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
          <Button onClick={confirmDeleteUser} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AccountList;
