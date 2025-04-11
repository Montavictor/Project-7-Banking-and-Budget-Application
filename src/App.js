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
import Users from "./components/User/user";
import { ButtonGroup, Stack } from "@mui/material";
import { createTheme } from '@mui/material/styles';

// sample data if users is empty
const theme = createTheme({
  palette: {
    primary: {
      main: '#c62828',
      light: '#d15353',
      dark: '#8a1c1c',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ffab91',
      light: '#ffebee',
      dark: '#b26e59',
      contrastText: '#000',
    },
  },
});
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
        size="small"
        orientation="vertical"
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <Stack direction="column">
          <ToggleButton value="createuser">Create User</ToggleButton>
          <ToggleButton value="transfer">Transfer</ToggleButton>
          <ToggleButton value="deposit">Deposit</ToggleButton>
          <ToggleButton value="withdraw">Withdraw</ToggleButton>
          <ToggleButton value="users">Users</ToggleButton>
        </Stack>
      </ToggleButtonGroup>

      {toggle === "createuser" && <CreateUser />}
      {toggle === "transfer" && <Transfer />}
      {toggle === "deposit" && <Deposit />}
      {toggle === "withdraw" && <Withdraw />}
      {toggle === "users" && <Users />}
    </div>
  );
}

export default App;
