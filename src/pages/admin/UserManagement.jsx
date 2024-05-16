import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import Table from "../../components/shared/Table";
import { dashboardData } from "../../constants/sampledata";
import { transformImage } from "../../lib/features";
import { Avatar } from "@mui/material";
const UserManagement = () => {
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
      renderCell: (params) => (
        <Avatar alt={params.row.name} src={params.row.avatar} />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "table-header",
      width: 200,
    },
    {
      field: "username",
      headerName: "Username",
      headerClassName: "table-header",
      width: 200,
    },
    {
      field: "friends",
      headerName: "Friends",
      headerClassName: "table-header",
      width: 200,
    },
    {
      field: "group",
      headerName: "Group",
      headerClassName: "table-header",
      width: 200,
    },
  ];
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(
      dashboardData.users.map((i) => ({
        ...i,
        id: i._id,
        avatar: transformImage(i.avatar, 50),
      }))
    );
  }, []);
  return (
    <AdminLayout>
      <Table heading={"All Users"} columns={columns} rows={rows} />
    </AdminLayout>
  );
};

export default UserManagement;
