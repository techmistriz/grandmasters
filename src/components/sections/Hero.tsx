"use client";

import { useMemo } from "react";
import Link from "next/link";
import { FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";

import { useEventCities } from "@/src/hooks/useEventCities";
import { useEvents } from "@/src/hooks/useEvents";
import { EVENT_CONFIG } from "@/src/config/event";
import { formatDateWithSuffix } from "@/src/utils/date";

const socialIcons = [
  {
    src: "/icons/facebook-icon.png",
    alt: "facebook",
    link: "http://www.facebook.com/share.php?u=http://www.grandmasters.in/&title=India's%20Finest%20General%20Counsel%20Gathering",
  },
  {
    src: "/icons/linkedin-icon.png",
    alt: "linkedin",
    link: "https://www.linkedin.com/shareArticle?mini=true&url=https%3A//www.grandmasters.in/?2024",
  },
  {
    src: "/icons/x-icon.png",
    alt: "x",
    link: "https://twitter.com/intent/tweet?text=https%3A//www.grandmasters.in/Join%20India's%20Finest%20General%20Counsel%20Meet%20-%20The%20Grand%20Masters%202024.%20For%20more%20details%20visit%20https%3A//www.grandmasters.in/",
  },
  {
    src: "/icons/whatsapp-icon.png",
    alt: "whatsapp",
    link: "https://api.whatsapp.com/send?phone=919899332111&text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20The%20Grand%20Masters%202026%20Summit%20Series",
  },
];

const desiredOrder = ["New Delhi", "Mumbai", "Bengaluru", "Hyderabad"];

const buttonClass =
  "block w-full text-center text-[#D0252D] px-2 py-3 border border-[#D0252D] hover:bg-[#D0252D] hover:text-white transition rounded-sm tracking-[0.26rem] bg-white/70 cursor-pointer";

export default function Hero() {
  const { events, loading: eventsLoading } = useEvents();
  const { cities, loading: citiesLoading } = useEventCities();

  const loading = eventsLoading || citiesLoading;

  const { lineOne, lineTwo } = useMemo(() => {
    const availableCities = cities.map((city) =>
      city.name.replace(" Edition", ""),
    );

    const orderedCities = desiredOrder.filter((city) =>
      availableCities.includes(city),
    );

    return {
      lineOne: `${orderedCities.slice(0, -2).join(", ")},`,
      lineTwo: `${orderedCities.slice(-2).join(" & ")} Editions - Launching Soon!`,
    };
  }, [cities]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <span className="relative flex h-5 w-5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D0252D] opacity-75"></span>
          <span className="relative inline-flex h-5 w-5 rounded-full bg-[#D0252D]"></span>
        </span>
      </div>
    );
  }

  return (
    <section
      className="relative w-full min-h-screen md:h-206 overflow-hidden bg-cover bg-center md:bg-bottom md:bg-fixed"
      style={{ backgroundImage: "url(/images/TGM-home.jpg)" }}
    >
      <div className="relative z-10 flex justify-start pt-16 md:pt-28 px-5 sm:px-4">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Socials */}
          <div className="flex gap-5 md:gap-5 my-4 text-lg md:font-normal md:text-[14.3px] md:leading-[16.3px]">
            {socialIcons.map((icon) => (
              <a
                key={icon.alt}
                href={icon.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={icon.src}
                  alt={icon.alt}
                  className="mt-8 w-7 h-7 md:w-6 md:h-6 md:mt-0 cursor-pointer transition-transform hover:scale-110"
                />
              </a>
            ))}
          </div>

          {/* Logo */}
          <img
            src="/images/image.png"
            alt="logo"
            className="w-[210px] sm:w-[150px] md:w-[190px] mb-2 mt-1"
          />

          <h2 className="font-roboto text-xs sm:text-sm md:text-[18px] tracking-[2px] md:tracking-[3px] font-bold text-[#333] leading-7 md:leading-8 mb-2">
            presents
          </h2>

          {/* Title */}
          <h1 className="font-roboto text-[28px] sm:text-4xl md:text-[40px] font-bold leading-[1.15] md:leading-tight text-[#D0252D] mb-1.5 px-2">
            The 12th Annual Grand Masters 2026 Series
          </h1>

          {/* Subtitle */}
          <p className="font-roboto text-[15px] sm:text-lg md:text-[20px] font-light leading-6 md:leading-relaxed text-[#333333] max-w-3xl mb-2">
            A 7 City pan India Corporate Counsel Legal Best Practices Summit
            Series
          </p>

          {/* Events */}
          <div className="font-roboto flex flex-col gap-1 text-sm sm:text-base md:text-[18px] md:leading-[31.5px] font-semibold text-[#333] mb-1">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-0 text-center md:text-left tracking-[1px] md:tracking-[4px] leading-6 md:leading-8"
              >
                <div className="flex items-center">
                  <FaRegCalendarAlt className="text-[#D0252D] mr-2" />
                  <span>{formatDateWithSuffix(event.date)}</span>
                  {event.venue && <span>, {event.venue},</span>}
                </div>

                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-[#D0252D] mr-2 ml-[0.5px] w-2.5 mb-[0.5px]" />
                  <span>{event.city?.name}</span>

                  <span className="text-[#D0252D] animate-pulse text-xs md:text-sm ml-3">
                    LIVE NOW
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Cities */}
          <h2 className="font-roboto text-sm sm:text-base md:text-lg font-semibold tracking-wider md:tracking-[4px] text-black/50">
            {lineOne}
          </h2>

          <h2 className="font-roboto text-sm sm:text-base md:text-lg font-semibold tracking-wider md:tracking-[4px] text-black/50 mb-6 mt-1">
            {lineTwo}
          </h2>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-2 md:mt-4 pb-12 md:pb-20 w-full sm:w-auto text-[14px] leading-5 font-custom">
            <Link
              href={EVENT_CONFIG.registrationOpen ? "/#register" : "/#gallery"}
              className="w-[65%] sm:w-auto"
            >
              <span className={`${buttonClass} font-bold`}>
                {EVENT_CONFIG.registrationOpen
                  ? "REGISTER NOW"
                  : "SUMMIT GALLERY"}
              </span>
            </Link>

            <Link href="/#connect" className="w-[65%] sm:w-auto">
              <span className={`${buttonClass} font-semibold`}>CONTACT US</span>
            </Link>

            <Link href="/past-editions" className="w-[65%] sm:w-auto">
              <span className={`${buttonClass} font-semibold`}>
                PAST EDITIONS
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
