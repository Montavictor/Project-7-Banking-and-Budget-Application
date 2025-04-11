import { useState } from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function Deposit() {
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("bankUsers") || []);
  });
  const [form, setForm] = useState({
    name: null,
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
  //input validation

  const validate = () => {
    const { name, amount } = form;
    let newErrors = {};
    if (!name) {
      newErrors.name = "Name is required.";
    }
    if (!amount) {
      newErrors.amount = "Amount is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateBalances = () => {
    const { name, amount } = form;
    const newAmount = Number(amount);
    const transactionDate = new Date().toISOString();

    const updateUsers = users.map((user) => {
      if (user === name) {
        return {
          ...user,
          balance: user.balance + newAmount,
          transactions: [
            ...user.transactions,
            {
              type: "deposit",
              amount: newAmount,
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
      name: null,
      amount: "",
    });
    setSnackbar({
      open: true,
      message: "Deposit Successful!",
      type: "success",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updateBalances();
    }
  };
  const options = users;
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h2">Deposit</Typography>
      <Box component="form" mt={3} onSubmit={handleSubmit}>
        <Autocomplete
          size="small"
          options={options}
          getOptionLabel={(user) =>
            `${user.dateCreated?.toString()} | ${user.name}`
          }
          value={form.name}
          onChange={handleChange("name")}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Enter Name"
              error={!!errors.name}
              helperText={errors.name}
            />
          )}
        />
        <TextField
          fullWidth
          size="small"
          label="Enter Amount"
          type="number"
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
          Deposit
        </Button>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
      >
        <Alert
          onClose={() =>
            setSnackbar({
              ...snackbar,
              open: false,
            })
          }
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Deposit;
