import React, { useState } from "react";
import "@pages/popup/Popup.css";
import Home from "@pages/popup/components/home/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import PopupContext from "./components/context/popup-context";
import { themes } from "@pages/popup/components/settings/Settings";
import * as log from "loglevel";
const ll = log.getLogger("Popup.tsx");
import process from "process";
import ExtPay from "extpay";

const isLogsEnabled = false;
if (process.env.VITE_ENV === "development" && isLogsEnabled) {
  ll.setLevel(log.levels.DEBUG);
} else {
  ll.setLevel(log.levels.WARN);
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#217345",
    },
    secondary: {
      main: "#ce93d8",
    },
    info: {
      main: "#a5d6a7",
    },
    success: {
      main: "#80deea",
    },
  },
});
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#217345",
    },
    secondary: {
      main: "#ce93d8",
    },
    info: {
      main: "#a5d6a7",
    },
    success: {
      main: "#80deea",
    },
  },
});

function MUITheme(props) {
  const [theme, setTheme] = useState(themes.dark);
  const [data, setData] = useState({});
  return (
    <PopupContext.Provider
      value={{
        setTheme: (newTheme) => {
          ll.debug("setting theme to", newTheme);
          setTheme(newTheme);
        },
        data,
        setData,
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
