import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import img from "../../../assets/images/users/user-round.svg";
import { LockOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
export default function AccountMenu() {
  const { isAuthenticated, signOutUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      {!!isAuthenticated ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <Tooltip title="Home">
            <Link
              to={"/"}
              style={{
                color: "#000",
                fontWeight: "500",
                textTransform: "uppercase",
                textDecoration: "none",
                mr: "auto",
              }}
            >
              <Button
                variant="text"
                sx={{
                  ml: 2,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  color: "#000",
                  display: {
                    xs: "none",
                    md: "initial",
                  },
                }}
              >
                Home
              </Button>
            </Link>
          </Tooltip>
          <Tooltip title="New Property">
            <Link
              to={"property"}
              style={{
                color: "#000",
                fontWeight: "500",
                textTransform: "uppercase",
                textDecoration: "none",
                mr: "auto",
              }}
            >
              <Button
                variant="text"
                sx={{
                  ml: 2,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  color: "#000",
                  display: {
                    xs: "none",
                    md: "initial",
                  },
                }}
              >
                New Property
              </Button>
            </Link>
          </Tooltip>
          <Tooltip title="Old Property">
            <Link
              to={"old-property"}
              style={{
                color: "#000",
                fontWeight: "500",
                textTransform: "uppercase",
                textDecoration: "none",
                mr: "auto",
              }}
            >
              <Button
                variant="text"
                sx={{
                  ml: 2,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  color: "#000",
                  display: {
                    xs: "none",
                    md: "initial",
                  },
                }}
              >
                Old Property
              </Button>
            </Link>
          </Tooltip>
          <Tooltip title="Properties">
            <Link
              to={"properties"}
              style={{
                color: "#000",
                fontWeight: "500",
                textTransform: "uppercase",
                textDecoration: "none",
                mr: "auto",
              }}
            >
              <Button
                variant="text"
                sx={{
                  ml: 2,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  color: "#000",
                  display: {
                    xs: "none",
                    md: "initial",
                  },
                }}
              >
                properties
              </Button>
            </Link>
          </Tooltip>
          <Tooltip title="Reviews">
            <Link
              to={"reviews"}
              style={{
                color: "#000",
                fontWeight: "500",
                textTransform: "uppercase",
                textDecoration: "none",
                mr: "auto",
              }}
            >
              <Button
                variant="text"
                sx={{
                  ml: 2,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  color: "#000",
                  display: {
                    xs: "none",
                    md: "initial",
                  },
                }}
              >
                reviews
              </Button>
            </Link>
          </Tooltip>
          <Tooltip title="Messages">
            <Link
              to={"messages"}
              style={{
                color: "#000",
                fontWeight: "500",
                textTransform: "uppercase",
                textDecoration: "none",
                mr: "auto",
              }}
            >
              {" "}
              <Button
                variant="text"
                sx={{
                  ml: 2,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  color: "#000",
                  display: {
                    xs: "none",
                    md: "initial",
                  },
                }}
              >
                messages
              </Button>
            </Link>
          </Tooltip>
          <Tooltip title="Requests">
            <Link
              to={"requests"}
              style={{
                color: "#000",
                fontWeight: "500",
                textTransform: "uppercase",
                textDecoration: "none",
                mr: "auto",
              }}
            >
              <Button
                variant="text"
                sx={{
                  ml: 2,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  color: "#000",
                  display: {
                    xs: "none",
                    md: "initial",
                  },
                }}
              >
                requests
              </Button>
            </Link>
          </Tooltip>

          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: "auto" }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 38, height: 38 }} src={img}>
                M
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={signOutUser}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        <Link
          to={"/login"}
          style={{
            color: "white",
            textDecoration: "none",
            ml: "auto",
          }}
        >
          <Button
            variant="contained"
            startIcon={<LockOutlined />}
            color="secondary"
            style={{
              ml: "auto",
            }}
          >
            Login
          </Button>
        </Link>
      )}
    </React.Fragment>
  );
}
