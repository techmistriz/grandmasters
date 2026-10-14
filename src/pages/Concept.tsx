import React, { useState, useEffect, useRef } from "react";
import { FaVolumeUp, FaUsers, FaStar, FaMicrophone } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";

import bgImg from "../assets/images/chess.jpg";
import img1 from "../assets/images/Mr-Justice-Manmohan.jpg";
import img2 from "../assets/images/lalit-bhasin-1.jpg";
import img3 from "../assets/images/BS-Profile.jpg";
import img4 from "../assets/images/veta.jpg";
import agendaImg from "../assets/images/agenda-highlights1.jpg";
import audienceImg from "../assets/images/audience-profile1.jpg";
import sponsorImg from "../assets/images/sponsor.png";
import icon from "../assets/icons/icon3d.png";
import icon2 from "../assets/icons/icon2.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Counter from "../components/Counter";
import { useOfficialMessages } from "../hooks/useOfficialMessages";

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

/* ---------------- STATIC DATA ---------------- */
const stats = [
  { value: 7, label: "CITIES" },
  { value: 200, suffix: "+", label: "SPEAKERS" },
  { value: 35, suffix: "+", label: "SESSIONS" },
  { value: 500, suffix: "+", label: "ATTENDEES" },
];

const IMAGE_URL = import.meta.env.VITE_OFFICIAL_MESSAGE_BASE_URL;

const Concept = () => {
  const [active, setActive] = useState("agenda");

  const navigate = useNavigate();

  const location = useLocation();

  const [startCount, setStartCount] = useState(false);
  const statsRef = useRef(null);

  const { data, isLoading } = useOfficialMessages(1);

  const apiData = data?.data ?? {};

  const luminaries = data?.data?.["2025"] || [];

  useEffect(() => {
    setStartCount(false);
  }, [location.pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
        }
      },
      {
        threshold: 0.3,
      },
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [location.pathname]);

  const navigation = useNavigate();

  return (
    <section
      className="relative font-roboto w-full min-h-screen bg-center bg-cover md:bg-fixed"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 mx-auto  text-center">
        {/* HEADER */}
        <div className="backdrop-blur-md bg-white shadow-xl px-5 py-8 md:p-10 flex flex-col items-center">
          <img src={icon} className="h-14 bg-white text-[#D0252D]" />
          <h2 className="font-roboto text-[34px] sm:text-4xl md:text-[50px] leading-tight md:leading-[1.1] tracking-tight md:tracking-[-0.05em] text-[#333333] text-center my-3 px-2">
            Are You A Grand Master?
          </h2>

          <p className="font-roboto text-[15px] font-normal text-[#8d93a0]">
            Join India’s Elite{" "}
            <span className="text-[#D0252D] font-normal">In House</span> Counsel
            Gathering
          </p>

          {/* TABS */}
          <div className="relative flex flex-col md:flex-row justify-center gap-3 md:gap-20 mt-8 border-b border-gray-300 pb-4 w-full md:w-fit mx-auto">
            {" "}
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`w-full md:w-auto flex items-center justify-center gap-3 md:gap-12 py-2 font-bold text-xs sm:text-sm md:text-[15px] cursor-pointer ${
                  active === tab.id
                    ? "text-[#D0252D]"
                    : "text-[#333] hover:text-[#D0252D]"
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
          {active === "agenda" && (
            <div className="font-roboto text-[15px] md:text-[15px] flex flex-col md:flex-row items-center gap-6 mt-8 px-5 max-w-5xl mx-auto text-left">
              {" "}
              <div className="flex justify-center shrink-0">
                <img
                  src={agendaImg}
                  className="w-full max-w-[260px] md:max-w-64 rounded-lg object-contain"
                  alt="Agenda"
                />
              </div>
              <div className="flex-1    text-[#333]">
                <p className="mb-2">
                  There Are In-House Counsel and There Are Grand Masters.
                  <span className="text-[#cd151d] font-semibold"> Choose.</span>
                </p>

                <p className="mb-2">
                  Do You Choose Client Delight Over the Billing Delight?
                  <span className="text-[#cd151d] font-semibold">
                    {" "}
                    Stand Out.
                  </span>
                </p>

                <p className="mb-2">
                  Have You Moved on from Court Room to Board Room?
                  <span className="text-[#cd151d] font-semibold">
                    {" "}
                    Differentiate.
                  </span>
                </p>

                <p className="my-2">
                  Here’s a Wire-frame of the Power-Packed Sessions for the
                  Summit:
                </p>

                <ul className="space-y-1">
                  <li>
                    #The{" "}
                    <span className="text-[#cd151d] font-semibold">
                      Strategic Counsel
                    </span>{" "}
                    – Are You Future Ready?
                  </li>
                  <li>
                    #India Inc. 3.0 –{" "}
                    <span className="text-[#cd151d] font-semibold">
                      Pharma & Lifesciences Track
                    </span>{" "}
                    – Hyderabad Special
                  </li>
                  <li>
                    #India Inc. 3.0 –{" "}
                    <span className="text-[#cd151d] font-semibold">
                      Pharma & Lifesciences Track
                    </span>{" "}
                    – Ahmedabad Special
                  </li>
                  <li>
                    #India Inc. 3.0 –{" "}
                    <span className="text-[#cd151d] font-semibold">
                      Real Estate & Infra Track
                    </span>{" "}
                    – Hyderabad Special
                  </li>
                  <li>
                    #The{" "}
                    <span className="text-[#cd151d] font-semibold">
                      Intellectual
                    </span>{" "}
                    You – IP in the Age of AI
                  </li>
                  <li>
                    #The New India{" "}
                    <span className="text-[#cd151d] font-semibold">
                      Dispute Resolution
                    </span>{" "}
                    Wave – Smart Enough?
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* AUDIENCE TAB */}
          {active === "audience" && (
            <div className="mt-8 flex flex-col md:flex-row gap-8 px-4 md:px-8 text-left max-w-4xl mx-auto items-start">
              {" "}
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

                <button
                  onClick={() => navigation("/audience-profile")}
                  className="font-custom mt-4 py-3.5  text-[#D0252D] text-[11px] font-bold leading-2.75 px-7 tracking-[0.3rem]  border rounded-sm border-[#D0252D] hover:bg-[#D0252D] hover:text-white transition cursor-pointer"
                >
                  VIEW MORE
                </button>
              </div>
              {/* IMAGE SECTION */}
              <div className="w-full max-w-84.75 md:w-85 mx-auto">
                {" "}
                <img
                  src={audienceImg}
                  className="rounded-xl w-full object-cover"
                />
              </div>
            </div>
          )}

          {/* SPONSOR TAB */}
          {active === "sponsor" && (
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] font-roboto text-[15px] md:font-normal md:leading-[1.9] px-4 md:px-8 gap-4 mt-12 items-center max-w-4xl text-left">
              {" "}
              <div className="flex justify-start">
                <img
                  src={sponsorImg}
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

        {/* STATS */}
        <div ref={statsRef} className="w-full bg-black/30 py-12 md:py-22 px-4">
          <div className="font-roboto max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-3xl sm:text-5xl md:text-[80px] md:text-[80px] font-bold text-white">
                  {startCount ? (
                    <Counter
                      key={`${location.pathname}-${stat.label}`}
                      end={stat.value}
                      suffix={stat.suffix || ""}
                    />
                  ) : (
                    0
                  )}
                </div>
                <div className="text-white text-[10px] md:text-[11px] font-semibold tracking-[0.3rem]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LUMINARIES */}
        <div className="w-full bg-white pb-16 pt-4 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <img
              src={icon2}
              className="flex justify-center h-24 mx-auto bg-white text-[#D0252D]"
            />

            <h2 className="text-3xl sm:text-4xl md:text-[50px] tracking-tighter font-roboto font-normal mt-">
              {" "}
              Past Official Messages
            </h2>
            <p className="font-roboto text-[15px] font-normal leading-[28px] text-[#8d93a0] mt-2 mb-12  ">
              Messages from{" "}
              <span className="text-[#D0252D]">Various Legal Luminaries</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20 px-8">
              {isLoading ? (
                <div className="col-span-full text-center py-10">
                  Loading...
                </div>
              ) : (
                luminaries.map((item: any) => (
                  <div key={item.id}>
                    <img
                      src={`${IMAGE_URL}/${item.speaker?.image}`}
                      alt={item.speaker?.name}
                      className="w-52 h-52 md:w-64 md:h-64 rounded-full mx-auto object-cover"
                    />

                    <h3
                      onClick={() => {
                        // Remove the trailing "-number" from the slug
                        const cleanSlug = item.speaker.slug.replace(
                          /-\d+$/,
                          "",
                        );

                        navigate(`/official-messages/${cleanSlug}`, {
                          state: {
                            id: item.id,
                          },
                        });
                      }}
                      className="font-roboto text-[20px] leading-[23px] text-[#D0252D] mt-4 hover:underline cursor-pointer"
                    >
                      {item.speaker?.name}
                    </h3>

                    <p className="font-roboto text-[15px] leading-7 text-[#8d93a0] mt-2">
                      {item.speaker?.designation}, {item.speaker?.company}
                    </p>

                    {/* <p className="font-roboto text-[14px] text-[#666]">
                      {item.speaker?.company}
                    </p>  */}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="w-full bg-black/30 py-12 px-4 text-white">
          <h1 className="font-roboto text-3xl sm:text-4xl md:text-[50px] font-bold leading-tight">
            {" "}
            Get Involved
          </h1>
          <p className="mb-4 font-roboto text-[15px] font-normal leading-[28px]">
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
      </div>
    </section>
  );
};

export default Concept;
