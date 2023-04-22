import React from "react";
import "@pages/popup/Popup.css";
import Home from "@pages/popup/components/home/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";

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
  return (
    <ThemeProvider theme={darkTheme}>
      {/* The css baseline adds a black background to the body. We don't want that. */}
      <ScopedCssBaseline style={{ height: "100%" }}>
        {/* eslint-disable-next-line react/prop-types */}
        {props.children}
      </ScopedCssBaseline>
    </ThemeProvider>
  );
}
const Popup = () => {
  return (
    <div className="App" style={{ padding: 0 }}>
      <MUITheme>
        <Home />
      </MUITheme>
    </div>
  );
};

export default Popup;
