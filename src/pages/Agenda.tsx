import React, { useEffect, useState } from "react";
import { ChevronDown, Clock } from "lucide-react";
import icon from "../assets/icons/icon1.png";
import { getEvents } from "../services/APIs/homePage";
import { handleImageError } from "../utils/imageUtils";
import iconLogo from "../assets/icons/LW-Brand-Icon-48X48-1.png";

const imgUrl = import.meta.env.VITE_SPEAKERS_BASE_URL;

const SummitAgenda = () => {
  const [expandedId, setExpandedId] = useState<number | null>(5);
  const [activeTab, setActiveTab] = useState("");
  const [events, setEvents] = useState<any[]>([]);

  //  API CALL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getEvents();
        const eventList = res?.data?.events || [];

        setEvents(eventList);
        console.log(eventList);
        if (eventList.length > 0) {
          setActiveTab(eventList[0].city?.name.toLowerCase());
        }
      } catch (err) {}
    };

    fetchData();
  }, []);

  console.log("Events", events);
  //  get event by city
  const selectedEvent = events.find(
    (event) => event.city?.name?.toLowerCase() === activeTab,
  );

  //  agenda from API
  const agendaFromAPI = selectedEvent?.agendas || [];

  const agendaItems = agendaFromAPI.map((item: any) => ({
    id: item.id,
    time: item.agenda_time,
    title: item.agenda_title?.replace(item.agenda_short_description || "", ""),
    description: item.agenda_description,
    hasSpeakers: item.agenda_speakers?.length > 0,
    speakers:
      item.agenda_speakers?.map((s: any) => ({
        name: s.speaker?.name,
        role: s.speaker?.designation,
        img: `${imgUrl}/${s.speaker?.image}`,
      })) || [],
  }));

  const formatEventDate = (dateString: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });

    const getSuffix = (day: number) => {
      if (day >= 11 && day <= 13) return "TH";

      switch (day % 10) {
        case 1:
          return "ST";
        case 2:
          return "ND";
        case 3:
          return "RD";
        default:
          return "TH";
      }
    };

    return `${day}${getSuffix(day)} ${month}`;
  };

  return (
    <div className="max-w-5xl mx-auto py-8 md:pb-12 md:pt-4 px-4 bg-white font-roboto">
      <div className="text-center mb-8 md:mb-12">
        <div className="flex justify-center">
          <img src={icon} className="h-24" />
        </div>

        <h1 className="text-[34px] sm:text-4xl md:text-[50px] font-normal leading-tight md:leading-none text-[#333] mb-6 md:mb-8 px-3">
          The Summit Agenda
        </h1>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 relative md:border-b md:border-gray-200">
          {events.map((event) => {
            const cityName = event.city?.name?.toLowerCase() || "";
            const isActive = activeTab === cityName;

            return (
              <div
                key={event.id}
                onClick={() => {
                  setActiveTab(cityName);
                  setExpandedId(null);
                }}
                className="w-full md:w-auto py-3 md:pb-4 cursor-pointer relative text-center"
              >
                <p
                  className={`text-[15px] font-bold leading-7 tracking-widest ${
                    isActive ? "text-[#D0252D]" : "text-[#333]"
                  }`}
                >
                  {formatEventDate(event.date)}
                </p>

                <p
                  className={`uppercase font-bold ${
                    isActive ? "text-[#D0252D]" : "text-[#333]"
                  }`}
                >
                  {event.city?.name} Edition
                </p>

                {isActive && (
                  <div className="hidden md:block absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[8px] border-t-[#D0252D]" />
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="hidden md:block border-t border-gray-200"></div> */}

      {/* TIMELINE (UNCHANGED UI) */}
      <div className="relative md:ml-20">
        <div className="hidden md:block absolute left-8 top-0 bottom-20 w-[1px] bg-gray-200"></div>

        <div className="space-y-0">
          {agendaItems.map((item: any) => (
            <div
              key={`${selectedEvent?.id}-${item.id}`}
              className="relative pl-0 md:pl-20"
            >
              {/* marker (UNCHANGED) */}
              <img
                src={iconLogo}
                alt="Agenda Icon"
                className="hidden md:block absolute left-3 top-4 w-10 h-10 rounded-full bg-[#DA2127] object-cover"
              />
              <div
                className={`py-10 ${
                  item.description || item.hasSpeakers
                    ? "cursor-pointer"
                    : "cursor-default"
                }`}
                onClick={() => {
                  if (item.description || item.hasSpeakers) {
                    setExpandedId(expandedId === item.id ? null : item.id);
                  }
                }}
              >
                {/* time */}
                <div className="flex items-center gap-2 text-[#333] text-[15px] font-bold leading-7 mb-0.5 -mt-12">
                  <Clock size={15} />
                  <span>{item.time}</span>
                </div>

                {/* title */}
                <div className="flex justify-between items-start gap-4">
                  <h3
                    className="text-lg md:text-[22px] font-bold text-[#333] leading-7 [&_span]:text-[#D0252D]"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />

                  {(item.description || item.hasSpeakers) && (
                    <ChevronDown
                      size={24}
                      className={`flex-shrink-0 cursor-pointer text-[#D0252D] transition-transform duration-300 ${
                        expandedId === item.id ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  )}
                </div>
                <div className="h-px bg-gray-100  mt-2" />

                {/* speakers (UNCHANGED UI) */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedId === item.id
                      ? "max-h-[2000px] opacity-100 mt-6"
                      : "max-h-0 opacity-0 mt-0"
                  }`}
                >
                  {item.hasSpeakers && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 mt-8">
                      {item.speakers.map((speaker: any, idx: number) => (
                        <div key={idx} className="text-center">
                          <div className="w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
                            <img
                              src={speaker.img}
                              onError={handleImageError}
                              className="w-full h-full object-cover transition"
                            />
                          </div>

                          <h4 className="text-[#D0252D] font-black text-xs md:text-[17px] leading-5 md:leading-7 mt-2 uppercase">
                            {speaker.name}
                          </h4>

                          <p className="text-[15px] font-normal leading-6 text-[#333] px-2">
                            {speaker.role}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div
                    className="mt-6 text-sm text-[#333] leading-6 agenda-html"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummitAgenda;
