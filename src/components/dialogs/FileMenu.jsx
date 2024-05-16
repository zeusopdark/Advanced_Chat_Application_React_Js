import { Menu } from "@mui/material";
import React from "react";

const FileMenu = ({ anchorE1 }) => {
  return (
    <Menu anchorE1={anchorE1} open={false}>
      <div style={{ width: "10rem" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius amet culpa
        adipisci labore dignissimos, recusandae illo aperiam et, dolores
        laboriosam earum natus velit laudantium ullam, nobis quas enim fugit
        provident!
      </div>
    </Menu>
  );
};

export default FileMenu;
