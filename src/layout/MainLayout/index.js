import { useState } from "react";
import { Outlet } from "react-router-dom";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { AppBar, Box, CssBaseline, Toolbar } from "@mui/material";

// project imports
import Header from "./Header";
import Sidebar from "./Sidebar";

// assets

// styles

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    ...theme.typography.mainContent,
  })
);

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();

  const [leftDrawerOpened, setLeftDrawerOpened] = useState(false);

  const handleLeftDrawerToggle = () => {
    setLeftDrawerOpened(!leftDrawerOpened);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",

          transition: leftDrawerOpened
            ? theme.transitions.create("width")
            : "none",
        }}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      <Sidebar
        drawerOpen={leftDrawerOpened}
        drawerToggle={handleLeftDrawerToggle}
      />

      <Main theme={theme} open={leftDrawerOpened}>
        <Outlet />
      </Main>
    </Box>
  );
};

export default MainLayout;
