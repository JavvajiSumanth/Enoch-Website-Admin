import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function Students() {
  const [reviews, setReviews] = useState([]);
  React.useEffect(() => {
    const fetchedData = [];

    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "reviews"));
      querySnapshot.forEach((doc) => {
        fetchedData.push(doc.data());
      });
      setReviews(fetchedData);
    }
    fetchData();
  }, []);
  return (
    <Box
      className="students"
      sx={{
        margin: "auto",
        mt: 10,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          my: 3,
          textAlign: "center",
        }}
      >
        What Our Students Say
      </Typography>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          780: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1100: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        // autoplay={{
        //   delay: 7000,
        //   disableOnInteraction: false,
        // }}
        navigation={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {reviews.map((review) => {
          return (
            <SwiperSlide key={review.id}>
              <BasicCard review={review} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}

function BasicCard({ review }) {
  return (
    <Box className="student-card">
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            src={`https://avatars.dicebear.com/api/adventurer/${review.id}.svg`}
          />
        </ListItemAvatar>
        <ListItemText primary={review.name} />
      </ListItem>
      <CardContent
        sx={{
          maxHeight: "120px",
          minHeight: "120px",
          mb: 2,
        }}
      >
        <Typography
          className="text-truncate"
          sx={{ fontSize: 15 }}
          color="text.secondary"
          gutterBottom
        >
          {review.review}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          mb: 4,
        }}
      >
        <Rating value={review.rating} readOnly />
      </CardActions>
    </Box>
  );
}
