import React, { useEffect, useState } from "react";
import Store from "../store/store";
import { Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const store = new Store("ett-plugin", "settings", {
  keyPath: "id",
});
const Settings = () => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    /*(async () => {
      const db = await store.open((objectStore) => {
        console.log("creating store indices for the settings component");
        objectStore.createIndex("name", "name", { unique: false });
        objectStore.createIndex("value", "value", { unique: false });
      });
      console.log("settings have been loaded");
    })();*/
  }, []);
  const onThemeChange = (e) => {
    console.log("onThemeChange", e);
    setChecked(e.target.checked);
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
        <FormGroup>
          <Switch checked={checked} onChange={onThemeChange} />
        </FormGroup>
      </div>
    </div>
  );
};

export default Settings;
