import React from "react";
import { transformImage } from "../../lib/features";
import { FileOpen } from "@mui/icons-material";

const RenderAttachments = ({ file, url }) => {
  switch (file) {
    case "video":
      return <video src={url} preload="none" width={"200px"} controls />;

    case "image":
      const transformedUrl = transformImage(url, 200);
      return (
        <img
          src={transformedUrl}
          alt="Attachment"
          height={"50px"}
          width={"60px"}
          style={{ objectFit: "contain" }}
        />
      );

    case "audio":
      return <audio src={url} preload="none" controls />;

    default:
      return <FileOpen />;
  }
};

export default RenderAttachments;
