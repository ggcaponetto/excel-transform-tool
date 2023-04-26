import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
              style={{ display: value === componentIndex ? "block" : "none" }}
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
