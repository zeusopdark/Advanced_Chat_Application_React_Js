import React from "react";
import AppLayOut from "../components/layout/AppLayOut";
import { Box, Typography } from "@mui/material";
import { grayColor } from "../constants/color";

const Home = () => {
  return (
    <Box bgcolor={grayColor} height={"100%"}>
      <Typography textAlign={"center"} p={"2rem"} variant="h5">
        Select a friend to Chat
      </Typography>
    </Box>
  );
};

export default AppLayOut()(Home);
