import React from "react";
import emailjs from "@emailjs/browser";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Email, Phone } from "@mui/icons-material";
import { updatePropertyWithTenant } from "../../api/api";

const SingleRequest = ({ tenant }) => {
  const handleSubmit = () => {
    var templateParams = {
      from_name: tenant.firstName + " " + tenant.lastName,
      email: tenant.email,
      address: tenant.location,
      password: "password",
    };

    emailjs
      .send(
        "service_qmvz2k7",
        "template_7fi5bco",
        templateParams,
        "pKr5g4rAla9WuxUbp"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          alert("Sent Mail to " + templateParams.from_name);
          try {
            updatePropertyWithTenant(tenant.id, {
              firstName: tenant.firstName,
              lastName: tenant.lastName,
              role: "TENANT",
              uid: "",
              email: tenant.email,
            });
          } catch (error) {
            console.log(error);
          }
        },
        function (error) {
          console.log("FAILED...", error);
          alert("Failed to Send Mail to " + templateParams.from_name);
        }
      );
  };

  return (
    <Grid item sx={{ my: 2 }} xs={12} sm={6} md={4}>
      <Paper elevation={3} sx={{ p: 2, m: 2 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: "center",
            mb: 3,
          }}
        >
          {tenant.firstName} {tenant.lastName}
        </Typography>{" "}
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            display: "flex",
            aliginItems: "center",
            gap: 2,
          }}
        >
          <Email /> {tenant.email}
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            display: "flex",
            aliginItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <Phone /> {tenant.phone}
        </Typography>
        Address
        <Typography variant="body1">{tenant.location}</Typography>
        <Typography
          variant="subtitle1"
          sx={{
            my: 2,
          }}
          component={"p"}
        >
          MoveIn Date - {tenant.date}
        </Typography>
        <Button fullWidth variant="contained" onClick={handleSubmit}>
          Authorize
        </Button>
      </Paper>
    </Grid>
  );
};

export default SingleRequest;
