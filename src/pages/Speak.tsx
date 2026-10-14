import React, { useEffect, useState } from "react";
import img from "../assets/images/veta.jpg";
import { TbBrandLinkedinFilled } from "react-icons/tb";
import bgImg from "../assets/images/chess.jpg";
import icon from "../assets/icons/icon1.png";
import { getEvents } from "../services/APIs/homePage";
import { handleImageError } from "../utils/imageUtils";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const imgUrl = import.meta.env.VITE_SPEAKERS_BASE_URL;
const SpeakersSection = () => {
  const [events, setEvents] = useState<any[]>([]);

  //  API CALL
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getEvents();
        setEvents(res?.data?.events || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEvents();
  }, []);

  const tabs = events.map((event) => ({
    id: event.city.name.toLowerCase(),
    label: `${event.city.name} Edition`,
  }));

  const [active, setActive] = useState("");

  useEffect(() => {
    if (tabs.length > 0) {
      setActive((prev) => prev || tabs[0].id);
    }
  }, [tabs]);

  console.log("Get Events", events);
  //  same logic (just replacing static speakers)
  const selectedEvent = events.find(
    (e) => e.city?.name?.toLowerCase() === active,
  );

  const speakers = selectedEvent?.speakers || [];

  const firstRowSpeakers = speakers.slice(0, 2);
  const remainingSpeakers = speakers.slice(2);

  return (
    <section
      className="relative w-full min-h-screen bg-center bg-cover md:bg-fixed"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="mx-auto bg-white pt-8 px-4 md:px-0">
        {/* Heading (UNCHANGED) */}
        <div className="text-center mb-6 max-w-4xl mx-auto">
          <div className="flex justify-center">
            <img
              src={icon}
              className="h-24 text-[#D0252D] text-4xl md:text-5xl"
            />
          </div>

          <h2 className="font-roboto text-[34px] sm:text-4xl md:text-[50px] leading-tight md:leading-[55px] tracking-tight md:tracking-tighter text-[#333] mb-3 px-4">
            Meet The Grand Masters!
          </h2>

          <p className="text-[#333] text-sm sm:text-base md:text-lg font-roboto font-normal leading-7 px-4">
            {/* Invited & <span className="text-[#D0252D]">Confirmed Speakers</span> */}
            <span className="text-[#D0252D]">Confirmed Speakers</span>
          </p>
        </div>

        {/* Tabs (UNCHANGED) */}
        <div className="relative flex flex-col md:flex-row max-w-4xl mx-auto justify-center items-center gap-3 md:gap-60 mb-1 px-4">
          {tabs.map((tab) => (
            <div key={tab.id} className="relative">
              <span
                onClick={() => setActive(tab.id)}
                className={`font-roboto w-full md:w-auto text-center px-4 py-3 md:py-2 tracking-[2px] md:tracking-widest text-sm md:text-[15px] font-semibold uppercase transition cursor-pointer rounded md:rounded-none ${
                  active === tab.id
                    ? "text-[#D0252D]"
                    : "text-[#333] hover:text-[#D0252D]"
                }`}
              >
                {tab.label}
              </span>

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

        {/* Border line (UNCHANGED) */}
        <div className="h-2 w-full max-w-5xl mx-auto border-t border-gray-300 mb-6"></div>

        {/* Speakers Grid (UNCHANGED UI) */}
        {/* First Row - 2 Speakers */}
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto mb-8 px-4">
          {firstRowSpeakers.map((item: any, i: number) => {
            const speaker = item.speaker;

            return (
              <div
                key={i}
                className="flex flex-col items-center text-center p-4 w-full sm:w-[280px]"
              >
                <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-50 md:h-50 rounded-full overflow-hidden border border-gray-200">
                  <img
                    src={speaker?.image ? `${imgUrl}/${speaker.image}` : img}
                    alt={speaker?.name}
                    onError={handleImageError}
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
                    className="inline-flex items-center justify-center mt-3 w-8 h-8 rounded-full bg-white text-[#D2520D] border-2 border-[#e9e9e9] transition-all duration-300 hover:bg-[#D2520D] hover:text-white hover:border-transparent"
                  >
                    <FaLinkedinIn className="text-sm" />
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* Remaining Speakers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-2 max-w-5xl mx-auto pb-10 px-4">
          {remainingSpeakers.map((item: any, i: number) => {
            const speaker = item.speaker;

            return (
              <div
                key={i}
                className="flex flex-col items-center text-center p-4 transition"
              >
                <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-50 md:h-50 rounded-full overflow-hidden border border-gray-200">
                  <img
                    src={speaker?.image ? `${imgUrl}/${speaker.image}` : img}
                    alt={speaker?.name}
                    onError={handleImageError}
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
                    className="inline-flex items-center justify-center mt-3 w-8 h-8 rounded-full bg-white text-[#D2520D] border-2 border-[#e9e9e9] transition-all duration-300 hover:bg-[#D2520D] hover:text-white hover:border-transparent"
                  >
                    <FaLinkedinIn className="text-sm" />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA (UNCHANGED) */}
      <div className="w-full bg-black/30 py-12 px-4 text-white">
        <h1 className="flex font-roboto text-3xl sm:text-4xl leading-[55px] md:text-[50px] font-bold tracking-tighter justify-center">
          {" "}
          Get Involved
        </h1>
        <p className="flex justify-center my-4 font-roboto text-[15px] font-normal leading-[28px]">
          All that You’d Like to Know about The Grand Masters 2026
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 mt-8">
          {[
            { label: "SPEAK", to: "/#speak" },
            { label: "SPONSOR", to: "/#sponsor" },
            { label: "REGISTER NOW", to: "/#register" },
            { label: "CONNECT", to: "/#contact" },
          ].map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="w-full sm:w-auto min-w-[180px] border border-white rounded-md py-3 px-6 mx-0 md:mx-10 md:py-4 text-sm font-bold tracking-[0.2rem] leading-[14px] text-center transition-colors hover:bg-[#D0252D]"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;
