import React, { useContext, useEffect, useState } from "react";
import Store from "../store/store";
import { Typography } from "@mui/material";
import PopupContext from "@pages/popup/components/context/popup-context";
import * as log from "loglevel";
import "./Functions.css";
const ll = log.getLogger("Functions");

import process from "process";
import FnStore from "@pages/popup/components/fn-store/FnStore";

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
const Functions = () => {
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
  return (
    <div className="Functions" style={{ padding: 0 }}>
      <FnStore />
    </div>
  );
};

export default Functions;
