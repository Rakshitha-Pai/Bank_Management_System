import React, { createContext, useState, useEffect } from "react";

export const BankContext = createContext();

export const BankProvider = ({ children }) => {
  const [accounts, setAccounts] = useState(
    JSON.parse(localStorage.getItem("accounts")) || []
  );
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("transactions")) || []
  );
  const [fraudAlerts, setFraudAlerts] = useState(
    JSON.parse(localStorage.getItem("fraudAlerts")) || []
  );
  const [investments, setInvestments] = useState(
    JSON.parse(localStorage.getItem("investments")) || []
  );

  // Update localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("fraudAlerts", JSON.stringify(fraudAlerts));
    localStorage.setItem("investments", JSON.stringify(investments));
  }, [accounts, transactions, fraudAlerts, investments]);

  // Account functions
  const addAccount = (account) => {
    setAccounts([...accounts, { id: Date.now(), ...account }]);
  };

  const deleteAccount = (id) => {
    setAccounts(accounts.filter((acc) => acc.id !== id));
  };

  // Transaction functions
  const addTransaction = (transaction) => {
    setTransactions([...transactions, { id: Date.now(), ...transaction }]);
  };

  // Fraud Protection functions
  const addFraudAlert = (alert) => {
    setFraudAlerts([...fraudAlerts, { id: Date.now(), ...alert }]);
  };

  const removeFraudAlert = (id) => {
    setFraudAlerts(fraudAlerts.filter((alert) => alert.id !== id));
  };

  // Investment functions
  const addInvestment = (investment) => {
    setInvestments([...investments, { id: Date.now(), ...investment }]);
  };

  const removeInvestment = (id) => {
    setInvestments(investments.filter((investment) => investment.id !== id));
  };

  return (
    <BankContext.Provider
      value={{
        accounts,
        transactions,
        fraudAlerts,
        investments,
        addAccount,
        deleteAccount,
        addTransaction,
        addFraudAlert,
        removeFraudAlert,
        addInvestment,
        removeInvestment,
      }}
    >
      {children}
    </BankContext.Provider>
  );
};
