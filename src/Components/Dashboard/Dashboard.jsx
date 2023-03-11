import { AppBar, Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AdminProperties from "../Properties/AdminProperties";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Reviews from "../Admin/Reviews";
import Banners from "../Admin/Banners";
import UploadBanners from "../Admin/UploadBanners";

const Dashboard = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fff",
          mt: 1,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          aria-label="basic tabs example"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTabs-flexContainer": {
              justifyContent: "space-evenly",
            },
          }}
        >
          <Tab label="Properties" {...a11yProps(0)} />
          <Tab label="Reviews" {...a11yProps(1)} />
          <Tab label="Banners" {...a11yProps(2)} />
          <Tab label="Upload Images" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Box
          sx={{
            mt: 3,
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              navigate("/property");
            }}
          >
            Create Property
          </Button>

          <AdminProperties />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Reviews />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Banners />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <UploadBanners />
      </TabPanel>
    </Box>
  );
};

export default Dashboard;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
