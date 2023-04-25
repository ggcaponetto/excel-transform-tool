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
          {/* eslint-disable-next-line react/prop-types */}
          <Tab label={props.titles[0]} {...a11yProps(0)} />
          {/* eslint-disable-next-line react/prop-types */}
          <Tab label={props.titles[1]} {...a11yProps(1)} />
          {/* eslint-disable-next-line react/prop-types */}
          <Tab label={props.titles[2]} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {/* eslint-disable-next-line react/prop-types */}
        {props.components[0]}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* eslint-disable-next-line react/prop-types */}
        {props.components[1]}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* eslint-disable-next-line react/prop-types */}
        {props.components[2]}
      </TabPanel>
    </Box>
  );
}
