import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const data = [
  {
    image: "/avatars/avatar-1.png",
    name: "John Doe",
    testimony: "\"Best fitted white denim shirt more than expected crazy soft, flexible uptop\"",
  },
  {
    image: "/avatars/avatar-2.png",
    name: "Jane Smith",
    testimony: "\"Best fitted white denim shirt more than expected crazy soft, flexible uptop\"",
  },
  {
    image: "/avatars/avatar-3.png",
    name: "Mike Johnson",
    testimony: "\"Best fitted white denim shirt more than expected crazy soft, flexible uptop\"",
  },
  {
    image: "/avatars/avatar-4.png",
    name: "Sarah Williams",
    testimony: "\"Best fitted white denim shirt more than expected crazy soft, flexible uptop\"",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="flex flex-col items-center py-12  bg-gray-200 ">
      <h1 className="font-serif text-center uppercase font-bold text-lg tracking-wider pb-12">
        We love good compliment
      </h1>

      {/* Swiper Wrapper with Clipping */}
      <div className="relative  w-full">
        {/* Left & Right Fade Effect (To Hide Extra Text) */}

        <div className="absolute top-0 left-0 p-10 w-16 h-full bg-gray-200 z-10"></div>

        <div className="absolute top-0 right-0 p-10 w-16 h-full bg-gray-200 z-10"></div>


        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{
            clickable: true,

          }}
          modules={[EffectCoverflow, Pagination]}
          className="py-8  custom-swiper-pagination"
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {data.map((item, index) => (
            <SwiperSlide
              key={index}
              className={`bg-transparent   font-body p-6 text-center flex flex-col items-center transition-all duration-300 ${activeIndex === index ? " opacity-70" : "opacity-50"
                }`}
            >
              <div className="text-4xl mb-4  leading-relaxed">{item.testimony}</div>
              <h3 className="text-lg text-gray-900">{item.name}</h3>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
