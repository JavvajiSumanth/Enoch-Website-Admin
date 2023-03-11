import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { Alert, Chip, Collapse } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Properties from "../Properties/Properties";
import Slider from "../Slider/Slider";
import Students from "../Slider/Students";
import Values from "./Values";

const Home = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Collapse in={open}>
        <Alert
          variant="filled"
          onClose={() => {
            setOpen(false);
          }}
          sx={{
            zIndex: "3333",
            display: "flex",
            my: 2,
            backgroundColor: "#e6ecef",
            color: "#000000",
            "& .MuiAlert-message": {
              display: "flex",
              width: "100%",
            },
          }}
          icon={false}
        >
          <Box
            sx={{
              ml: "auto",

              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <Chip label="Hot" variant="filled" color="primary" /> 🔥 Intro
            price. Get LTB properties for big sale -20%off.
          </Box>
          <Box
            sx={{
              mx: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            For Property Enquiry
            <a
              href="tel:+91 9398262808"
              style={{
                fontWeight: "bold",
                textDecoration: "none",
                marginLeft: "8px",
                color: "#000000",
              }}
            >
              +91 9398262808
            </a>
          </Box>

          <Box
            sx={{
              ml: "auto",
              width: "20%",
              justifyContent: "space-around",
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <Facebook />
            <Twitter />
            <LinkedIn />
            <Instagram />
          </Box>
        </Alert>
      </Collapse>

      <Slider />
      <Properties />
      <Values />
      <Students />
    </>
  );
};

export default Home;
