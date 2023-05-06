import { Box, LinearProgress, Typography } from "@mui/material";
import React from "react";
import "./LoadingScreen.css";
import logoLight from "@assets/img/Logo.png";
import logoDark from "@assets/img/Logo-dark.png";

import packageJson from "../../../../../package.json";
export default function LoadingScreen(props) {
  const lines = props.lines;
  const array = Array.from(Array(lines).keys());
  const shorteningAmount = props.shorteningAmount || 10;
  const imageScale = props.imageScale || 1;
  return (
    <div className={"LoadingScreen"} style={{ ...(props.styleOverride || {}) }}>
      <img
        src={props?.theme?.name === "light" ? logoDark : logoLight}
        style={{
          maxHeight: imageScale * 100 + "%",
          maxWidth: "100%",
        }}
      />
      <Typography
        variant={"body1"}
        style={{ fontSize: "small", opacity: 0.5, marginTop: "15px" }}
      >
        Version {packageJson.version}
      </Typography>
    </div>
  );
}
