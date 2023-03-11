import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Rating } from "@mui/material";
import { Movie, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function CourseItem({ property }) {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        maxWidth: "100%",
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="100%"
        image={property.image}
      />
      <CardContent
        sx={{
          p: 2,
          pb: 0,
        }}
      >
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "39.5px",
          }}
        >
          {property.name}
          <Rating value={property.rating} readOnly />
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Duration: {property.duration} Months
        </Typography>
        <Typography variant="h3">
          ₹ {property.price}
          {"  "} &nbsp;
          <span
            style={{
              textDecoration: "line-through",
              color: "red",
              fontSize: "1.6rem",
            }}
          >
            ₹ {property.price + (20 / 100) * property.price}
          </span>
        </Typography>
      </CardContent>
      <Box
        sx={{
          p: 2,
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{
            color: "#222831",
            mb: 1,
          }}
          startIcon={<Movie />}
        >
          Preview
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          startIcon={<Visibility />}
          sx={{}}
          onClick={() => {
            navigate("/properties/" + property.id);
          }}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
}
