import { Box, LinearProgress, Typography } from "@mui/material";
import React, { useContext } from "react";
import "./LoadingScreen.css";
import logoLight from "@assets/img/Logo-light.png";
import logoDark from "@assets/img/Logo-dark.png";

import packageJson from "../../../../../package.json";
import PopupContext from "@pages/popup/components/context/popup-context";
export default function LoadingScreen(props) {
  const popupContext = useContext(PopupContext);
  const imageScale = props.imageScale || 1;
  return (
    <div className={"LoadingScreen"} style={{ ...(props.styleOverride || {}) }}>
      <img
        src={popupContext?.theme?.name === "light" ? logoDark : logoLight}
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
