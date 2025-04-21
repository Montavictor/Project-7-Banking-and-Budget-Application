import { useState } from "react";
import {
  Box,
  Divider,
  Paper,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupIcon from "@mui/icons-material/Group";
import SavingsIcon from "@mui/icons-material/Savings";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./user.css";

function Users() {
  const [users, setUsers] = useState(() => {
    const dataUsers = JSON.parse(localStorage.getItem("bankUsers") || "[]");
    console.log("Parsed users:", dataUsers);

    return dataUsers;
  });

  const recentUsers = [...users].sort(
    (a, b) => new Date(Number(b.dateCreated)) - new Date(Number(a.dateCreated))
  );
  const totalAmount = users.reduce(
    (sum, user) => sum + Number(user.balance),
    0
  );

  const amountFormat = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(totalAmount);

  const handleBalance = (num) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(num);
  };

  const handleDelete = (userDelete) => {
    const updateUsers = users.filter((user) => user !== userDelete);
    setUsers(updateUsers);
    localStorage.setItem("bankUsers", JSON.stringify(updateUsers));
  };

  const handleDate = (date) => {
    return new Date(Number(date)).toLocaleDateString();
  };

  const columns = [
    {
      field: "dateCreated",
      headerName: "ID",
      flex: 1,
      minWidth: 150,
      editable: false,
      background: "#c62828",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 250,
      editable: true,
      background: "#c62828",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      minWidth: 200,
      editable: true,
      background: "#c62828",
    },
    {
      field: "balance",
      headerName: "Balance",
      flex: 1.5,
      minWidth: 150,
      editable: false,
      background: "#c62828",
      valueFormatter: (params) =>
        new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(params),
    },
    {
      field: "actions",
      headerName: "",
      minWidth: 50,
      editable: false,
      filterable: false,
      sortable: false,
      background: "#c62828",
      renderCell: (params) => (
        <Stack>
          <IconButton
            onClick={() => handleDelete(params.row)}
            size="small"
            aria-label="delete"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];
  return (
    <Stack
      direction={"column"}
      sx={{
        mt: 4,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Stack
        direction={{
          sm: "column",
          md: "column",
          lg: "row",
        }}
        gap={2}
        sx={{ justifyContent: "center", mt: 1, alignItems: "center" }}
      >
        <Stack
          component={Paper}
          direction={"row"}
          elevation={6}
          sx={{ width: 220, height: 130, alignItems: "center", p: 1 }}
        >
          <GroupIcon sx={{ color: "primary.dark", fontSize: 70, p: 1 }} />
          <Divider orientation="vertical" flexItem />
          <Stack sx={{ p: 1 }}>
            <Typography
              fontSize={54}
              color="primary.dark"
              fontWeight={550}
              variant="h3"
            >
              {users.length}
            </Typography>
            <Typography fontSize={12} fontWeight={600} variant="overline">
              Current Users
            </Typography>
            <Typography fontSize={11} color="primary.dark" variant="subtitle2">
              in Bank Rupt
            </Typography>
          </Stack>
        </Stack>
        <Stack
          component={Paper}
          direction={""}
          elevation={6}
          sx={{ width: 290, height: 130, alignItems: "center", p: 1 }}
        >
          <SavingsIcon sx={{ color: "primary.dark", fontSize: 70, p: 1 }} />
          <Divider orientation="vertical" flexItem />
          <Stack sx={{ p: 1 }}>
            <Typography
              fontSize={20}
              color="primary.dark"
              fontWeight={550}
              variant="h6"
            >
              {amountFormat}
            </Typography>
            <Typography fontSize={12} fontWeight={600} variant="overline">
              Total Balance
            </Typography>
            <Typography fontSize={11} color="primary.dark" variant="subtitle2">
              in Bank Rupt
            </Typography>
          </Stack>
        </Stack>
        <Stack
          component={Paper}
          elevation={6}
          direction={"row"}
          sx={{ width: 220, height: 130, alignItems: "center", p: 1 }}
        >
          <GroupIcon sx={{ color: "primary.dark", fontSize: 70, p: 1 }} />
          <Divider orientation="vertical" flexItem />
          <Stack sx={{ p: 1 }}>
            <Typography
              fontSize={54}
              color="primary.dark"
              fontWeight={550}
              variant="h3"
            >
              121
            </Typography>
            <Typography fontSize={12} fontWeight={600} variant="overline">
              Placeholder
            </Typography>
            <Typography fontSize={11} color="primary.dark" variant="subtitle2">
              in Bank Rupt
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Box
        component={Paper}
        elevation={6}
        sx={{
          height: 450,
          width: "85%",
          mt: 3,
          bgcolor: "white",
        }}
      >
        <DataGrid
          sx={{
            "& .MuiDataGrid-cell": {
              color: "#444",
              fontSize: 15,
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#ffebee",
            },
            "& .MuiDataGrid-row.Mui-selected": {
              backgroundColor: "#d1c4e9",
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#c62828",
              color: "#fafafa",
              fontSize: 16,
              fontWeight: "bold",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "600",
            },
            "& .MuiDataGrid-columnHeadersTitleContainer": {
              backgroundColor: "#c62828 !important",
            },
            "& .MuiDataGrid-sortIcon": {
              color: "#fafafa",
              "&:hover": {
                background: "#d15353",
                opacity: 0.9,
                borderRadius: "50%",
              },
            },
            "& .MuiDataGrid-menuIconButton": {
              color: "#fafafa",
              "&:hover": {
                background: "#d15353",
                opacity: 0.9,
              },
            },
          }}
          rows={recentUsers}
          columns={columns}
          getRowId={(row) => row.dateCreated}
          components={{ Toolbar: GridToolbar }}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 25, 100]}
          processRowUpdate={(updateRow, oldRow) => {
            const updateRows = users.map((row) =>
              row.dateCreated === oldRow.dateCreated ? updateRow : row
            );
            setUsers(updateRows);
            localStorage.setItem("bankUsers", JSON.stringify(updateRows));
            return updateRow;
          }}
          onProcessRowUpdateError={(error) => {
            console.error("Update error", error);
          }}
        />
      </Box>
    </Stack>
  );
}
export default Users;
