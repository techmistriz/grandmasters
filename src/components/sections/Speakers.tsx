"use client";

import { useState } from "react";
import { FaLinkedinIn } from "react-icons/fa";

import SpeakersLounge from "@/src/components/sections/SpeakersLounge";
import { useEvents } from "@/src/hooks/useEvents";
import type { EventSpeaker } from "@/src/types/event.type";
import { formatDateWithSuffix } from "@/src/utils/date";
import { getSpeakerImageUrl, handleImageError } from "@/src/utils/image";

function SpeakerCard({
  item,
  className,
}: {
  item: EventSpeaker;
  className: string;
}) {
  const speaker = item.speaker;

  return (
    <div className={`flex flex-col items-center text-center p-4 ${className}`}>
      <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-50 md:h-50 rounded-full overflow-hidden border border-gray-200">
        <img
          src={
            speaker?.image
              ? getSpeakerImageUrl(speaker.image)
              : "/images/dummy-profile.jpg"
          }
          alt={speaker?.name}
          onError={handleImageError()}
          className="w-full h-full object-cover object-top"
        />
      </div>

      <h3 className="font-roboto mt-4 font-bold leading-4.5 text-base md:text-[15px] text-[#D0252D] tracking-wide">
        {speaker?.name}
      </h3>

      <p className="text-sm font-normal leading-5.5 font-roboto text-[#8D93A0]">
        {speaker?.designation}
      </p>

      {speaker?.linkedin_url && (
        <a
          href={speaker.linkedin_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${speaker.name} on LinkedIn`}
          className="inline-flex items-center justify-center mt-3 w-8 h-8 rounded-full bg-white text-[#D2520D] border-2 border-[#e9e9e9] transition-all duration-300 hover:bg-[#D2520D] hover:text-white hover:border-transparent"
        >
          <FaLinkedinIn className="text-sm" />
        </a>
      )}
    </div>
  );
}

export default function Speakers() {
  const { events } = useEvents();
  const [selectedCity, setSelectedCity] = useState("");

  const tabs = events.map((event) => ({
    id: event.city?.name?.toLowerCase() ?? "",
    label: `${event.city?.name} Edition`,
    date: event.date ? formatDateWithSuffix(event.date) : "",
  }));

  // Default to the first edition until the visitor picks one.
  const active = selectedCity || tabs[0]?.id || "";

  const selectedEvent = events.find(
    (e) => e.city?.name?.toLowerCase() === active,
  );

  const speakers = selectedEvent?.speakers ?? [];
  const firstRowSpeakers = speakers.slice(0, 2);
  const remainingSpeakers = speakers.slice(2);

  return (
    <section
      className="relative w-full min-h-screen bg-center bg-cover md:bg-fixed"
      style={{ backgroundImage: "url(/images/chess.jpg)" }}
    >
      <div className="mx-auto bg-white pt-8 px-4 md:px-0">
        {/* Heading */}
        <div className="text-center mb-6 max-w-4xl mx-auto">
          <div className="flex justify-center">
            <img src="/icons/icon1.png" alt="" className="h-24" />
          </div>

          <h2 className="font-roboto text-[34px] sm:text-4xl md:text-[50px] leading-tight md:leading-[55px] tracking-tight md:tracking-tighter text-[#333] mb-3 px-4">
            Meet The Grand Masters!
          </h2>

          <p className="text-[#D0252D] text-sm sm:text-base md:text-lg font-roboto font-normal leading-7 px-4">
            <span className="text-[#000]">Invited &</span> Confirmed Speakers
          </p>
        </div>

        {/* Tabs */}
        <div className="relative flex flex-col md:flex-row max-w-4xl mx-auto justify-center items-center gap-3 md:gap-60 mb-1 px-4">
          {tabs.map((tab) => (
            <div key={tab.id} className="relative">
              <button
                type="button"
                onClick={() => setSelectedCity(tab.id)}
                className={`font-roboto w-full md:w-auto text-center px-4 py-3 md:py-2 tracking-[2px] md:tracking-widest text-sm md:text-[15px] font-semibold uppercase transition cursor-pointer rounded md:rounded-none ${
                  active === tab.id
                    ? "text-[#D0252D]"
                    : "text-[#333] hover:text-[#D0252D]"
                }`}
              >
                <span className="block">{tab.label}</span>
                {tab.date && (
                  <span className="block mt-1 text-[13px] md:text-sm font-normal normal-case tracking-normal">
                    {tab.date}
                  </span>
                )}
              </button>

              {active === tab.id && (
                <span className="hidden md:block absolute -bottom-[13px] left-1/2 -translate-x-1/2">
                  <span
                    className="block w-0 h-0"
                    style={{
                      borderLeft: "15px solid transparent",
                      borderRight: "15px solid transparent",
                      borderTop: "8px solid #D0252D",
                    }}
                  />
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="h-2 w-full max-w-5xl mx-auto border-t border-gray-300 mb-6"></div>

        {/* First Row - 2 Speakers */}
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto mb-8 px-4">
          {firstRowSpeakers.map((item) => (
            <SpeakerCard
              key={item.id}
              item={item}
              className="w-full sm:w-[280px]"
            />
          ))}
        </div>

        {/* Remaining Speakers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-2 max-w-5xl mx-auto pb-10 px-4">
          {remainingSpeakers.map((item) => (
            <SpeakerCard key={item.id} item={item} className="transition" />
          ))}
        </div>
      </div>

      <SpeakersLounge />
    </section>
  );
}
