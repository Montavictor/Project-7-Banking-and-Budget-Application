import * as React from "react";

//Components
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

// Icons
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCardIcon from "@mui/icons-material/AddCard";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PaymentsIcon from "@mui/icons-material/Payments";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

const drawerWidth = 213;

export default function Sidebar({ setSelectedView }) {
  // user items
  const listItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      text: "Users",
      icon: <GroupIcon />,
    },
    {
      text: "Create User",
      icon: <GroupAddIcon />,
    },
    {
      text: "Budget",
      icon: <AddCardIcon />,
    },
  ];
  // transaction items
  const transItems = [
    {
      text: "Deposit",
      icon: <LocalAtmIcon />,
    },
    {
      text: "Withdraw",
      icon: <PaymentsIcon />,
    },
    {
      text: "Transfer",
      icon: <CurrencyExchangeIcon />,
    },
  ];
  const handleListItemClick = (itemText) => {
    if (setSelectedView) {
      setSelectedView(itemText);
    }
  };
  return (
    <Box sx={{ display: "flex", position: "absolute" }}>
      <Drawer
        sx={{
          width: "100%",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Button
          onClick={() => setSelectedView("Users")}
          startIcon={
            <AccountBalanceIcon
              sx={{ color: "#8a1c1c", transform: "scale(1.5)" }}
            />
          }
          sx={{
            display: "flex",
            alignSelf: "center",
            fontWeight: 800,
            p: 2,
            position: "absolute",
          }}
        >
          <Typography color="#8a1c1c" variant="h5" sx={{ fontWeight: 800 }}>
            Bankrupt
          </Typography>
        </Button>
        <Divider />
        <List>
          {listItems.map((items) => (
            <ListItem key={items.text} disablePadding>
              <ListItemButton onClick={() => handleListItemClick(items.text)}>
                <ListItemIcon>{items.icon}</ListItemIcon>
                <ListItemText primary={items.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {transItems.map((items) => (
            <ListItem key={items.text} disablePadding>
              <ListItemButton onClick={() => handleListItemClick(items.text)}>
                <ListItemIcon>{items.icon}</ListItemIcon>
                <ListItemText primary={items.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: "auto" }}>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>{<InboxIcon />}</ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>

      <Toolbar />
    </Box>
  );
}
