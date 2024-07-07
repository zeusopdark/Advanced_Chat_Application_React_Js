import React from "react";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useInputValidation } from "6pp";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminExists } from "../../redux/reducers/auth";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
const AdminLogin = () => {
  const dispatch=useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };
    try {
      const { data } = await axios.post(
        `${server}/api/v1/admin/verify`,
        { secretKey: secretKey.value },
        config
      );
      if (data?.success) dispatch(adminExists());
      toast.success(data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  const secretKey = useInputValidation("");
  const { isAdmin } = useSelector((state) => state.auth);
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
