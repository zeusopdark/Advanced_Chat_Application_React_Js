import React from "react";
import AdminLayout from "./AdminLayout";
import { Box, Container, Paper, Skeleton, Stack, Typography } from "@mui/material";
import {
  AdminPanelSettings,
  Group,
  Message,
  Notifications,
  Person,
} from "@mui/icons-material";
import moment from "moment";
import {
  CurveButton,
  SearchField,
} from "../../components/styles/StyledComponent";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";
import { useAdminDashBoardDataQuery } from "../../redux/api/api";
import { LayoutLoader } from "../../components/layout/Loaders";
import { useErrors } from "../../hooks/hook";
const DashBoard = () => {
  const { data, error, isError, isLoading } = useAdminDashBoardDataQuery();
  const statsData = data?.stats;
  useErrors([{ error, isError }]);
  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        margin: "3rem 0rem",
        padding: "2rem",
        borderRadius: "1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettings sx={{ fontSize: "3rem" }} />
        <SearchField placeholder="Search..." />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography
          sx={{
            display: {
              md: "none",
              lg: "block",
            },
          }}
        >
          {moment().format("dddd, D MMMM YYYY")}
        </Typography>
        <Notifications />
      </Stack>
    </Paper>
  );
  const Widgets = (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent={"space-between"}
      alignItems={"center"}
      margin={"2rem 0"}
      gap={"2rem"}
    >
      <Widget title={"Users"} value={statsData?.usersCount} icon={<Person />} />
      <Widget
        title={"Chats"}
        value={statsData?.groupsCount}
        icon={<Group />}
      />
      <Widget
        title={"Messages"}
        value={statsData?.messagesCount}
        icon={<Message />}
      />
    </Stack>
  );

  return isLoading ? (
    <LayoutLoader />
  ) : (
    <AdminLayout>
      <Container component={"main"}>
        {Appbar}
        <Stack
          direction={{
            xs: "column",
            lg: "row",
          }}
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={{
            sm: "center",
            lg: "stretch",
          }}
          sx={{ gap: "2rem" }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "45rem",
            }}
          >
            <Typography variant="h4" margin={"2rem 0"}>
              Last Messages
            </Typography>
            <LineChart value={statsData?.messagesChart || []} />
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              position: "relative",
              width: "100%",
              maxWidth: "25rem",
            }}
          >
            <DoughnutChart
              labels={["Single Chats", "Group Chats"]}
              value={[
                statsData?.totalChatsCount - statsData?.groupsCount || 0,
                statsData?.groupsCount,
              ]}
            />
            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <Group />
              <Typography>Vs</Typography>
              <Person />
            </Stack>
          </Paper>
        </Stack>
        {Widgets}
      </Container>
    </AdminLayout>
  );
};
const Widget = ({ title, value, icon }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1.5rem",
        width: "20rem",
      }}
    >
      <Stack alignItems={"center"} spacing={"1rem"}>
        <Typography
          sx={{
            color: "rgba(0,0,0,0.7)",
            borderRadius: "50%",
            border: "5px solid rgba(0,0,0,0.9)",
            width: "5rem",
            height: "5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {value}
        </Typography>
        <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
          {icon}
          <Typography>{title}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default DashBoard;
