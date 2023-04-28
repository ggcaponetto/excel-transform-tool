import React, { useContext, useEffect, useRef, useState } from "react";
import * as log from "loglevel";
import "./LibraryDownloader.css";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";

const ll = log.getLogger("LibraryDownloader");
import process from "process";
import { Box } from "@mui/material";

const isLogsEnabled = true;
if (process.env.VITE_ENV === "development" && isLogsEnabled) {
  ll.setLevel(log.levels.DEBUG);
} else {
  ll.setLevel(log.levels.WARN);
}

function SimpleDialog(props) {
  const { onClose, open, onLoad } = props;
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >{`Load the Community's Functions Library`}</DialogTitle>
      <Box style={{ margin: "15px" }}>
        <Typography variant={"body1"}>
          Loading the Community Functions library will not overwrite your local
          functions, should there be a name clash. In case of name clashing, you
          can rename your local function and import the library again.
        </Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={async () => {
              ll.debug("onLoad clicked");
              await onLoad();
            }}
            variant={"contained"}
          >
            Load
          </Button>
        </div>
      </Box>
    </Dialog>
  );
}

export default function LibraryDownloader(props) {
  return (
    <SimpleDialog onClose={props.onClose} onLoad={props.onLoad} open={true} />
  );
}
