import {
  Avatar,
  CardHeader,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Box, Rating } from "@mui/material";
import {
  Bathroom,
  Bed,
  Delete,
  Edit,
  Favorite,
  Map,
  MoreVert,
  Place,
  SquareFoot,
  Visibility,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { deleteCourse } from "../../api/api";
import Images from "./ImagesCarousel";
const AdminProperties = ({ edit }) => {
  const { properties, setProperties } = useContext(AuthContext);

  return (
    <Box
      sx={{
        my: 3,
      }}
    >
      <Grid container spacing={2} rowSpacing={3}>
        {properties.map((property, idx) => (
          <Grid key={idx} item xs={12} md={6} lg={4}>
            <Paper elevation={2}>
              <Post property={property} setProperties={setProperties} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminProperties;

function Post({ property, setProperties }) {
  const navigate = useNavigate();

  const handelDelete = async () => {
    if (
      window.confirm("Are you sure you want to delete this property?") === true
    ) {
      const data = await deleteCourse(property.id);
      if (data) {
        setProperties((properties) =>
          properties.filter((crs) => crs.id !== property.id)
        );
      }
    }
  };
  return (
    <Card sx={{ maxWidth: 960, margin: "auto", mb: 2 }}>
      <Grid container>
        {property.images.length > 0 ? (
          <Grid item xs={12}>
            <Images images={property.images} />
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <Box
            sx={{
              p: 2,
              pt: 0,
            }}
          >
            <Typography variant="subtitle1" component="div">
              <span
                style={{
                  color: "blueviolet",
                  fontSize: "2rem",
                }}
              >
                ${property.price}
              </span>{" "}
              USD/Month
            </Typography>

            <Typography variant="h2" component="div">
              {property.name}
            </Typography>

            <Stack
              direction={"row"}
              sx={{ my: 2, flexWrap: "wrap" }}
              spacing={1}
            >
              <Chip
                icon={<Bed />}
                label={property?.beds + " bd"}
                variant="outlined"
                color="secondary"
              />
              <Chip
                icon={<Bathroom />}
                label={property?.bath + " ba"}
                variant="outlined"
                color="secondary"
              />
              <Chip
                icon={<SquareFoot />}
                label={property?.sft + " sqft"}
                variant="outlined"
                color="secondary"
              />
            </Stack>
            <Stack
              direction={"row"}
              sx={{ my: 2, alignItems: "center" }}
              spacing={1}
            >
              <Typography variant="body1" component="div">
                {property.location}
              </Typography>{" "}
              <Map color="primary" />
            </Stack>
            <Box
              sx={{
                mt: 3,
              }}
            >
              <Button
                fullWidth
                startIcon={<Visibility />}
                onClick={() => {
                  navigate(`/view/${property.id}`);
                }}
                variant="contained"
              >
                View Property
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
