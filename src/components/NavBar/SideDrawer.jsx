import * as React from "react";

//Components
import {
  Box,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
} from "@mui/material";

// Icons
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCardIcon from "@mui/icons-material/AddCard";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PaymentsIcon from "@mui/icons-material/Payments";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import "./Topbar.css";

export default function Sidebar({
  setSelectedView,
  mobileOpen,
  handleDrawerToggle,
}) {
  // user items
  const listItems = [
    // {
    //   text: "Dashboard",
    //   icon: <DashboardIcon />,
    // },
    {
      text: "Budget",
      icon: <AddCardIcon />,
    },
    {
      text: "Users",
      icon: <GroupIcon />,
    },
    {
      text: "Create User",
      icon: <GroupAddIcon />,
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
  const renderDrawerContent = () => (
    <Box>
      <Toolbar />
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
    </Box>
  );

  return (
    <Box sx={{ display: "flex", position: "absolute", width: "100%" }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        elevation={6}
        sx={{
          display: { xs: "block", sm: "block", md: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            width: 237,
          },
        }}
        anchor="left"
      >
        {renderDrawerContent()}
      </Drawer>

      <Drawer
        elevation={6}
        sx={{
          display: { xs: "none", sm: "none", md: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            width: 237,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {renderDrawerContent()}
      </Drawer>

      <Toolbar />
    </Box>
  );
}
