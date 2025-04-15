import {useEffect, useState} from 'react';
import {
    Box,
    Paper,
    Typography,
    Divider
} from '@mui/material';



export default function Dashboard () {
    const [seconds, setSeconds] = useState('0');
    const [minutes, setMinutes] = useState('0');
    const [hours, setHours] = useState('0');
    const [greeting, setGreeting] = useState('Evening')

    useEffect(() => {
        function setTime() {
            const now = new Date();
            setSeconds(now.getSeconds().toString());
            setMinutes(now.getMinutes().toString());
            setHours(now.getHours().toString());

            // if(Number(hours) >= 18) {
            //     setGreeting("Evening")
            // } else if (12 >= Number(hours) && Number(hours) > 0) {
            //     setGreeting("Morning")
            // } else {
            //     setGreeting("Afternoon")
            // }
        }
        setTime();
        const intervalId = setInterval(setTime, 1000);
        return () => clearInterval(intervalId);
    }, [])
    

    
    
    const userList = JSON.parse(localStorage.getItem("bankUsers") || []);
    
    const findTransactions = userList.flatMap(user =>
        user.transactions.map((t) => ({
            ...t,
            user: user.name,
        }))
    )
    return (
        <Paper
      elevation={4}
      sx={{
        maxWidth: "95%",
        height: "75%",
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
            <Typography variant="outline" color="#ffff" sx={{ fontWeight: 700, pt: 1, pl: 1}}>
                Dashboard
            </Typography>
            </Paper>
            <Box>
                <Typography sx={{textAlign:"center", fontSize: "3rem"}}>
                    <span>Good {greeting}, Admin</span>
                </Typography>
                <Typography variant='overline' sx={{textAlign:"center", fontSize: "3rem"}}>
                    <p>{hours}:{minutes}:{seconds}</p>
                </Typography>
            </Box>
            <p></p>
            <Paper sx={{width:"30%", mx:"auto"}} elevation={0}>
            <Box sx={{pt:1, pr: 2}}>
                <Typography variant="h3" color="primary" sx={{textAlign:"right"}}>
                    {findTransactions.length}
                </Typography>
                <Typography variant="overline" gutterBottom sx={{textAlign:"right"}}>
                    <p>Total Transactions</p>
                </Typography>
            </Box>
            <Divider orientation='horizontal' />
            <Box sx={{pt:1, pr: 2}}>
                <Typography variant="h3" color="primary" sx={{textAlign:"right"}}>
                    {userList.length}
                </Typography>
                <Typography variant="overline" gutterBottom sx={{textAlign:"right", p:0}}>
                    <p>Total Users</p>
                </Typography>
            </Box>
            </Paper>
        </Paper>
    )
}