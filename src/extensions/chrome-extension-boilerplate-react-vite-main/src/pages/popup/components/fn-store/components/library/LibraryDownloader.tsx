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
          When you load the Community Functions library, any functions you have
          created locally will not be replaced, even if there are functions with
          the same name. If there is a name clash, you can simply rename your
          local function and reload the library to import it again.
        </Typography>
        <Box style={{ marginTop: "30px" }} />
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
          <Button
            style={{ marginLeft: "15px" }}
            onClick={onClose}
            variant={"contained"}
            color="secondary"
          >
            Maybe later
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
