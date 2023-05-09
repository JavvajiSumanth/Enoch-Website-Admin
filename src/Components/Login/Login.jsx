import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import LoginImg from "../../assets/pictures/login.svg";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { login, error, setErrorMessage } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handelSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@admin.com" && password === "admin123") {
      Promise.all([login({ email, password })]).then((data) => {
        if (!!data[0]) {
          // handleClose();
        }
        console.log("All promises have resolved");
      });
    } else {
      setErrorMessage("Invalid Credentials");
    }
  };

  return (
    <>
      <Box
        sx={{
          mt: {
            xs: 3,
          },
          mb: 3,
          minHeight: "70vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Grid container rowSpacing={4}>
          <Grid
            item
            sm={12}
            md={6}
            sx={{
              display: "grid",
              placeItems: "center",
            }}
          >
            <img
              loading="lazy"
              src={LoginImg}
              alt="About"
              width={"50%"}
              style={{
                objectFit: "cover",
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "grid",
              placeItems: "center",
              mx: "auto",
            }}
          >
            <Box
              component={"form"}
              onSubmit={handelSubmit}
              sx={{
                width: "90%",
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h1"
                component="h1"
                gutterBottom
                sx={{
                  textAlign: "center",
                }}
              >
                Login
              </Typography>
              {/* <Divider
                sx={{
                  borderColor: "#d4d4d4",
                  mt: 1,
                }}
              /> */}
              {!!error && (
                <Typography
                  sx={{
                    my: 2,
                    textAlign: "center",
                  }}
                  color="error"
                >
                  {error}
                </Typography>
              )}

              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  gap: "16px",
                }}
              >
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  required
                  type="email"
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                />

                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    value={password}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    required
                    onChange={({ target }) => setPassword(target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <Button variant="contained" color="secondary" type="submit">
                  Login
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
