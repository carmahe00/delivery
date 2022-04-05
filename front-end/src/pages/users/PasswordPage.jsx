import React from "react";
import {
  Box,
  Grid,
  Avatar,
  Typography,
  Paper,
} from "@mui/material";
import { LockClockOutlined as LockOutlinedIcon } from '@mui/icons-material'
import FormPassword from "../../components/FormPassword";

function PasswordPage() {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item xs sm md elevation={6} component={Paper} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, height: 50, width: 50 }} variant="square" sizes="small"  >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            CAMBIO DE CLAVE
          </Typography>
          <Box sx={{ mt: 1 }}>
            <FormPassword />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default PasswordPage;
