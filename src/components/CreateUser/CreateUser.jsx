import { useState } from "react";
import {
  Box,
  Snackbar,
  Alert,
  Paper,
  InputLabel,
  Button,
  TextField,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "./CreateUser.css";

function CreateUser() {
  const [inputData, setInputData] = useState({
    name: "",
    address: "",
    age: "",
    email: "",
    initialBalance: "",
  });

  // error handling
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, address, age, email, initialBalance } = inputData;
    const numAge = Number(age.trim());
    const balance = Number(initialBalance) || 0;
    const users = JSON.parse(localStorage.getItem("bankUsers")) || [];

    // error handling
    // validation
    if (!name || name.trim() === "") {
      setError("Name is required");
      return;
    } else if (name.match(/^[0-9!@#$%^&*()_+=[\]{}|;:",.<>?\\/]/)) {
      setError("Name cannot start with numbers or special characters");
      return;
    } else if (name.match(/[^A-Za-zÀ-ÖØ-öø-ÿ\s'.-]/)) {
      setError("Name cannot contain special characters");
      return;
    } else if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    } else if (!address || address.trim() === "") {
      setError("Address is required");
      return;
    } else if (address.match(/^[!@#$%^&*()_+=[/]{}|:;"<>?]/)) {
      setError("Address cannot start with special characters.");
      return;
    } else if (age.trim() === "" || !numAge) {
      setError("Age is required.");
      return;
    } else if (numAge < 18 || numAge > 120) {
      setError("Age must be between 18 and 120.");
      return;
    } else if (balance < 3000) {
      setError("Initial Deposit cannot be less than PHP 3,000");
      return;
    } else if (balance > 4000000) {
      setError(
        "Maximum Deposit cannot exceed PHP 4,000,000.00. Inaccordance to Anti-Laundering Law"
      );
      return;
    } else if (
      users.find((user) => user.name.toLowerCase() === name.toLowerCase())
    ) {
      setError("Error: User's Name Already Exists.");
      return;
    } else {
      createNewUser();
    }
  };

  // creating a new user and pushing it to database
  function createNewUser() {
    const dateCreated = Date.now().toString();
    const users = JSON.parse(localStorage.getItem("bankUsers")) || [];
    const { name, address, initialBalance, email, age } = inputData;
    const balance = Number(initialBalance) || 0;
    const newUser = {
      name,
      address,
      balance,
      email,
      age,
      dateCreated,
      transactions: [],
    };

    users.push(newUser);
    localStorage.setItem("bankUsers", JSON.stringify(users));
    setShowSuccess(true);
    setInputData({
      name: "",
      address: "",
      age: "",
      initialBalance: "",
      email: "",
    });
    //debug checker
    console.log(localStorage.getItem("bankUsers"));
    console.log(users);
  }

  // change handler of all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  };

  return (
    <Stack
      direction={"column"}
      sx={{ width: "95%", height: "100%", justifySelf: "center" }}
      className="createUser"
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={6}
        sx={{
          width: "100%",
          height: "auto",
          maxHeight: "100%",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        <Paper
          sx={{
            p: 2,
            display: "flex",
            height: 40,
            flexDirection: "column",
            alignItems: "flex-start",
            marginBottom: 3,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
            background: "#c62828",
            width: "100%",
          }}
        >
          <Typography variant="outline" color="#ffff" sx={{ fontWeight: 600 }}>
            Create Account
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ fontSize: "13px" }}
            color="secondary"
          >
            Input client's data to create a new Account
          </Typography>
        </Paper>
        <Box
          sx={{ p: 2, width: "100%", display: "flex", flexDirection: "column" }}
        >
          <InputLabel htmlFor="name">Full Name</InputLabel>
          <TextField
            sx={{ p: 1, width: "95%", fontSize: "12px", textAlign: "center" }}
            size="small"
            type="text"
            name="name"
            variant="filled"
            onChange={handleChange}
            value={inputData.name}
            placeholder="e.g. Dela Cruz, Juan"
            error={!!error && error.toLowerCase().includes("name")}
            helperText={
              error && error.toLowerCase().includes("name") ? error : ""
            }
            required
          />
        </Box>
        <Divider />
        <Box
          sx={{ p: 2, width: "100%", display: "flex", flexDirection: "column" }}
        >
          <InputLabel htmlFor="address">Address</InputLabel>
          <TextField
            multiline
            rows={2}
            sx={{ p: 1, width: "95%" }}
            variant="filled"
            placeholder="Enter Address"
            type="text"
            name="address"
            onChange={handleChange}
            value={inputData.address}
            error={!!error && error.toLowerCase().includes("address")}
            helperText={
              error && error.toLowerCase().includes("address") ? error : ""
            }
            required
          />
        </Box>
        <Divider />
        <Stack direction={"row"}>
          <Box
            sx={{
              p: 2,
              width: "30%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <InputLabel htmlFor="age">Age</InputLabel>
            <TextField
              className="my-textfield"
              sx={{ p: 1, width: "80%", fontSize: "12px", textAlign: "center" }}
              size="small"
              type="number"
              name="age"
              variant="filled"
              onChange={handleChange}
              value={inputData.age}
              error={!!error && error.toLowerCase().includes("age")}
              helperText={
                error && error.toLowerCase().includes("age") ? error : ""
              }
              required
            />
          </Box>
          <Box
            sx={{
              p: 2,
              width: "95%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <InputLabel htmlFor="email">Email</InputLabel>
            <TextField
              sx={{
                p: 1,
                width: "100%",
                fontSize: "12px",
                textAlign: "center",
              }}
              variant="filled"
              placeholder="Enter Email"
              type="email"
              name="email"
              onChange={handleChange}
              value={inputData.email}
              error={!!error && error.toLowerCase().includes("email")}
              helperText={
                error && error.toLowerCase().includes("email") ? error : ""
              }
              required
            />
          </Box>
        </Stack>
        <Box
          sx={{
            p: 2,
            width: "55%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <InputLabel htmlFor="initialBalance">Initial Deposit</InputLabel>
          <TextField
            sx={{ p: 1, width: "100%", fontSize: "12px", textAlign: "center" }}
            type="number"
            variant="filled"
            name="initialBalance"
            onChange={handleChange}
            placeholder="Minimum Deposit of PHP 3,000"
            value={inputData.initialBalance}
            required
            error={!!error && error.toLowerCase().includes("deposit")}
            helperText={
              error && error.toLowerCase().includes("deposit") ? error : ""
            }
          />
        </Box>
        <Divider />
        <Button
          type="submit"
          sx={{ marginTop: 3, marginLeft: 2.5, mb: 2 }}
          size="large"
          variant="contained"
          onClick={handleSubmit}
          className="submitBtn"
          endIcon={<SendIcon />}
        >
          Submit
        </Button>
      </Paper>
      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success">User created successfully!</Alert>
      </Snackbar>
    </Stack>
  );
}

export default CreateUser;
