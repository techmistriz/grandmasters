"use client";

import { useState } from "react";
import Link from "next/link";
import { FaVolumeUp, FaUsers, FaStar } from "react-icons/fa";

import GetInvolvedCTA from "@/src/components/common/GetInvolvedCTA";
import WhyJoin from "@/src/components/sections/WhyJoin";
import WhyTGM from "@/src/components/sections/WhyTGM";
import { useOfficialMessages } from "@/src/hooks/useOfficialMessages";
import { getOfficialMessageHref } from "@/src/utils/officialMessage";
import { getOfficialMessageImageUrl } from "@/src/utils/image";

/* ---------------- TABS ---------------- */
const tabs = [
  { id: "agenda", label: "AGENDA HIGHLIGHTS", icon: <FaVolumeUp size={16} /> },
  { id: "audience", label: "AUDIENCE PROFILE", icon: <FaUsers size={18} /> },
  {
    id: "sponsor",
    label: "SPONSORSHIP OPPORTUNITIES",
    icon: <FaStar size={16} />,
  },
];

const LUMINARIES_YEAR = "2025";

export default function Concept() {
  const [active, setActive] = useState("agenda");

  const { messagesByYear, loading } = useOfficialMessages();
  const luminaries = messagesByYear[LUMINARIES_YEAR] ?? [];

  return (
    <section
      className="relative font-roboto w-full min-h-screen bg-center bg-cover md:bg-fixed"
      style={{ backgroundImage: "url(/images/chess.jpg)" }}
    >
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 mx-auto  text-center">
        {/* HEADER */}
        <div className="backdrop-blur-md bg-white shadow-xl px-5 py-8 md:p-10 flex flex-col items-center">
          <img src="/icons/icon3d.png" alt="" className="h-14 bg-white" />
          <h2 className="font-roboto text-[34px] sm:text-4xl md:text-[50px] leading-tight md:leading-[1.1] tracking-tight md:tracking-[-0.04em] font-medium text-[#111] text-center my-3 px-2">
            Are You A Grand Master?
          </h2>

          <p className="font-roboto text-[15px] font-normal text-[#8d93a0]">
            Join India’s Elite{" "}
            <span className="text-[#D0252D] font-normal">In House</span> Counsel
            Gathering
          </p>

          {/* TABS */}
          <div className="relative flex flex-col md:flex-row justify-around gap-3 md:gap-10 mt-8 border-b border-gray-200 w-full max-w-5xl mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`w-full md:w-auto flex items-center justify-center gap-3 md:gap-6 pt-2 pb-4 -mb-px border-b-2 font-semibold tracking-[0.1em] text-xs sm:text-sm md:text-[15px] cursor-pointer transition-colors ${
                  active === tab.id
                    ? "text-[#D0252D] border-[#D0252D]"
                    : "text-[#333] border-transparent hover:text-[#D0252D]"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
            {/* 🔺 TRIANGLE UNDER ACTIVE TAB */}
            {tabs.map((tab, i) =>
              active === tab.id ? (
                <span
                  key={i}
                  className="hidden md:block absolute bottom-0"
                  style={{
                    left: `${(100 / tabs.length) * i + 100 / tabs.length / 2}%`,
                    transform: "translateX(-50%) translateY(100%)",
                  }}
                >
                  <span
                    className="block w-0 h-0"
                    style={{
                      borderLeft: "15px solid transparent",
                      borderRight: "15px solid transparent",
                      borderTop: "8px solid #D0252D",
                    }}
                  />
                </span>
              ) : null,
            )}
          </div>

          {/* ---------------- TAB CONTENT ---------------- */}

          {/* AGENDA TAB */}
          {active === "agenda" && <WhyJoin />}

          {/* AUDIENCE TAB */}
          {active === "audience" && (
            <div className="mt-8 flex flex-col md:flex-row gap-8 px-4 md:px-8 text-left max-w-4xl mx-auto items-start">
              {/* TEXT SECTION */}
              <div className="space-y-4 text-[#333] flex-1">
                <h3 className="text-[15px] font-bold leading-[28px]">
                  Organizational Participation
                </h3>

                <p className="text-[15px] font-normal leading-[28px]">
                  3M India, 9X Media, ABB India, Accel Partners, Accenture,
                  ACCOR, Accuracy Adani Group, Adani Parts And SEZ, Adidas
                  Group, Aditya Birla Fashion and Retail ADP India, Advaya
                  Legal, AGS Health, Ahuja Group, Air Infotech, Airtel,
                  AkzoNobel India, ALMT Legal, Alpha Partners, Alstom, Amar
                  Chitra Katha, Amar Ujala Publications, Amazon.in, Amdipharm
                  Mercury (AMCo) Group, American Express, American Towers,
                  Amicus Services, Amira Nature Foods, Anantraj, Ani
                  Technologies, Ansal API, ArcelorMittal Distribution Solutions
                  India, ARCIL, Ardent Legal, Aricent, Ashland India
                </p>

                <h3 className="font-semibold mt-6">
                  Hierarchical Participation
                </h3>

                <p className="leading-relaxed">
                  Add. Chief Manager – Legal, Additional Manager – Legal, IP
                  Attorney, AGM – Legal AGM Legal & Asst. Co. Sec., APAC Legal
                  Counsel, Assistant Director, Assistant General Counsel
                  Associate, Associate Director – Legal & Compliance, Associate
                  Director Human Resources
                </p>

                <Link
                  href="/audience-profile"
                  className="inline-block font-custom mt-4 py-3.5  text-[#D0252D] text-[11px] font-bold leading-2.75 px-7 tracking-[0.3rem]  border rounded-sm border-[#D0252D] hover:bg-[#D0252D] hover:text-white transition cursor-pointer"
                >
                  VIEW MORE
                </Link>
              </div>
              {/* IMAGE SECTION */}
              <div className="w-full max-w-84.75 md:w-85 mx-auto">
                <img
                  src="/images/audience-profile1.jpg"
                  alt="Audience profile"
                  className="rounded-xl w-full object-cover"
                />
              </div>
            </div>
          )}

          {/* SPONSOR TAB */}
          {active === "sponsor" && (
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] font-roboto text-[15px] md:font-normal md:leading-[1.9] px-4 md:px-8 gap-4 mt-12 items-center max-w-4xl text-left">
              <div className="flex justify-start">
                <img
                  src="/images/sponsor.png"
                  className="w-full max-w-[320px] mx-auto rounded-lg"
                  alt="Sponsor"
                />
              </div>
              <div className=" text-[#333]">
                <p className="leading-7">
                  Partnering with{" "}
                  <span className="text-[#D0252D] font-bold">
                    The Grand Masters 2026 Summit Series
                  </span>{" "}
                  Series will enable you to brand and promote your service
                  expertise to a unique and interesting set of senior in-house
                  counsel. Summit attendees include senior professionals
                  interested in updating their knowledge and involved in legal
                  and commercial elements of complex business deals. We have a
                  set of standard branding solutions that we can customize based
                  on your specific needs.
                </p>

                <p className="font-semibold text-[#333]">
                  For more details, contact:
                </p>

                <p className="break-all md:break-normal mt-2">
                  <span className="text-[#333] font-normal">
                    Bhupinder Kaur
                  </span>{" "}
                  |{" "}
                  <a
                    href="tel:+919654155065"
                    className="text-[#cd151d] hover:underline"
                  >
                    +91-9654155065
                  </a>{" "}
                  |{" "}
                  <a
                    href="mailto:bhupinder@witnesslive.in"
                    className="text-[#cd151d] hover:underline"
                  >
                    bhupinder@witnesslive.in
                  </a>
                </p>

                <p className="break-all md:break-normal">
                  <span className="text-[#333] font-normal">
                    Neelima Maheshwari
                  </span>{" "}
                  |{" "}
                  <a
                    href="tel:+918800841600"
                    className="text-[#cd151d] hover:underline"
                  >
                    +91-8800841600
                  </a>{" "}
                  |{" "}
                  <a
                    href="mailto:neelima.maheshwari@witnesslive.in"
                    className="text-[#cd151d] hover:underline"
                  >
                    neelima.maheshwari@witnesslive.in
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* WHY THE GRAND MASTERS */}
        <WhyTGM />

        {/* LUMINARIES */}
        <div className="w-full bg-white pb-16 pt-4 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <img
              src="/icons/icon2.png"
              alt=""
              className="flex justify-center h-24 mx-auto bg-white"
            />

            <h2 className="text-3xl sm:text-4xl md:text-[50px] tracking-tighter font-roboto font-normal mt-">
              Past Official Messages
            </h2>
            <p className="font-roboto text-[15px] font-normal leading-[28px] text-[#8d93a0] mt-2 mb-12  ">
              Messages from{" "}
              <span className="text-[#D0252D]">Various Legal Luminaries</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20 px-8">
              {loading ? (
                <div className="col-span-full text-center py-10">
                  Loading...
                </div>
              ) : (
                luminaries.map((item) => (
                  <div key={item.id}>
                    <img
                      src={getOfficialMessageImageUrl(item.speaker?.image)}
                      alt={item.speaker?.name}
                      className="w-52 h-52 md:w-64 md:h-64 rounded-full mx-auto object-cover"
                    />

                    <h3 className="font-roboto text-[20px] leading-[23px] text-[#D0252D] mt-4">
                      <Link
                        href={getOfficialMessageHref(item)}
                        className="hover:underline"
                      >
                        {item.speaker?.name}
                      </Link>
                    </h3>

                    <p className="font-roboto text-[15px] leading-7 text-[#8d93a0] mt-2">
                      {item.speaker?.designation}, {item.speaker?.company}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <GetInvolvedCTA />
      </div>
    </section>
  );
}
