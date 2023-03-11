import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper";
import { Box } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function Slider() {
  const [images, setImages] = useState([]);

  React.useEffect(() => {
    const fetchedData = [];

    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "images"));
      querySnapshot.forEach((doc) => {
        fetchedData.push(doc.data());
      });
      setImages(fetchedData);
    }
    fetchData();
  }, []);

  return (
    <Box className="Slider">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {images
          .filter((img) => img.selected)
          .map((img) => (
            <SwiperSlide key={img.id}>
              <img loading="lazy" src={img.url} alt="my imng" />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
}
