import { Box, LinearProgress, Typography } from "@mui/material";
import React from "react";
import "./LoadingScreen.css";
import logo from "./../../assets/img/Logo-cropped.png";
import packageJson from "../../../package.json";
export default function LoadingScreen(props) {
  const lines = 10;
  const array = Array.from(Array(lines).keys());
  const shorteningAmount = 10;
  return (
    <div className={"LoadingScreen"}>
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
          style={{ width: "100%", maxWidth: "160px", marginTop: "-30px" }}
        />
        <Typography variant={"body1"} style={{ marginTop: "-40px" }}>
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
