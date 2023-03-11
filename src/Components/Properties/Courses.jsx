import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Property from "./CourseItem";

const Properties = ({ edit }) => {
  const { properties } = useContext(AuthContext);
  //   const [properties, setProperties] = useState(data);
  return (
    <Box
      sx={{
        mb: 3,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
          my: 3,
        }}
      >
        Explore Our Properties
      </Typography>
      <Grid container spacing={2} rowSpacing={3}>
        {properties.map((property, idx) => (
          <Grid key={idx} item xs={12} sm={6} md={4} lg={3} sx={{}}>
            <Paper elevation={2}>
              <Property property={property} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Properties;
