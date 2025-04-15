import {useState} from 'react';
import Box from '@mui/material/Box';



export default function Dashboard () {
    const [userList, setUserList] = useState(() => {
        return JSON.parse(localStorage.getItem("bankUsers") || []);
    })

    return (
        <Box></Box>
    )
}