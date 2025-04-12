import { useState } from "react";
import {
  Box,
  Grid,
  Divider,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupIcon from "@mui/icons-material/Group";
import SavingsIcon from "@mui/icons-material/Savings";

function Users() {
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("bankUsers") || []);
  });
  const totalAmount = users.reduce((sum, user) => sum + user.balance, 0);
  const amountFormat = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(totalAmount);
  const getTransactions = () => {};
  const handleBalance = (num) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(num);
  };

  const handleDelete = (userDelete) => {
    const updateUsers = users.filter((user) => user !== userDelete);
    setUsers(updateUsers);
    localStorage.setItem("bankUsers", JSON.stringify(updateUsers));
  };
  const handleDate = (date) => {
    return new Date(Number(date)).toLocaleDateString();
  };

  return (
    <Box>
      <Stack
        component={Paper}
        direction={"row"}
        sx={{ width: 220, height: 120, alignItems: "center", p: 1 }}
      >
        <GroupIcon sx={{ color: "primary.dark", fontSize: 70, p: 1 }} />
        <Divider orientation="vertical" flexItem />
        <Stack sx={{ p: 1 }}>
          <Typography
            fontSize={54}
            color="primary.dark"
            fontWeight={550}
            variant="h3"
          >
            {users.length}
          </Typography>
          <Typography fontSize={12} fontWeight={600} variant="overline">
            Current Users
          </Typography>
          <Typography fontSize={11} color="primary.dark" variant="subtitle2">
            in Avion Bank
          </Typography>
        </Stack>
      </Stack>
      <Stack
        component={Paper}
        direction={"row"}
        sx={{ width: 250, height: 120, alignItems: "center", p: 1 }}
      >
        <SavingsIcon sx={{ color: "primary.dark", fontSize: 70, p: 1 }} />
        <Divider orientation="vertical" flexItem />
        <Stack sx={{ p: 1 }}>
          <Typography
            fontSize={20}
            color="primary.dark"
            fontWeight={550}
            variant="h6"
          >
            {amountFormat}
          </Typography>
          <Typography fontSize={12} fontWeight={600} variant="overline">
            Total Balance
          </Typography>
          <Typography fontSize={11} color="primary.dark" variant="subtitle2">
            in Avion Bank
          </Typography>
        </Stack>
      </Stack>
      <TableContainer component={Paper} elevation={4} sx={{ width: "800px" }}>
        <Table aria-label="user-table">
          <TableHead>
            <TableRow sx={{ background: "#c62828" }}>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "bold",
                  width: "90px",
                }}
              >
                ID
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "14px", fontWeight: "bold" }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "14px", fontWeight: "bold" }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "14px", fontWeight: "bold" }}
              >
                Balance
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "90px",
                }}
              >
                Date Created
              </TableCell>
              <TableCell
                sx={{
                  width: "10px",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.dateCreated}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{user.dateCreated}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{handleBalance(user.balance)}</TableCell>
                <TableCell sx={{ textAlign: "center", width: "90px" }}>
                  {handleDate(user.dateCreated)}
                </TableCell>

                <TableCell>
                  <IconButton
                    onClick={() => handleDelete(user)}
                    size="small"
                    aria-label="delete"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
export default Users;
