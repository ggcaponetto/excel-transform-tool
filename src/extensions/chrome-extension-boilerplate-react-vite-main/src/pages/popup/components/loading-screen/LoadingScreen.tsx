import { Box, LinearProgress, Typography } from "@mui/material";
import React from "react";
import "./LoadingScreen.css";
import logo from "@assets/img/Logo-cropped.png";
import packageJson from "../../../../../package.json";
export default function LoadingScreen(props) {
  const lines = props.lines || 10;
  const array = Array.from(Array(lines).keys());
  const shorteningAmount = props.shorteningAmount || 10;
  const imageScale = props.imageScale || 1;
  return (
    <div className={"LoadingScreen"} style={{ ...(props.styleOverride || {}) }}>
      <div className={"container"}>
        {array
          .map((index) => {
            return (
              <>
                <Box style={{ marginTop: "15px" }}></Box>
                <LinearProgress
                  style={{ width: `${100 - index * shorteningAmount}%` }}
                ></LinearProgress>
              </>
            );
          })
          .reverse()}
        <img
          src={logo}
          style={{
            maxHeight: imageScale * 100 + "%",
            maxWidth: "160px",
          }}
        />
        <Typography variant={"body1"}>Excel Transform Toolkit</Typography>
        <Typography
          variant={"body1"}
          style={{ fontSize: "small", opacity: 0.5 }}
        >
          Version {packageJson.version}
        </Typography>
        {array.map((index) => {
          return (
            <>
              <LinearProgress
                style={{ width: `${100 - index * shorteningAmount}%` }}
              ></LinearProgress>
              <Box style={{ marginTop: "15px" }}></Box>
            </>
          );
        })}
      </div>
    </div>
  );
}
