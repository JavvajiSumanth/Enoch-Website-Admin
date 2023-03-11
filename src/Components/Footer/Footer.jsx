import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import LogoImg from "../../assets/pictures/logo.svg";
const Footer = () => {
  const location = useLocation();
  console.log(location);
  if (location.pathname.includes("admin")) return null;
  else
    return (
      <>
        <Box
          sx={{
            background: "#14181d",
            py: 4,
          }}
        >
          <Box
            sx={{
              width: "85%",
              height: "100%",
              margin: "auto",
              color: "#fff",
            }}
          >
            <Grid
              container
              spacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 6 }}
              sx={{
                justifyContent: "space-around",
              }}
            >
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <img loading="lazy" src={LogoImg} alt="Logo" height="120px" />
                <Typography>
                  LTB Info Tech (Learn the best) is a leading software institure
                  providing software training, Project Guidance, Application
                  development and servies. We offer flexible Online trainings
                  that allow students and working professionals to learn the new
                  technologies.
                </Typography>
              </Grid>

              <Grid
                item
                lg={4}
                md={4}
                sm={6}
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Stack
                  spacing={1.3}
                  sx={{
                    minWidth: {
                      xs: "100%",
                      lg: "250px",
                    },
                  }}
                >
                  <Typography variant="h2" color="primary">
                    Quick Links
                  </Typography>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                    to={"/"}
                  >
                    Home
                  </Link>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                    to={"properties"}
                  >
                    Services We Offer
                  </Link>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                    to={"about"}
                  >
                    About us
                  </Link>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                    to="contact"
                  >
                    Contact Us
                  </Link>
                </Stack>
              </Grid>
              <Grid
                item
                lg={4}
                md={4}
                sm={6}
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Stack
                  spacing={1.3}
                  sx={{
                    minWidth: {
                      xs: "100%",
                      lg: "250px",
                    },
                  }}
                >
                  <Typography variant="h2" color="primary">
                    Get Contact
                  </Typography>
                  <a
                    href="tel:+91 9398262808"
                    style={{
                      display: "flex",
                      alignItems: "center",

                      textDecoration: "none",
                      color: "#fff",
                    }}
                  >
                    Phone: +91 9398262808
                  </a>
                  <a
                    href="mailto:ltbedutech@gmail.com"
                    style={{
                      // mt: 3,
                      display: "flex",
                      alignItems: "center",
                      textDecoration: "none",
                      color: "#fff",
                    }}
                  >
                    E-mail: ltbedutech@gmail.com
                  </a>
                  <Typography gutterBottom>
                    Location: Hyderabad,Telangana, India.
                  </Typography>
                  <Stack direction={"row"} spacing={2} sx={{ mt: 3 }}>
                    <Facebook />
                    <Twitter />
                    <LinkedIn />
                    <Instagram />
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
            <Divider sx={{ mt: 2, mb: 3, borderColor: "#333333" }} />
            <Typography
              sx={{
                textAlign: "center",
              }}
            >
              © {new Date().getFullYear()} LTB infotech. All Rights Reserved.
            </Typography>
          </Box>
        </Box>
      </>
    );
};

export default Footer;
