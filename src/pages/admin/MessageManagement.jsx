import { Avatar, Box, Stack } from "@mui/material";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import RenderAttachments from "../../components/shared/RenderAttachments";
import Table from "../../components/shared/Table";
import { fileFormat, transformImage } from "../../lib/features";
import { useAdminMessageDataQuery } from "../../redux/api/api";
import AdminLayout from "./AdminLayout";
import { useErrors } from "../../hooks/hook";

const MessageManagement = () => {
  const{data,isError,error,isLoading}=useAdminMessageDataQuery();
  useErrors([{isError,error}]);
  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        headerClassName: "table-header",
        width: 200,
      },
      {
        field: "attachments",
        headerName: "Attachments",
        headerClassName: "table-header",
        width: 200,
        renderCell: (params) => {
          const { attachments } = params.row;
          return attachments?.length > 0
            ? attachments.map((i, index) => {
                const url = i.url;

                const file = fileFormat(url);
                console.log(file);
                return (
                  <Box key={index}>
                    <a
                      href={url}
                      download
                      style={{
                        color: "black",
                      }}
                    >
                      {<RenderAttachments file={file} url={url} />}
                    </a>
                  </Box>
                );
              })
            : "No Attachments";
        },
      },
      {
        field: "content",
        headerName: "Content",
        headerClassName: "table-header",
        width: 400,
      },
      {
        field: "sender",
        headerName: "Sent By",
        headerClassName: "table-header",
        width: 200,
        renderCell: (params) => (
          <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
            <Avatar
              alt={params.row.sender.name}
              src={params.row.sender.avatar}
            />
            <span>{params.row.sender.name}</span>
          </Stack>
        ),
      },
      {
        field: "chat",
        headerName: "Chat",
        headerClassName: "table-header",
        width: 220,
      },
      {
        field: "groupChat",
        headerName: "Group Chat",
        headerClassName: "table-header",
        width: 100,
      },
      {
        field: "createdAt",
        headerName: "Time",
        headerClassName: "table-header",
        width: 100,
      },
    ],
    []
  );

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if(data){
      setRows(
        data.messages.map((i) => ({
         ...i,
         id: i._id,
         sender: {
           name: i.sender.name,
           avatar: transformImage(i.sender.avatar, 50),
         },
         createdAt: moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
       }))
     );
    }
 
  }, [data,isError,isLoading]);

  return (
    <AdminLayout>
      <Table
        rowHeight={200}
        heading={"All Messages"}
        columns={columns}
        rows={rows}
      />
    </AdminLayout>
  );
};

export default MessageManagement;
