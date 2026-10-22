"use client";

import { useState } from "react";
import { ChevronDown, Clock } from "lucide-react";

import { editionTabId, useHashTab } from "@/src/hooks/useHashTab";
import { useEvents } from "@/src/hooks/useEvents";
import { formatDateWithSuffix } from "@/src/utils/date";
import { getSpeakerImageUrl, handleImageError } from "@/src/utils/image";

export default function Agenda() {
  const { events } = useEvents();
  const [expandedId, setExpandedId] = useState<number | null>(5);
  // Tabs are linkable, e.g. #agenda-chennai-edition.
  const [selectedTab, selectTab] = useHashTab("agenda");

  const tabIds = events.map((event) =>
    editionTabId("agenda", event.city?.name),
  );

  // Default to the first edition until the visitor picks one.
  const activeTab = tabIds.includes(selectedTab)
    ? selectedTab
    : tabIds[0] || "";

  const selectedEvent = events[tabIds.indexOf(activeTab)];

  const agendaItems = (selectedEvent?.agendas ?? []).map((item) => ({
    id: item.id,
    time: item.agenda_time,
    title:
      item.agenda_title?.replace(item.agenda_short_description || "", "") ?? "",
    description: item.agenda_description ?? "",
    hasSpeakers: (item.agenda_speakers?.length ?? 0) > 0,
    speakers:
      item.agenda_speakers?.map((s) => ({
        name: s.speaker?.name,
        role: s.speaker?.designation,
        img: getSpeakerImageUrl(s.speaker?.image),
      })) ?? [],
  }));

  return (
    <div className="max-w-5xl mx-auto py-8 md:pb-12 md:pt-4 px-4 bg-white font-roboto">
      <div className="text-center mb-8 md:mb-12">
        <div className="flex justify-center">
          <img src="/icons/icon1.png" alt="" className="h-24" />
        </div>

        <h1 className="text-[34px] sm:text-4xl md:text-[50px] font-normal leading-tight md:leading-none text-[#333] mb-6 md:mb-8 px-3">
          The Summit Agenda
        </h1>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-60 relative md:border-b md:border-gray-200">
          {events.map((event, index) => {
            const tabId = tabIds[index];
            const isActive = activeTab === tabId;

            return (
              <div
                key={event.id}
                id={tabId}
                onClick={() => {
                  selectTab(tabId);
                  setExpandedId(null);
                }}
                className="w-full md:w-auto py-3 md:pb-4 cursor-pointer relative text-center scroll-mt-72"
              >
                <div
                  className={`font-roboto px-4 py-0 md:py-2 tracking-[2px] md:tracking-widest text-sm md:text-[15px] font-semibold uppercase transition ${
                    isActive
                      ? "text-[#D0252D]"
                      : "text-[#333] hover:text-[#D0252D]"
                  }`}
                >
                  <span className="block">{event.city?.name} Edition</span>
                  {event.date && (
                    <span className="block mt-1 text-[13px] md:text-sm font-normal normal-case tracking-normal">
                      {formatDateWithSuffix(event.date)}
                    </span>
                  )}
                </div>

                {isActive && (
                  <div className="hidden md:block absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[8px] border-t-[#D0252D]" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* TIMELINE */}
      <div className="relative md:ml-20">
        <div className="hidden md:block absolute left-8 top-0 bottom-20 w-[1px] bg-gray-200"></div>

        <div className="space-y-0">
          {agendaItems.map((item) => (
            <div
              key={`${selectedEvent?.id}-${item.id}`}
              className="relative pl-0 md:pl-20"
            >
              {/* marker */}
              <img
                src="/icons/LW-Brand-Icon-48X48-1.png"
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

                {/* speakers */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedId === item.id
                      ? "max-h-[2000px] opacity-100 mt-6"
                      : "max-h-0 opacity-0 mt-0"
                  }`}
                >
                  {item.hasSpeakers && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 mt-8">
                      {item.speakers.map((speaker, idx) => (
                        <div key={idx} className="text-center">
                          <div className="w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
                            <img
                              src={speaker.img}
                              alt={speaker.name}
                              onError={handleImageError()}
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
}
