import { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  NumberField,
  Snackbar,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function Transfer() {
  const bankUsers = JSON.parse(localStorage.getItem("bankUsers")) || [];
  const [users, setUsers] = useState(bankUsers);
  const [show, setShowUsers] = useState(true);
  const [showSimilar, setShowSimilar] = useState(false);
  const [showId, setShowId] = useState(false);
  const [sender, setSender] = useState("");
  const [toggleValue, setToggleValue] = useState("username");
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [transactionData, setTransactionData] = useState({
    type: "",
    amount: "",
    sender: "",
    receiver: "",
  });

  //username checker
  const userExist = (user) => {
    if (!user || !user.name) {
      setError("Name is Required.");
      return false;
    }
    const found = users.find((u) => u.name === user.name);
    if (!found) {
      setError("Please Enter a Valid Name.");
      return false;
    }
    setError("");
    return true;
  };

  const findUser = (name) => {
    let foundUser = users.filter((user) => user.name === name);
    return foundUser[0];
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    const newAmount = Number(amount);

    if (!userExist(sender)) {
      setError("Please select sender name");
      return;
    }

    if (!userExist(receiver)) {
      setError("Please select receiver name");
      return;
    }

    if (sender.name === receiver.name) {
      setError("Error: the Same Person");
      return;
    }

    if (newAmount <= 0) {
      setError("Amount cannot be negative.");
      return;
    }

    const updateUsers = users.map((user) => {
      if (user.name === sender.name) {
        user.transactions.push({
          type: "transfer",
          amount: newAmount,
          to: receiver.name,
          transactionDate: new Date().toISOString(),
        });
        return {
          ...user,
          balance: user.balance - newAmount,
        };
      } else if (user.name === receiver.name) {
        user.transactions.push({
          type: "transfer",
          amount: newAmount,
          from: sender.name,
          transactionDate: new Date().toISOString(),
        });
        return {
          ...user,
          balance: user.balance + newAmount,
        };
      }
      return user;
    });

    setUsers(updateUsers);
    localStorage.setItem("bankUsers", JSON.stringify(updateUsers));
    setSender("");
    setReceiver("");
    setAmount("");
  };

  const userIDExist = (id) => {
    return users.find((user) => user.dateCreated === id);
  };
  const findId = (id) => {
    let foundid = users.filter((user) => user.dateCreated === id);
    return foundid[0];
  };

  const handleToggleChange = (event, toggle) => {
    if (toggle !== null) {
      setToggleValue(toggle);
      setShowUsers(toggle === "username");
      setShowId(toggle === "id");
    }
  };
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <h1>Transfer Money</h1>

      <ToggleButtonGroup
        size="small"
        value={toggleValue}
        exclusive
        onChange={handleToggleChange}
        color="primary"
        aria-label="user id toggle"
      >
        <ToggleButton value="username" className="user-btn">
          with username
        </ToggleButton>
        <ToggleButton value="id" className="user-id">
          with account ID
        </ToggleButton>
      </ToggleButtonGroup>

      {show && (
        <div className="container-user">
          <form onSubmit={handleUserSubmit}>
            <Autocomplete
              size="small"
              options={bankUsers}
              getOptionLabel={(user) => user.name || ""}
              value={sender}
              onChange={(e, value) => setSender(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Enter Sender Name"
                  error={!!error.sender}
                  helperText={error.sender}
                  required
                />
              )}
            />
            <br />
            <Autocomplete
              size="small"
              options={bankUsers}
              getOptionLabel={(user) => user.name || ""}
              value={receiver}
              onChange={(e, value) => setReceiver(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Enter Receiver Name"
                  error={!!error.receiver}
                  helperText={error.receiver}
                  required
                />
              )}
            />
            {/* <input
              type="text"
              name="receiver"
              onChange={(e) => setReceiver(e.target.value)}
              value={receiver}
              placeholder="Enter Receiver Name"
              required
            /> */}
            <br />

            <TextField
              type="number"
              size="small"
              label="Enter Amount"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              error={!!error && error.includes("amount")}
              helperText={!!error && error.includes("amount") ? error : ""}
              fullWidth
            />
            <br />
            <Button
              type="submit"
              variant="contained"
              size="medium"
              endIcon={<SendIcon />}
            >
              Transfer
            </Button>
          </form>
        </div>
      )}
      {showId && (
        <div className="container-id">
          {/* <Autocomplete
            options={bankUsers}
            getOptionLabel={(user)=>user.name}
            value={bankUsers.find(user=> user.name === sender) || null}
            onChange={}
            >

            </Autocomplete> */}
          {/* <input
              type="number"
              name="senderId"
              onChange={(e) => setSenderId(e.target.value)}
              value={senderId}
              placeholder="Enter Sender ID"
              required
            /> */}
          <br />

          <input
            type="text"
            name="receiver"
            onChange={(e) => setReceiverId(e.target.value)}
            value={receiverId}
            placeholder="Enter Receiver ID"
            required
          />
          <br />
          <input
            type="number"
            name="amount"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            placeholder="Enter Amount"
            required
          />
          <br />
          <Button
            variant="contained"
            size="small"
            type="submit"
            endIcon={<SendIcon />}
          >
            Transfer
          </Button>
        </div>
      )}
    </Box>
  );
}

export default Transfer;
