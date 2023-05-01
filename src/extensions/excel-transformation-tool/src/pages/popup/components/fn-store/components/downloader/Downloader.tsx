import React from "react";
import { Button, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import SaveIcon from "@mui/icons-material/Save";

function SaveToFileButton({ data, fileName }) {
  const handleClick = () => {
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Tooltip title="Downloads the functions to a local .json file">
      <IconButton
        style={{
          display: "flex",
        }}
        onClick={handleClick}
      >
        <SaveIcon />
      </IconButton>
    </Tooltip>
  );
}

export default SaveToFileButton;
