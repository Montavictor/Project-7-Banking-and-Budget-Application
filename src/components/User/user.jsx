import { useState } from "react";
import { Grid, Typography, Box, Paper } from "@mui/material";

function Users() {
    const users = JSON.parse(localStorage.getItem('bankUsers'))
    const findTransactions = 
    users.flatMap(user => 
        user.transactions.map(
        t => ({
            ...t, 
            user: user.name})))
    return (
        <Box>
            <Paper sx={{p:2,maxWidth:"200px", height:"100px", display:"flex", alignItems: "center", gap:"2", backgroundColor:"khaki"}} elevation={6} >
                <Typography 
                variant="overline"
                gutterBottom
                >Total Activities:</Typography>
                <br/>
                <Typography 
                variant="h4"
                color="primary">{findTransactions.length}</Typography>
            </Paper>
            <Paper sx={{p:2,maxWidth:"200px", height:"100px", display:"flex", alignItems: "center", gap:"2", backgroundColor:"khaki"}}>
                <Typography variant="overline" gutterBottom>Total Users:</Typography>
                <Typography variant="h4" >{users.length}</Typography>
            </Paper>
        </Box>
    )
}
export default Users;