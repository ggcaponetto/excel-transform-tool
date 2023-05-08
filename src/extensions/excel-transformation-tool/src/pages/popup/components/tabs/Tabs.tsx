import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./Tabs.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import logo from "@assets/img/Logo-cropped-light.png";
import logoDark from "@assets/img/Logo-cropped-dark.png";
import logoLight from "@assets/img/Logo-cropped-light.png";
import { useContext } from "react";
import PopupContext from "@pages/popup/components/context/popup-context";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);
  const popupContext = useContext(PopupContext);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider" }}
        className={"header-container"}
      >
        <IconButton
          onClick={() => {
            window.open("https://excel-transformation-tool.com/", "_blank");
          }}
        >
          <img
            src={popupContext?.theme?.name === "light" ? logoDark : logoLight}
            style={{
              maxHeight: 1 * 100 + "%",
              maxWidth: "30px",
            }}
          />
        </IconButton>
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {(() => {
            return props.titles.map((title, titleIndex) => {
              return (
                <Tab
                  key={JSON.stringify({ title, titleIndex })}
                  label={title}
                  {...a11yProps(titleIndex)}
                  className={"custom-tab-title"}
                />
              );
            });
          })()}
        </Tabs>
      </Box>
      {(() => {
        return props.components.map((component, componentIndex) => {
          return (
            <div
              key={JSON.stringify(component, componentIndex)}
              className={"custom-tab"}
              style={{ display: value === componentIndex ? "flex" : "none" }}
            >
              <TabPanel value={componentIndex} index={componentIndex}>
                {component}
              </TabPanel>
            </div>
          );
        });
      })()}
    </Box>
  );
}
