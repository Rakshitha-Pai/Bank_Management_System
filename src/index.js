import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BankProvider } from "./context/BankContext"; // ✅ Import provider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BankProvider>
    <App />
  </BankProvider>
);
