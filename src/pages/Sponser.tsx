import { useEffect, useState } from "react";
import icon7 from "../assets/icons/icon7.png";
import sponserImg from "../assets/images.png";
import { getSponsors } from "../services/homepage.service";
import { useSponsors } from "../hooks/useSponsors";

const imgUrl = import.meta.env.VITE_SPONSORS_BASE_URL;

export default function SponsorsPartners() {
  const { data } = useSponsors();

  const sponsors = data?.data?.margedSponsors || [];

  return (
    <section className="bg-white py-10 md:pb-20 px-4">
      <div className="max-w-6xl px-6 mx-auto">
        {/* Icon */}
        <div className="flex justify-center">
          <img
            src={icon7}
            alt="icon"
            className="w-8 h-8 md:w-30 md:h-20 text-[#D0252D] stroke-[1.5]"
          />
        </div>

        {/* Heading */}
        <h2 className="text-center text-[#333] mb-8 md:mb-8 text-3xl sm:text-4xl md:text-[50px] font-normal leading-tight md:tracking-tighter md:leading-[55px] font-roboto">
          Sponsors & Partners
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {sponsors.map((item, index) => (
            <div
              key={index}
              className="border border-[#f1f1f1] bg-white flex flex-col items-center justify-center px-4 py-8 md:py-10"
            >
              {/* Partner Type */}
              <h3 className="text-[#333] text-center mb-6 md:mb-12 md:-mt-6 text-[14px] md:text-[15px] font-bold leading-[24px] md:leading-[28px] font-roboto">
                {item.sponsor_type}
              </h3>

              {/* Logo */}
              <a
                href={item.website_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => !item.website_url && e.preventDefault()}
              >
                <img
                  src={item.image ? `${imgUrl}/${item.image}` : sponserImg}
                  alt={item.title || item.sponsor_type}
                  className={`max-h-20 md:max-h-32 w-auto object-contain  ${
                    item.website_url ? " cursor-pointer" : "cursor-default"
                  }`}
                  onError={(e) => {
                    e.currentTarget.src = sponserImg;
                  }}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
