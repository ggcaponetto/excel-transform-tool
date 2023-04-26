import React, { useState } from "react";
import "@pages/popup/Popup.css";
import Home from "@pages/popup/components/home/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import PopupContext from "./components/context/popup-context";
import { themes } from "@pages/popup/components/settings/Settings";
import * as log from "loglevel";
import process from "process";

const isLogsEnabled = true;
if (process.env.VITE_ENV === "development" && isLogsEnabled) {
  log.setLevel(log.levels.DEBUG);
} else {
  log.setLevel(log.levels.WARN);
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function MUITheme(props) {
  const [theme, setTheme] = useState(themes.dark);
  return (
    <PopupContext.Provider
      value={{
        setTheme: (newTheme) => {
          log.debug("setting theme to", newTheme);
          setTheme(newTheme);
        },
      }}
    >
      <ThemeProvider theme={theme.name === "dark" ? darkTheme : lightTheme}>
        {/* The css baseline adds a black background to the body. We don't want that. */}
        <ScopedCssBaseline style={{ height: "100%" }}>
          {/* eslint-disable-next-line react/prop-types */}
          {props.children}
        </ScopedCssBaseline>
      </ThemeProvider>
    </PopupContext.Provider>
  );
}

function Popup() {
  return (
    <div className="App" style={{ padding: 0 }}>
      <MUITheme>
        <Home />
      </MUITheme>
    </div>
  );
}

export default Popup;
