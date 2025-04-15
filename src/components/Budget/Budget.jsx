import { useState, useEffect } from "react";
import NewBudgetDialog from "./NewBudgetDialog";
import AddTaskDialog from "./AddTaskDialog";
import { Button, Paper, Stack, Typography, Box } from "@mui/material";
import "./Budget.css";
import DeleteIcon from "@mui/icons-material/Delete";

function Budget() {
  const [currentId, setCurrentId] = useState("");
  const [currentBudget, setCurrentBudget] = useState(0);
  const [itemList, setItemList] = useState([]);
  const [budgetList, setBudgetList] = useState([]);
  const [userList, setUserList] = useState(() => {
    return JSON.parse(localStorage.getItem("bankUsers") || []);
  });
  const [currentName, setCurrentName] = useState("");
  const [total, setTotal] = useState(0);
  const [totalClassName, setTotalClassName] = useState("green");

  const checkExistingBudget = (dateId) => {
    setItemList([]);
    let userCheck = budgetList;
    const idCheck = dateId;
    userCheck = userCheck.filter((user) => user.dateCreated === idCheck);
    if (userCheck.length < 1) {
      const newBudgetUser = {
        dateCreated: idCheck,
        budget: 0,
        budgetItems: [],
      };
      setBudgetList((prevlist) => [...prevlist, newBudgetUser]);
      setCurrentBudget(0);
    } else {
      setCurrentBudget(userCheck[0].budget);
      setItemList(userCheck[0].budgetItems);
    }
  };

  const handleDeleteItem = (id) => {
    setItemList((previtems) => previtems.filter((item) => item.itemId !== id));
  };

  const UpdateTotal = () => {
    useEffect(() => {
      let sum = currentBudget;
      const items = itemList;
      for (const item of items) {
        sum -= Number(item.cost);
      }
      setTotal(sum);
      if (Number(sum) > 0) {
        setTotalClassName("totalClass green");
      } else if (Number(sum) < 0) {
        setTotalClassName("totalClass red");
      } else {
        setTotalClassName("totalClass");
      }
    }, [currentBudget, itemList]);
  };

  const handleSelectorChange = (event) => {
    const parsedSelectorValue = event.target.value.split(" || ");
    setCurrentId(parsedSelectorValue[1]);
    checkExistingBudget(parsedSelectorValue[1]);
    setCurrentName(parsedSelectorValue[0]);
  };

  const DisplayItemList = (props) => {
    const { itemList } = props;
    return itemList.map((item) => {
      return (
        <Box
          key={item.itemId}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 1,
            alignItems: "center",
            borderTop: "lightgrey solid 1px",
          }}
        >
          <span className="bold">{item.name} </span>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography sx={{ mr: "16px" }}>
              <span className="bold">{item.cost}</span>
            </Typography>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={() => handleDeleteItem(item.itemId)}
            >
              Delete Item
            </Button>
          </Box>
        </Box>
      );
    });
  };

  const SelectOptions = (props) => {
    const { users } = props;

    return users.map((user) => {
      return (
        <option key={user.dateCreated}>
          {user["name"] + " || " + user["dateCreated"]}
        </option>
      );
    });
  };

  return (
    <Stack
      spacing={2}
      sx={{ width: "95%", height: "100%", justifySelf: "center" }}
    >
      <Paper
        elevation={4}
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
            p: 1,
            display: "flex",
            flexDirection: "column",
            background: "#c62828",
          }}
        >
          <Typography variant="outline" color="#ffff" sx={{ fontWeight: 700 }}>
            Budget App
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ fontSize: "12px" }}
            color="secondary"
          >
            Manage Your Expenses Here
          </Typography>
        </Paper>
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
          <p>
            User: <span className="bold">{currentName}</span>
          </p>
          <p>
            Account Id: <span className="bold">{currentId}</span>
          </p>
        </Box>
        <Box
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Typography variant="subtitle" sx={{ textAlign: "center" }}>
            Starting Budget:{" "}
            <span className="budgetClass">{currentBudget}</span>
          </Typography>
          <Typography variant="subtitle" sx={{ textAlign: "center" }}>
            Budget - Expenses: <span className={totalClassName}>{total}</span>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
          <select
            onChange={handleSelectorChange}
            className="budgetUserSelector"
          >
            <option>Select User</option>
            <SelectOptions users={userList} />
          </select>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <NewBudgetDialog
            budgetList={budgetList}
            setBudgetList={setBudgetList}
            currentId={currentId}
            setCurrentBudget={setCurrentBudget}
            itemList={itemList}
          />
          <AddTaskDialog
            currentId={currentId}
            setBudgetList={setBudgetList}
            budgetList={budgetList}
            currentBudget={currentBudget}
            itemList={itemList}
            setItemList={setItemList}
          />
        </Box>
        <Box
          sx={{
            p: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="subtitle">EXPENSE:</Typography>
            <Typography variant="subtitle" sx={{ mr: "20%" }}>
              COST:
            </Typography>
          </Box>
          <DisplayItemList itemList={itemList} />
        </Box>
        <UpdateTotal />
      </Paper>
    </Stack>
  );
}

export default Budget;
