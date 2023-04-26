import React, { useState } from "react";
import "@pages/popup/Popup.css";
import Home from "@pages/popup/components/home/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import PopupContext from "./components/context/popup-context";
import { themes } from "@pages/popup/components/settings/Settings";
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
          console.log("setting theme to", newTheme);
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
