import React from "react";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useInputValidation } from "6pp";
import { Navigate } from "react-router-dom";
const AdminLogin = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const secretKey = useInputValidation("");
  const isAdmin = true;
  if (isAdmin) return <Navigate to="/admin/dashboard" />;
  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, rgba(9,9,121,1) 10%, rgba(0,212,255,1) 39%, rgba(13,81,134,1) 85%)",
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <>
            <Typography variant="h5">Admin Login</Typography>
            <form
              style={{ width: "100%", marginTop: "1rem" }}
              onSubmit={submitHandler}
            >
              <TextField
                required
                fullWidth
                label="SecretKey"
                type="password"
                value={secretKey.value}
                onChange={secretKey.changeHandler}
                margin="normal"
                variant="outlined"
              />
              <Button
                variant="contained"
                fullWidth
                color="primary"
                type="submit"
              >
                Login
              </Button>
            </form>
          </>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
