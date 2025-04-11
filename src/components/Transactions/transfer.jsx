import { useState } from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Snackbar,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const findUserByName = (users, name) => users.find((u) => u.name === name);
const findUserById = (users, id) => users.find((u) => u.dateCreated === id);

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
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <h1>Transfer Money</h1>

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
        <ToggleButton value="username" className="user-btn">
          With Username
        </ToggleButton>
        <ToggleButton value="id" className="user-id">
          with Account ID
        </ToggleButton>
      </ToggleButtonGroup>

      <Box component="form" mt={3} onSubmit={handleSubmit}>
        <Autocomplete
          size="small"
          options={options}
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
              required
            />
          )}
        />

        <Autocomplete
          // sx={{ width: 300 }}
          size="small"
          options={options}
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
              required
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
          sx={{ mt: 2 }}
        >
          Transfer
        </Button>
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
    </Box>
  );
}

export default Transfer;
