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
import { ButtonGroup, Stack, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// sample data if users is empty

if (!localStorage.getItem("bankUsers")) {
  sampleData();
}
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#c62828",
        light: "#d15353",
        dark: "#8a1c1c",
        contrastText: "#fff",
      },
      secondary: {
        main: "#ffab91",
        light: "#ffebee",
        dark: "#b26e59",
        contrastText: "#000",
      },
    },
  });
  const [toggle, setToggle] = useState("users");

  const handleChange = (e, toggleValue) => {
    setToggle(toggleValue);
  };
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background: "linear-gradient(135deg, #F5F7FA 0%, #E9ECF5 100%)",
          height: "auto",
        }}
      >
        <ToggleButtonGroup
          sx={{ position: "static", left: 0 }}
          color="primary"
          value={toggle}
          size="small"
          orientation="vertical"
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <Stack direction="column">
            <ToggleButton value="users">Users</ToggleButton>
            <ToggleButton value="createuser">Create User</ToggleButton>
            <ToggleButton value="transfer">Transfer</ToggleButton>
            <ToggleButton value="deposit">Deposit</ToggleButton>
            <ToggleButton value="withdraw">Withdraw</ToggleButton>
          </Stack>
        </ToggleButtonGroup>

        {toggle === "createuser" && <CreateUser />}
        {toggle === "transfer" && <Transfer />}
        {toggle === "deposit" && <Deposit />}
        {toggle === "withdraw" && <Withdraw />}
        {toggle === "users" && <Users />}
      </Box>
    </ThemeProvider>
  );
}

export default App;
