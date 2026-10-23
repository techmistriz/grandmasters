"use client";

import { useMemo } from "react";
import Link from "next/link";
import { FaArrowRight, FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";

import { useEventCities } from "@/src/hooks/useEventCities";
import { useEvents } from "@/src/hooks/useEvents";
import { EVENT_CONFIG } from "@/src/config/event";
import { formatDateWithSuffix } from "@/src/utils/date";

// Upcoming editions are listed in this order, after the live ones.
const desiredOrder = [
  "New Delhi",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Ahmedabad",
];

const cityName = (name = "") => name.replace(" Edition", "").trim();

const buttonClass =
  "group flex items-center justify-center gap-4 w-full sm:w-auto px-8 md:px-10 h-13 md:h-14 border border-[#e31e26] rounded-sm text-[13px] md:text-[14px] font-semibold uppercase tracking-[0.3em] transition";

export default function Hero() {
  const { events, loading: eventsLoading } = useEvents();
  const { cities, loading: citiesLoading } = useEventCities();

  const loading = eventsLoading || citiesLoading;

  // Cities not live yet, in the preferred order.
  const upcomingCities = useMemo(() => {
    const live = events.map((event) => cityName(event.city?.name));
    const names = cities
      .map((city) => cityName(city.name))
      .filter((name) => name && !live.includes(name));
    const rank = (name: string) => {
      const index = desiredOrder.indexOf(name);
      return index === -1 ? desiredOrder.length : index;
    };

    return [...new Set(names)].sort((x, y) => rank(x) - rank(y));
  }, [cities, events]);

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
    <section className="relative w-full overflow-hidden bg-white">
      {/* Background artwork */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#ffffff_35%,#f6f6f6_100%)]" />
      <img
        src="/images/hero-left.jpg"
        alt=""
        className="hidden md:block absolute left-0 bottom-0 h-full w-auto max-w-[32%] object-cover object-right [mask-image:linear-gradient(to_right,black_60%,transparent)]"
      />
      <img
        src="/images/hero-right.jpg"
        alt=""
        className="hidden md:block absolute right-0 bottom-0 h-full w-auto max-w-[32%] object-cover object-left [mask-image:linear-gradient(to_left,black_60%,transparent)]"
      />
      {/* Keeps the centre text readable over the artwork */}
      <div className="hidden md:block absolute inset-0 bg-[radial-gradient(ellipse_42%_65%_at_50%_55%,rgba(255,255,255,0.85),transparent)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-28 md:pt-40 pb-14 md:pb-24 flex flex-col items-center text-center font-roboto">
        {/* Title */}
        <h1 className="font-bold leading-[1.05] tracking-tight">
          <span className="block text-[34px] sm:text-[48px] md:text-[64px] text-[#141414]">
            The 12th Annual
          </span>
          <span className="block mt-1 text-[34px] sm:text-[48px] md:text-[64px] text-[#e31e26]">
            Grand Masters 2026 Series
          </span>
        </h1>

        <span className="block mt-6 w-14 h-[3px] bg-[#e31e26]" />

        <p className="mt-6 max-w-xl text-[12px] sm:text-[14px] md:text-[17px] leading-relaxed tracking-[0.3em] uppercase text-[#555]">
          A 7-City Pan India Corporate Counsel Legal Best Practices Summit
          Series
        </p>

        {/* Live editions */}
        {events.length > 0 && (
          <>
            <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#e31e26] px-5 py-1.5 text-[13px] md:text-[15px] font-semibold tracking-[0.25em] text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              LIVE NOW
            </span>

            <div className="mt-3 flex flex-col sm:flex-row justify-center gap-6 sm:gap-0 sm:divide-x sm:divide-[#cfcfcf]">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="text-center sm:text-left sm:px-8 md:px-10"
                >
                  <p className="text-[30px] md:text-[40px] font-bold uppercase leading-tight text-[#e31e26]">
                    {cityName(event.city?.name)}
                  </p>
                  <p className="mt-2 flex items-center justify-center sm:justify-start gap-3 text-[15px] md:text-[19px] text-[#222]">
                    <FaRegCalendarAlt className="shrink-0 text-[#e31e26]" />
                    {formatDateWithSuffix(event.date)}
                  </p>
                  {event.venue && (
                    <p className="mt-1.5 flex items-center justify-center sm:justify-start gap-3 text-[15px] md:text-[19px] text-[#222]">
                      <FaMapMarkerAlt className="shrink-0 text-[#e31e26]" />
                      {event.venue}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Upcoming editions */}
        {upcomingCities.length > 0 && (
          <ul className="mt-8 flex flex-wrap justify-center gap-y-2 divide-x divide-[#cfcfcf] text-[13px] md:text-[17px] uppercase tracking-wide text-[#666]">
            {upcomingCities.map((city) => (
              <li key={city} className="px-4 md:px-8">
                {city}
              </li>
            ))}
          </ul>
        )}

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto">
          <Link
            href={EVENT_CONFIG.registrationOpen ? "/#register" : "/#gallery"}
            className={`${buttonClass} bg-[#e31e26] text-white hover:bg-[#c8161d]`}
          >
            {EVENT_CONFIG.registrationOpen ? "Register Now" : "Summit Gallery"}
            <FaArrowRight className="transition group-hover:translate-x-1" />
          </Link>

          <Link
            href="/#agenda"
            className={`${buttonClass} bg-white/80 text-[#e31e26] hover:bg-[#e31e26] hover:text-white`}
          >
            Agenda
            <FaArrowRight className="transition group-hover:translate-x-1" />
          </Link>

          <Link
            href="/#speak"
            className={`${buttonClass} bg-white/80 text-[#e31e26] hover:bg-[#e31e26] hover:text-white`}
          >
            Speakers
            <FaArrowRight className="transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
