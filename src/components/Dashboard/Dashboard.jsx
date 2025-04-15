import { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";

export default function Dashboard() {
  const userList = JSON.parse(localStorage.getItem("bankUsers") || []);

  const findTransactions = userList.flatMap((user) =>
    user.transactions.map((t) => ({
      ...t,
      user: user.name,
    }))
  );
  return (
    <Paper
      elevation={8}
      sx={{
        maxWidth: "95%",
        height: 310,
        mx: "auto",
        mt: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Paper
        sx={{
          p: 1,
          display: "flex",
          height: 40,
          flexDirection: "column",
          alignItems: "flex-start",
          marginBottom: 3,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
          background: "#c62828",
        }}
      >
        <Typography variant="outline" color="#ffff" sx={{ fontWeight: 700 }}>
          Dashboard
        </Typography>
      </Paper>

      <Box>
        <Typography variant="h3" color="primary">
          {findTransactions.length}
        </Typography>
        <Typography variant="overline" gutterBottom>
          Total Transactions
        </Typography>
      </Box>
      <Box>
        <Typography variant="h3" color="primary">
          {userList.length}
        </Typography>
        <Typography variant="overline" gutterBottom>
          Total Users
        </Typography>
      </Box>
    </Paper>
  );
}
