import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import slider1 from "../../../assets/t4.jpg";
import slider2 from "../../../assets/t3.jpeg";
import slider3 from "../../../assets/t2.jpeg";
import slider4 from "../../../assets/s1.jpeg";

const Banner = () => {
  const slides = [
    {
      image: slider1,
      title: "Welcome to Thikana",
      description:
        "A smart way to manage your apartment, bills, and announcements in one place.",
      cta: "Explore Now",
    },
    {
      image: slider2,
      title: "Find Your Perfect Apartment",
      description:
        "Browse available rooms with rent, block, and floor details — just a click away.",
      cta: "View Apartments",
    },
    {
      image: slider3,
      title: "Manage Everything Seamlessly",
      description:
        "Track payments, apply coupons, and stay updated with announcements.",
      cta: "Go to Dashboard",
    },
    {
      image: slider4,
      title: "Secure & Organized Living",
      description:
        "Join Thikana to enjoy a well-managed and secure building environment.",
      cta: "Get Started",
    },
  ];

  return (
    <div className="w-full h-[70vh] max-h-[800px] ">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="relative h-full flex flex-col justify-center items-center text-center px-6">
              <div className="max-w-2xl mx-auto text-white">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl mb-8 text-green-100">
                  {slide.description}
                </p>
                <button className="px-8 py-3 bg-[#00aeff] hover:bg-[#0090d1] text-white font-semibold rounded-lg transition-colors duration-300">
                  {slide.cta}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
