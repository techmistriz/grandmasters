"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { useSponsors } from "@/src/hooks/useSponsors";
import { getSponsorImageUrl } from "@/src/utils/image";

export default function SponsorsCarousel() {
  const { sponsors } = useSponsors();

  const hasMultipleSponsors = sponsors.length > 1;

  return (
    <section className="pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 relative">
        <Swiper
          modules={[Autoplay]}
          loop={hasMultipleSponsors}
          spaceBetween={20}
          slidesPerGroup={1}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={3000}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {sponsors.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="h-[220px] border border-[#f1f1f1] bg-white flex flex-col rounded-sm cursor-pointer">
                <h3 className="font-roboto text-center pt-6 text-[15px] leading-6 font-bold text-[#333]">
                  {item.sponsor_type}
                </h3>

                <div className="flex-1 mb-5 flex items-start justify-center">
                  <img
                    src={getSponsorImageUrl(item.image)}
                    alt={item.title || item.sponsor_type}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
