import { useState } from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function Withdraw() {
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

  // input handler
  const handleChange = (field) => (e, value) => {
    const inputValue = value ?? e.target.value;
    setForm((inputs) => ({ ...inputs, [field]: inputValue }));
    setErrors((inputs) => ({ ...inputs, [field]: "" }));
  };

  //input validation

  const validate = () => {
    const { name, amount } = form;
    let newErrors = {};
    const newAmount = Number(amount);

    if (!name) {
      newErrors.name = "Name is required.";
    }
    if (!amount) {
      newErrors.amount = "Amount is required";
    }

    if (amount && newAmount < 0) {
      newErrors.amount = "Invalid Amount";
    }
    if (name && amount && newAmount >= name.balance) {
      newErrors.amount = "Insufficient Balance";
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
          balance: user.balance - newAmount,
          transactions: [
            ...user.transactions,
            {
              type: "withdraw",
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
      message: "Withdraw Successful!",
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
    <>
      <Paper
        component="div"
        className="container"
        sx={{
          maxWidth: 700,
          height: 350,
          mx: "auto",
          mt: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Card sx={{ p: 1, display: "flex", height: 40, flexDirection: "column", alignItems:"flex-start", marginBottom:3, borderRadius:0,backgroundColor:"#eeee" }}>
          <Typography variant="outline" sx={{ fontWeight: 500 }}>
            Withdraw
          </Typography>
          <Typography variant="subtitle2" color="grey">
            Withdraw Money from Account
          </Typography>
        </Card>
        <Paper
          sx={{
            width: 400,
            height: 200,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box sx={{ p: 2 }} component="form" my="auto" onSubmit={handleSubmit}>
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
              type="Submit"
              variant="contained"
              size="medium"
              endIcon={<SendIcon />}
              sx={{ mt: 2 }}
              color="primary"
            >
              Withdraw
            </Button>
          </Box>
        </Paper>
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
      </Paper>
    </>
  );
}

export default Withdraw;
