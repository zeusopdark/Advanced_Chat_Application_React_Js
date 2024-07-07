import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LayoutLoader } from "../../components/layout/Loaders";
import Table from "../../components/shared/Table";
import { useErrors } from "../../hooks/hook";
import { transformImage } from "../../lib/features";
import { useAdminUserDetailsQuery } from "../../redux/api/api";
import AdminLayout from "./AdminLayout";
const UserManagement = () => {
  const { data, isError, error, isLoading } = useAdminUserDetailsQuery();
  const errors = [{ isError, error }];
  useErrors(errors);
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
      headerName: "Groups",
      headerClassName: "table-header",
      width: 200,
    },
  ];
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(
      !isLoading&&data?.users.map((i) => ({
        ...i,
        id: i._id,
        avatar: transformImage(i.avatar, 50),
        group: i.groups,
      }))
    );
  }, [data, isLoading, isError]);
  return isLoading ? (
    <LayoutLoader />
  ) : (
    <AdminLayout>
      <Table heading={"All Users"} columns={columns} rows={rows} />
    </AdminLayout>
  );
};

export default UserManagement;
