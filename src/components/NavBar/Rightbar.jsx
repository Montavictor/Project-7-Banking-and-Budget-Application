import { Paper, Typography, Stack, Divider, IconButton } from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useState } from "react";
import backgroundSvg from "../assets/rose-petals.svg";
import SettingsIcon from "@mui/icons-material/Settings";
import EmailIcon from "@mui/icons-material/Email";

export default function Rightbar() {
  const [time, setTime] = useState(updateTime());
  const [date, setDate] = useState(updateDate());
  function updateTime() {
    const now = new Date();
    let hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes();
    let meridiem = "";
    setMeridiem();
    function setMeridiem() {
      if (now.getHours() >= 12) {
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
    const month = now.getMonth();
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
    <Stack
      direction={"column"}
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "flex-start",
        mt: 1,
        alignItems: "center",
        gap: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          backgroundImage: `url(${backgroundSvg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          maxHeight: "140px",
          width: "95%",
          borderRadius: 0,
          display: "flex",

          justifyContent: "center",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          direction={"column"}
          gap={0}
          alignSelf={"center"}
        >
          <Typography
            color="#fafafa"
            variant="h4"
            sx={{
              mt: "10px",
              fontWeight: "450",
              textAlign: "center",
              justifySelf: "center",
            }}
          >
            {time}
          </Typography>
          <Typography
            color="#fafafa"
            variant="overline"
            textAlign={"center"}
            sx={{
              fontWeight: "400",
              justifySelf: "center",
            }}
          >
            {date}
          </Typography>
          <Divider
            sx={{
              mt: "auto",
              width: "100%",
              background: "lightgrey",
              justifySelf: "flex-end",
            }}
          />
          <Stack
            direction={"row"}
            color={"#fafafa"}
            justifyContent={"space-around"}
            width={"100%"}
          >
            <IconButton>
              <AccessAlarmIcon sx={{ color: "#fafafa", fontSize: 20 }} />
            </IconButton>
            <IconButton>
              <NotificationsActiveIcon
                sx={{ color: "#fafafa", fontSize: 20 }}
              />
            </IconButton>
            <IconButton>
              <SettingsIcon sx={{ color: "#fafafa", fontSize: 20 }} />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
      <Stack
        component={Paper}
        elevation={6}
        direction={"row"}
        sx={{
          width: "95%",
          maxHeight: "140px",
          alignItems: "center",
          borderRadius: 0,
        }}
      >
        <EmailIcon sx={{ color: "primary.dark", fontSize: 50, p: 1 }} />
        <Divider orientation="vertical" flexItem />
        <Stack sx={{ p: 1 }}>
          <Typography
            fontSize={54}
            color="primary.dark"
            fontWeight={550}
            variant="h3"
          >
            4
          </Typography>
          <Typography fontSize={12} fontWeight={600} variant="overline">
            NEW MESSAGES
          </Typography>
          <Typography fontSize={11} color="primary.dark" variant="subtitle2">
            Bank Rupt
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
