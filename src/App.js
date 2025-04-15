import CreateUser from "./components/CreateUser/CreateUser";
import Transfer from "./components/Transactions/transfer";
import { sampleData } from "./components/assets/SampleData";
import * as React from "react";
import { useState } from "react";
import Deposit from "./components/Transactions/deposit";
import Withdraw from "./components/Transactions/withraw";
import Users from "./components/User/user";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Sidebar from "./components/NavBar/SideDrawer.jsx";
import TopBar from "./components/NavBar/Topbar.jsx";
import "./App.css";
import Rightbar from "./components/NavBar/Rightbar.jsx";
import Budget from "./components/Budget/Budget.jsx";

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
          gridTemplateColumns: {
            md: "0.5fr repeat(4, 1fr) 0.5fr",
            lg: "0.9fr repeat(4, 1fr) 0.9fr",
            xl: "repeat(6, 1fr)",
          },
          gridTemplateRows: "0.4fr repeat(4, 1fr)",
          gridColumnGap: 0,
          gridRowGap: 0,
        }}
      >
        <Box
          className="sidebar-left"
          sx={{
            gridArea: "2 / 1 / 6 / 2",
            display: {
              xs: "none",
              md: "none",
              lg: "block",
              xl: "block",
            },
            width: "100%",
          }}
        >
          <Sidebar setSelectedView={setSelectedView} />
        </Box>
        <Box
          className="topbar"
          sx={{
            gridArea: "1 / 1 / 2 / 7",
          }}
        >
          <TopBar setSelectedView={setSelectedView} />
        </Box>
        <Box
          className="div3"
          sx={{
            gridArea: "2 / 2 / 6 / 6",
          }}
        >
          {/* {selectedView === "Dashboard" && <Dashboard />} */}
          {selectedView === "Users" && <Users />}
          {selectedView === "Create User" && <CreateUser />}
          {selectedView === "Budget" && <Budget />}
          {selectedView === "Deposit" && <Deposit />}
          {selectedView === "Withdraw" && <Withdraw />}
          {selectedView === "Transfer" && <Transfer />}
        </Box>
        <Box
          className="div4"
          sx={{
            gridArea: "2 / 6 / 6 / 7",
            display: {
              xs: "none",
              md: "none",
              lg: "block",
              xl: "block",
            },
            justifyContent: "center",
          }}
        >
          <Rightbar />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
