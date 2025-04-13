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
import { Stack, Box, AppBar, Toolbar, Typography, Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Sidebar from "./components/NavBar/SideDrawer.jsx";
import TopBar from "./components/NavBar/Topbar.jsx";

// sample data if users is empty
if (!localStorage.getItem("bankUsers")) {
  sampleData();
}
function App() {
  const [selectedView, setSelectedView] = useState("Users");
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
  return (
    <ThemeProvider theme={theme}>
      <Box
        container
        className="parent"
        sx={{
          background: "#fafafa",

          height: "100vh",
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gridTemplateRows: "0.5fr repeat(4, 1fr)",
          gridColumnGap: 0,
          gridRowGap: 0,
        }}
      >
        <Box
          className="div1"
          sx={{
            gridArea: "1 / 1 / 6 / 2",
            background: "#f99",
          }}
        >
          <Sidebar setSelectedView={setSelectedView} />
        </Box>
        <Box
          className="div2"
          sx={{
            gridArea: "1 / 2 / 3 / 7",
            background: "#9f9",
          }}
        >
          <TopBar />
        </Box>
        <Box
          className="div3"
          sx={{
            gridArea: "2 / 2 / 6 / 6",
            background: "#99f",
          }}
        >
          {/* {selectedView === "Dashboard" && <Dashboard />} */}
          {selectedView === "Users" && <Users />}
          {selectedView === "Create User" && <CreateUser />}
          {/* {selectedView === "Budget" && <Budget />} */}
          {selectedView === "Deposit" && <Deposit />}
          {selectedView === "Withdraw" && <Withdraw />}
          {selectedView === "Transfer" && <Transfer />}
        </Box>
        <Box
          className="div4"
          sx={{
            gridArea: "1 / 6 / 6 / 7",
            background: "lightgreen",
            border: "2px solid green",
            display: "flex",
          }}
        >
          <Typography alignSelf={"center"}>Another sidebar</Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
