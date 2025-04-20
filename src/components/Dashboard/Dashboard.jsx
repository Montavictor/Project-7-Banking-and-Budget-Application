import { useEffect, useState } from "react";
import { Box, Paper, Typography, Divider } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';


export default function Dashboard() {
  const userList = JSON.parse(localStorage.getItem("bankUsers") || []);
  const [seconds, setSeconds] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [hours, setHours] = useState("0");
  const [greeting, setGreeting] = useState("Day");

  function setTime() {
    const now = new Date();
    let mins = now.getMinutes();
    let secs = now.getSeconds();
    if (Number(secs) < 10) {
      secs = "0" + secs.toString();
    }
    if (Number(mins) < 10) {
      mins = "0" + mins.toString();
    }
    setSeconds(secs);
    setMinutes(mins);
    setHours(now.getHours());
    if(24 > Number(hours) && Number(hours) >= 18) {
        setGreeting("Evening")
    } else if (12 >= Number(hours) && Number(hours) >= 0) {
        setGreeting("Morning")
    } else {  
        setGreeting("Afternoon")
    }
  }


  function GetTime() {
    useEffect(() => {
      const intervalId = setInterval(setTime, 1000);
      return () => {clearInterval(intervalId)};
    }, []);
  }
  
  const findTransfers = userList.flatMap(
    user => user.transactions.filter(
      transaction => transaction.type === "transfer"))

  const findWithdrawals = userList.flatMap(
    user => user.transactions.filter(
      transaction => transaction.type === "withdraw"))

  const findDeposits = userList.flatMap(
    user => user.transactions.filter(
      transaction => transaction.type === "deposit")
    )

  const findTransactions = userList.flatMap((user) =>
    user.transactions.map((t) => ({
      ...t,
      user: user.name,
    }))
  );




  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: "95%",
        height: "85%",
        mx: "auto",
        mt: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Paper
        sx={{
          p: 0,
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
        <Typography
          variant="outline"
          color="#ffff"
          sx={{ fontWeight: 700, pt: 1, pl: 1 }}
        >
          Dashboard
        </Typography>
      </Paper>
      <Box>
        <Typography sx={{ textAlign: "center", fontSize: "2rem" }}>
          <span>Good {greeting}, Admin</span>
        </Typography>
        <Typography
          variant="overline"
          sx={{ textAlign: "center", fontSize: "1.5rem" , pt: 0, pb: 0}}
        >
          <p>
            {hours}:{minutes}:{seconds}
          </p>
        </Typography>
      </Box>
      <Box sx={{display: "flex", flexDirection: "row-reverse", justifyContent: "space-evenly", alignItems: "center", pb: 5}}>
        <Paper sx={{ width: "30%", height: "100%"}} elevation={2}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <Typography variant="h3" color="primary" sx={{ textAlign: "right" }}>
              {Number(findDeposits.length) + Number(findTransfers.length)/2 + Number(findWithdrawals.length)}
            </Typography>
            <Typography
              variant="overline"
              gutterBottom
              sx={{ textAlign: "right" }}
            >
              <p>Total Transactions</p>
            </Typography>
          </Box>
          <Divider orientation="horizontal" />
          <Box sx={{ pt: 1, pr: 2 }}>
            <Typography variant="h3" color="primary" sx={{ textAlign: "right" }}>
              {userList.length}
            </Typography>
            <Typography
              variant="overline"
              gutterBottom
              sx={{ textAlign: "right", p: 0 }}
            >
              <p>Total Users</p>
            </Typography>
          </Box>
        </Paper>
        <Paper sx={{width: "45%", height: "auto", pb: 2, pt: 1}} elevation={2}> 
          <Typography variant="overline" sx={{textAlign: "center", pl: 1}}>
              Transaction type
          </Typography>
          <PieChart 
            colors={["#c62828", 'black', 'lightgrey']}
            series={[
              {
                data: [
                  {id: 0, label: 'Deposits', value: findDeposits.length},
                  {id: 1, label: 'Withdrawls', value: findWithdrawals.length},
                  {id: 2, label: 'Transfers', value: findTransfers.length/2}
                ],
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
              },
            ]}
            width={400}
            height={200}
            sx={{pt:1}}       
            />
        </Paper>
      </Box>
      
      <GetTime />
    </Paper>
  );
}
