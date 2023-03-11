import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
// import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

export default function Images({ images, single }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        // modules={[FreeMode, Navigation, Thumbs]}
        modules={[FreeMode, Navigation]}
        className="mySwiper2"
      >
        {images.map((image, idx) => (
          <SwiperSlide key={idx}>
            <img src={image} alt="img" />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation]}
        // modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image, idx) => (
          <SwiperSlide key={idx}>
            <img src={image} alt="img" />
          </SwiperSlide>
        ))}
      </Swiper> */}
    </>
  );
}
