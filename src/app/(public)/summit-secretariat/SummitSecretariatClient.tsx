"use client";

import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

import OfficialMessages from "@/src/components/common/OfficialMessageSidebar";
import SponsorsCarousel from "@/src/components/common/SponsorsCarousel";
import { summitData } from "@/src/data/summitEditions.data";
import { DEFAULT_SPONSOR_IMAGE, handleImageError } from "@/src/utils/image";

export default function SummitSecretariatClient() {
  const [openSection, setOpenSection] = useState<string | null>("2023");

  const toggleSection = (year: string) => {
    setOpenSection((current) => (current === year ? null : year));
  };

  return (
    <div className="min-h-screen bg-white mt-16 lg:mt-[98px]">
      {/* Header */}
      <div className="bg-[#d61f26] py-5">
        <h1 className="text-white text-center text-3xl tracking-[-0.2rem] sm:text-4xl md:text-5xl font-normal leading-tight px-4">
          The Lex Witness Summit Secretariat
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-15 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_1fr] gap-8 lg:gap-10">
          {/* Left Section */}
          <div>
            <p className="font-roboto text-sm sm:text-[15px] leading-7 text-[#333] font-normal">
              Typically known as an A to A magazine – an adult to adult magazine
              as they say, Lex Witness has been a platform for knowledge sharing
              and thought leadership on various industry sectors. It is through
              the space of the magazine as well as the pedigree of summits which
              it has been organising ever since its inception that industry
              veterans bring into limelight various undercurrents of law in
              their respective chambers and corporate offices!
              <br />
              <br />A major development here at the action packed Summit
              Secretariat is the extension of these services to various
              organizations who have started entrusting Witness with the
              responsibility to create, execute and conclude Summit Concepts to
              meet their respective purposes. Witness through its already
              existing ecosystem of summit management team is all set to provide
              these services with an added expertise of quality content through
              the magazine presence. You have an idea and we have a summit to
              showcase it! For more details on our Summit Secretariat services
              please contact us. purposes.
            </p>

            <p className="mt-4 mb-5 text-sm sm:text-base font-bold text-[#333]">
              Meanwhile here&apos;s a gist of The Lex{" "}
              <span className="text-[#D0252D]">Witness</span> Summits so far;
            </p>

            {/* Accordion */}
            <div className="space-y-2">
              {summitData.map((item) => {
                const isOpen = openSection === item.year;

                return (
                  <div
                    key={item.year}
                    className="border border-gray-300 rounded-sm overflow-hidden"
                  >
                    {/* Header */}
                    <button
                      type="button"
                      onClick={() => toggleSection(item.year)}
                      className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 text-left transition-colors cursor-pointer ${
                        isOpen
                          ? "bg-[#D12229] text-white"
                          : "bg-white text-[#333] hover:bg-gray-50"
                      }`}
                    >
                      <FaCaretDown
                        className={`transition-transform duration-300 flex-shrink-0 ${
                          isOpen
                            ? "rotate-180 text-white"
                            : "rotate-0 text-[#D0252D]"
                        }`}
                      />

                      <span className="font-roboto text-[17px] leading-5 font-normal">
                        {item.title}
                      </span>
                    </button>

                    {/* Content */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isOpen
                          ? "max-h-[5000px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="p-4 sm:p-6 lg:p-8 bg-white space-y-8">
                        {item.content ? (
                          item.content.map((summit, index) => (
                            <div
                              key={index}
                              className="border-b border-gray-200 last:border-0 pb-6 sm:pb-4 last:pb-0"
                            >
                              <img
                                src={summit.logo || DEFAULT_SPONSOR_IMAGE}
                                alt="Summit Logo"
                                className="float-left w-[300px] h-[158px] object-contain mr-6 mb-4"
                                onError={handleImageError(
                                  DEFAULT_SPONSOR_IMAGE,
                                )}
                              />

                              <p className="font-roboto text-sm sm:text-[15px] leading-7 text-[#333]">
                                {summit.description}
                              </p>

                              <div className="clear-both" />
                            </div>
                          ))
                        ) : (
                          <p className="text-[#8D93A0] italic">
                            Details for {item.year} coming soon...
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Section */}
          <div>
            <OfficialMessages />
          </div>
        </div>

        {/* Sponsors */}
        <h1 className="text-2xl tracking-tighter sm:text-3xl md:text-4xl text-center my-10 sm:my-16">
          Sponsors & Partners
        </h1>
        <SponsorsCarousel />
      </div>
    </div>
  );
}
