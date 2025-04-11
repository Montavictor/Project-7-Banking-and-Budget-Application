import "./App.css";
import CreateUser from "./components/CreateUser/CreateUser";
import Transfer from "./components/Transactions/transfer";
import { sampleData } from "./components/assets/SampleData";
import * as React from "react";
import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Deposit from "./components/Transactions/deposit";
import Withdraw from "./components/Transactions/withraw";

// sample data if users is empty
if (!localStorage.getItem("bankUsers")) {
  sampleData();
}
function App() {
  const [toggle, setToggle] = useState("createuser");

  const handleChange = (e, toggleValue) => {
    setToggle(toggleValue);
  };
  return (
    <div className="App">
      <ToggleButtonGroup
        color="primary"
        value={toggle}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="createuser">Create User</ToggleButton>
        <ToggleButton value="transfer">Transfer</ToggleButton>
        <ToggleButton value="deposit">Deposit</ToggleButton>
        <ToggleButton value="withdraw">Withdraw</ToggleButton>
      </ToggleButtonGroup>

      {toggle === "createuser" && <CreateUser />}
      {toggle === "transfer" && <Transfer />}
      {toggle === "deposit" && <Deposit />}
      {toggle === "withdraw" && <Withdraw />}
    </div>
  );
}

export default App;
