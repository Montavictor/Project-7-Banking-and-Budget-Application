import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export default function TopBar() {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar sx={{ width: "85%", maxHeight: 100 }}>
        <Toolbar>
          <Typography
            variant="h4"
            component="div"
            sx={{ border: "1px solid green" }}
          >
            Topbar
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
