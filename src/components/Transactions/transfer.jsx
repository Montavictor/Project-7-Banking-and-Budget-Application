import { useState } from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Paper,
  Snackbar,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "./withdraw.css";
// const findUserByName = (users, name) => users.find((u) => u.name === name);
// const findUserById = (users, id) => users.find((u) => u.dateCreated === id);

function Transfer() {
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("bankUsers")) || [];
  });
  const [toggleValue, setToggleValue] = useState("username");
  const [form, setForm] = useState({
    sender: null,
    receiver: null,
    amount: "",
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  //input handler
  const handleChange = (field) => (e, value) => {
    const inputValue = value ?? e.target.value;
    setForm((inputs) => ({ ...inputs, [field]: inputValue }));
    setErrors((inputs) => ({ ...inputs, [field]: "" }));
  };

  //validation checker
  const validate = () => {
    const { sender, receiver, amount } = form;
    let newErrors = {};
    const newAmount = Number(amount);
    if (!sender) {
      newErrors.sender = "Sender is required.";
    }
    if (!receiver) {
      newErrors.receiver = "Receiver is required.";
    }
    if (sender && receiver && sender === receiver) {
      newErrors.receiver = "Sender and Receiver cannot be the same.";
    }
    if (!amount) {
      newErrors.amount = "Amount is required.";
    }
    if (newAmount <= 0) {
      newErrors.amount = "Invalid Amount";
    }
    if (sender && amount && newAmount >= sender.balance) {
      newErrors.amount = "Insufficient Funds";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // update balances

  const updateBalances = () => {
    const { sender, receiver, amount } = form;
    const newAmount = Number(amount);
    const transactionDate = new Date().toISOString();

    const updateUsers = users.map((user) => {
      if (user === sender) {
        return {
          ...user,
          balance: user.balance - newAmount,
          transactions: [
            ...user.transactions,
            {
              type: "transfer",
              amount: newAmount,
              to: receiver.name || receiver.dateCreated,
              transactionDate: transactionDate,
            },
          ],
        };
      }
      if (user === receiver) {
        return {
          ...user,
          balance: user.balance + newAmount,
          transactions: [
            ...user.transactions,
            {
              type: "transfer",
              amount: newAmount,
              from: sender.name || sender.dateCreated,
              transactionDate: transactionDate,
            },
          ],
        };
      }
      return user;
    });
    setUsers(updateUsers);
    localStorage.setItem("bankUsers", JSON.stringify(updateUsers));
    setForm({
      sender: null,
      receiver: null,
      amount: "",
    });
    setSnackbar({
      open: true,
      message: "Transfer Successful!",
      type: "success",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updateBalances();
    }
  };

  const toggleMode = toggleValue === "username";
  const options = users;

  return (
    <Paper
      component="div"
      className="container"
      sx={{
        maxWidth: 500,
        height: 380,
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
          Transfer
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontSize: "12px" }}
          color="secondary"
        >
          Transfer Money from Account to Another
        </Typography>
      </Paper>
      <Box
        sx={{
          width: 300,
          height: "auto",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <ToggleButtonGroup
          size="small"
          value={toggleValue}
          exclusive
          onChange={(e, mode) => {
            if (mode) {
              setToggleValue(mode);
              setForm({
                sender: null,
                receiver: null,
                amount: "",
              });
            }
          }}
          color="primary"
        >
          <ToggleButton value="username" sx={{ fontSize: 12 }}>
            With Username
          </ToggleButton>
          <ToggleButton value="id" sx={{ fontSize: 12 }} className="user-id">
            with Account ID
          </ToggleButton>
        </ToggleButtonGroup>

        <Box component="form" mt={1} sx={{ mb: 2 }} onSubmit={handleSubmit}>
          <Autocomplete
            size="small"
            options={options}
            sx={{ mb: 2 }}
            getOptionLabel={(user) =>
              (toggleMode ? user.name : String(user.dateCreated)) || ""
            }
            value={form.sender}
            onChange={handleChange("sender")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Enter Sender"
                error={!!errors.sender}
                helperText={errors.sender}
              />
            )}
          />

          <Autocomplete
            size="small"
            options={options}
            sx={{ mb: 2 }}
            getOptionLabel={(user) =>
              (toggleMode ? user.name : String(user.dateCreated)) || ""
            }
            value={form.receiver}
            onChange={handleChange("receiver")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Enter Receiver"
                error={!!errors.receiver}
                helperText={errors.receiver}
              />
            )}
          />

          <TextField
            fullWidth
            type="number"
            size="small"
            label="Enter Amount"
            value={form.amount}
            onChange={handleChange("amount")}
            error={!!errors.amount}
            helperText={errors.amount}
          />
          <Button
            type="submit"
            variant="contained"
            size="medium"
            endIcon={<SendIcon />}
            sx={{ mt: 3 }}
          >
            Transfer
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default Transfer;
