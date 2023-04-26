import React, { useContext, useEffect, useState } from "react";
import Store from "../store/store";
import { Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import PopupContext from "@pages/popup/components/context/popup-context";

const store = new Store("ett-settings", "settings", {
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
        console.log("creating store indices for the settings component");
        objectStore.createIndex("type", "type", { unique: false });
        objectStore.createIndex("name", "name", { unique: true });
        objectStore.createIndex("value", "value", { unique: false });
      });
      console.log("settings have been loaded");
      /* get the stored theme setting */
      const storedTheme = await store.get("theme");
      setTheme(storedTheme || defaultTheme);
      setDb(dbInstance);
    })();
  }, []);
  useEffect(() => {
    console.log("theme changes, storing to indexeddb", theme);
    (async () => {
      if (theme && db) {
        await store.write([theme]);
        popupContext.setTheme(theme);
      }
    })();
  }, [theme, db]);
  const onThemeChange = (e) => {
    console.log("onThemeChange", e);
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
    </div>
  );
};

export default Settings;
