import { Avatar, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import AvatarCard from "../../components/layout/AvatarCard";
import Table from "../../components/shared/Table";
import { chatData } from "../../constants/sampledata";
import { transformImage } from "../../lib/features";
import AdminLayout from "./AdminLayout";
const ChatManagement = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "table-header",
      width: 200,
    },
    {
      field: "avatar",
      headerName: "Avatar",
      headerClassName: "table-header",
      width: 200,
      renderCell: (params) => <AvatarCard avatar={params.row.avatar} />,
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "table-header",
      width: 300,
    },
    {
      field: "totalMembers",
      headerName: "Total Members",
      headerClassName: "table-header",
      width: 120,
    },
    {
      field: "members",
      headerName: "Members",
      headerClassName: "table-header",
      width: 400,
      renderCell: (params) => (
        <AvatarCard max={100} avatar={params.row.members} />
      ),
    },
    {
      field: "totalMessages",
      headerName: "Total Messages",
      headerClassName: "table-header",
      width: 200,
    },
    {
      field: "creator",
      headerName: "Created By",
      headerClassName: "table-header",
      width: 400,
      renderCell: (params) => (
        <Stack direction={"row"} alignItems={"center"} spacing={"1"}>
          <Avatar
            max={100}
            src={params.row.creator.avatar}
            alt={params.row.creator.name}
          />
          <span>{params.row.creator.name}</span>
        </Stack>
      ),
    },
  ];
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(
      chatData.chats.map((i) => ({
        ...i,
        id: i._id,
        avatar: i.avatar.map((p) => transformImage(p, 50)),
        members: i.members.map((p) => transformImage(p.avatar, 50)),
        creator: {
          name: i.creator.name,
          avatar: transformImage(i.creator.avatar, 50),
        },
      }))
    );
  }, []);
  return (
    <AdminLayout>
      <Table heading={"All Chats"} columns={columns} rows={rows} />
    </AdminLayout>
  );
};

export default ChatManagement;
