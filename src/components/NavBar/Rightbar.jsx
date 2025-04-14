import { Paper, Box, Typography, Stack } from "@mui/material";
import { useState } from "react";
import backgroundSvg from "../assets/rose-petals.svg";
export default function Rightbar() {
  const [time, setTime] = useState(updateTime());
  const [date, setDate] = useState(updateDate());
  function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    let meridiem = "";
    setMeridiem();
    function setMeridiem() {
      if (hours >= 12) {
        meridiem = "PM";
      } else {
        meridiem = "AM";
      }
    }

    return `${hours}:${minutes} ${meridiem}`;
  }
  function updateDate() {
    const now = new Date();
    const day = now.getDay();
    const month = now.getMonth() + 1;
    const stringMonth = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const getMonth = stringMonth[month];
    const year = now.getFullYear();
    return `${getMonth} ${day}, ${year}`;
  }

  function updateAll() {
    updateDate();
    updateTime();
    setInterval(() => {
      setTime(updateTime());
    }, 30 * 1000);
    setInterval(() => {
      setDate(updateDate());
    }, 1000 * 60 * 60 * 6);
  }
  updateAll();
  return (
    <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <Paper
        elevation={4}
        sx={{
          backgroundImage: `url(${backgroundSvg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          maxHeight: "150px",
          width: "98%",
          borderRadius: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack direction={"column"}>
          <Typography
            color="#fafafa"
            variant="outlined"
            textAlign={"center"}
            sx={{ fontWeight: "550" }}
          >
            {date}
          </Typography>
          <Typography color="#fafafa" variant="h4" sx={{ fontWeight: "550" }}>
            {time}
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
