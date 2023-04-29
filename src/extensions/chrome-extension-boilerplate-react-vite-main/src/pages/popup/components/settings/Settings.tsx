import React, { useContext, useEffect, useState } from "react";
import Store from "../store/store";
import { Box, Button, Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import PopupContext from "@pages/popup/components/context/popup-context";
import * as log from "loglevel";
import "./Settins.css";
import Divider from "@mui/material/Divider";
import process from "process";
import FnStore from "@pages/popup/components/fn-store/FnStore";
import ExtPay from "extpay";
const extpay = ExtPay(process.env.VITE_EXTENSIONPAY_ID);
const ll = log.getLogger("Settings");

const isLogsEnabled = false;
if (process.env.VITE_ENV === "development" && isLogsEnabled) {
  ll.setLevel(log.levels.DEBUG);
} else {
  ll.setLevel(log.levels.WARN);
}

const store = new Store("transform-settings", "settings", {
  keyPath: "type",
});

export const themes = {
  dark: {
    type: "theme",
    name: "dark",
    value: "dark",
  },
  light: {
    type: "theme",
    name: "light",
    value: "light",
  },
};
const Settings = () => {
  const defaultTheme = themes.dark;
  const [theme, setTheme] = useState(defaultTheme);
  const [db, setDb] = useState(null);
  const popupContext = useContext(PopupContext);
  useEffect(() => {
    (async () => {
      const dbInstance = await store.open((objectStore) => {
        ll.debug("creating store indices for the settings component");
        objectStore.createIndex("type", "type", { unique: false });
        objectStore.createIndex("name", "name", { unique: true });
        objectStore.createIndex("value", "value", { unique: false });
      });
      ll.debug("settings have been loaded");
      /* get the stored theme setting */
      const storedTheme = await store.get("theme");
      setTheme(storedTheme || defaultTheme);
      setDb(dbInstance);
    })();
  }, []);
  useEffect(() => {
    ll.debug("theme changes, storing to indexeddb", theme);
    (async () => {
      if (theme && db) {
        await store.write([theme]);
        popupContext.setTheme(theme);
      }
    })();
  }, [theme, db]);
  const onThemeChange = (e) => {
    ll.debug("onThemeChange", e);
    const isChecked = e.target.checked;
    /* store the theme into the settings/localstorage */
    (async () => {
      let newTheme;
      if (isChecked) {
        newTheme = themes.light;
      } else {
        newTheme = themes.dark;
      }
      setTheme(newTheme);
    })();
  };
  return (
    <div className="Settings" style={{ padding: 0 }}>
      <Typography variant={"h6"}>Theme</Typography>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FormGroup
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Dark
          <Switch
            checked={theme.name === "light" ? true : false}
            onChange={onThemeChange}
          />
          Light
        </FormGroup>
      </div>
      <Box style={{ marginTop: "30px" }}></Box>
      <div>
        <Typography variant={"h6"}>Plan and Billing</Typography>
        <Box style={{ marginTop: "10px" }}></Box>
        {(() => {
          if (popupContext?.data?.user?.email !== undefined) {
            return (
              <div>Licensed to: {popupContext?.data?.user?.email || "N/A"}</div>
            );
          }
        })()}
        <div>
          Current plan:{" "}
          {popupContext?.data?.user?.paid === true ? "Pro" : "Free"}
        </div>
        <Box style={{ marginTop: "10px" }}></Box>
        <Button variant={"contained"} onClick={extpay.openPaymentPage}>
          Upgrade to Pro
        </Button>
      </div>
    </div>
  );
};

export default Settings;
