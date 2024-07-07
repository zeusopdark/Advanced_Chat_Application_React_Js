import {
  Close,
  Dashboard,
  Groups,
  Logout,
  ManageAccounts,
  Menu,
  Message,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, Link as LinkComponent } from "react-router-dom";
import { grayColor, matBlack } from "../../constants/color";
import axios from "axios";
import { server } from "../../constants/config";
import { useDispatch } from "react-redux";
import { adminNotExists } from "../../redux/reducers/auth";
import toast from "react-hot-toast";
const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;
const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <Dashboard />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <ManageAccounts />,
  },
  {
    name: "Chats",
    path: "/admin/chats",
    icon: <Groups />,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <Message />,
  },
];
const SideBar = ({ w = "100%" }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(
        `${server}/api/v1/admin/logout`,
        { withCredentials: true },
        { headers: { "Content-Type": "application/json" } }
      );
      if (data?.success) dispatch(adminNotExists());
      toast.success(data?.message);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } 
  };
  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant="h5" textTransform={"uppercase"}>
        ChatApp
      </Typography>
      <Stack spacing={"1rem"}>
        {adminTabs.map((tab, index) => (
          <>
            <Link
              key={index}
              to={tab.path}
              sx={
                location.pathname === tab.path && {
                  bgcolor: matBlack,
                  color: "white",
                  ":hover": { color: grayColor },
                }
              }
            >
              <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                {tab.icon}
                <Typography>{tab.name}</Typography>
              </Stack>
            </Link>
          </>
        ))}
        <Link onClick={logoutHandler}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <Logout />
            <Typography>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleClose = (e) => {
    setIsMobile(!isMobile);
  };
  const handleMobile = (e) => {
    setIsMobile(!isMobile);
  };
  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <Close /> : <Menu />}
        </IconButton>
      </Box>

      <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
        <SideBar />
      </Grid>

      <Grid item xs={12} md={8} lg={9} sx={{ bgcolor: "#f5f5f5" }}>
        {children}
      </Grid>

      <Drawer open={isMobile} onClose={handleClose}>
        <SideBar w="50vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
