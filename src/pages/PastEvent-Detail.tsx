import img1 from "../assets/images/detail.jpg";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getPastEditionDetail } from "../services/APIs/pastEdition";

const staticDignitaries: Record<string, any[]> = {
  "2023-New Delhi": [
    {
      name: "Hon’ble Justice Manmohan",
      designation: "Judge, Delhi High Court",
    },
    {
      name: "Dr. PSN Prasad",
      designation: "Member (J), NCLT Bench, New Delhi",
    },
    {
      name: "Sr. Advocate R. Venkataramani",
      designation: "Attorney- General for India",
    },
  ],

  "2023-Bengaluru": [
    {
      name: "Hon’ble Mr. Justice M.I. Arun",
      designation: "Judge, Karnataka High Court",
    },
  ],
};

const staticSpeakerHeadings: Record<string, string> = {
  //2017
  "2017-New Delhi":
    "Badrinath Durvasula, Senior Vice President, Adani Group Summit Chair, The Grand Masters 2017 – New Delhi Edition",

  "2017-Mumbai":
    "Debolina Partap, VP & General Counsel, Wockhardt Group Summit Chair, The Grand Masters 2017 – Mumbai Edition",

  "2017-Bengaluru":
    "Pawan Singhal, Executive Director of Legal and General Counsel, 3M India Summit Chair, The Grand Masters 2017 – Bengaluru Edition",

  // 2018
  "2018-New Delhi":
    "Badrinath Durvasula, Senior Vice President, Adani Group Summit Chair, The Grand Masters 2018 – New Delhi Edition",

  "2018-Mumbai":
    "Debolina Partap, Sr. Vice President and General Counsel, Wockhardt Summit Chair, The Grand Masters 2018 – Mumbai Edition",

  "2018-Bengaluru":
    "KS Suresh, Group General Counsel, ITC Ltd. Summit Chair, The Grand Masters 2018 – Bengaluru Edition",

  // 2019
  "2019-New Delhi":
    "Manjaree Chowdhary, General Counsel, Maruti Suzuki India Summit Chair, The Grand Masters 2019 – New Delhi Edition",

  "2019-Mumbai":
    "Debolina Partap, Vice President and General Counsel, Wockhardt Summit Chair, The Grand Masters 2019 – Mumbai Edition",

  "2019-Bengaluru":
    "Thirumalesh Gangappa, Country Counsel, Google India Summit Chair, The Grand Masters 2019 – Bengaluru Edition",

  // 2015
  "2015-Mumbai":
    "AS KUMARGeneral Counsel, Dr. Reddy’s – Summit Chair for The Grand Masters 2015, Mumbai Edition",
};

const EditionOverview = () => {
  const { slug } = useParams();
  const location = useLocation();

  const id = location.state?.id;
  const year = location.state?.year;

  const [eventData, setEventData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // const [activeTab, setActiveTab] = useState("speakers");
  const [activeTab, setActiveTab] = useState("");

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (!slug) return;

        const res = await getPastEditionDetail(slug);
        setEventData(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [slug]);

  useEffect(() => {
    if (!eventData) return;

    const dignitaryKey = `${eventData.year}-${eventData.city?.name}`;

    const hasDignitaries =
      (staticDignitaries[dignitaryKey] || eventData.dignitaries || []).length >
      0;

    setActiveTab(hasDignitaries ? "dignitaries" : "speakers");
  }, [eventData]);

  useEffect(() => {
    if (!selectedImage) return;

    setShowControls(true);

    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [selectedImage, selectedIndex]);

  const images = eventData?.gallery?.images || [];

  const nextImage = () => {
    if (selectedIndex >= images.length - 1) return;

    const next = selectedIndex + 1;
    setSelectedIndex(next);
    setSelectedImage(images[next]);
  };

  const prevImage = () => {
    if (selectedIndex <= 0) return;

    const prev = selectedIndex - 1;
    setSelectedIndex(prev);
    setSelectedImage(images[prev]);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex items-center gap-3">
          <span className="relative flex h-5 w-5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D0252D] opacity-75"></span>
            <span className="relative inline-flex h-5 w-5 rounded-full bg-[#D0252D]"></span>
          </span>

          {/* <span className="font-semibold tracking-widest text-[#D0252D]">
          LOADING..
        </span> */}
        </div>
      </div>
    );
  }
  const dignitaryKey = `${eventData?.year}-${eventData?.city?.name}`;
  const dignitaries =
    staticDignitaries[dignitaryKey] || eventData?.dignitaries || [];
  const hasDignitaries = dignitaries.length > 0;

  const speakerHeading = staticSpeakerHeadings[dignitaryKey] || "";

  // Temporary static report
  // const reportUrl = "/sample.pdf";
  const REPORT_BASE_URL = import.meta.env.VITE_REPORT_BASE_URL;

  const reportUrl = eventData?.summit_report
    ? `${REPORT_BASE_URL}/${eventData.summit_report}`
    : "";

  const toTitleCase = (str = "") =>
    str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

  console.log(eventData);
  return (
    <div className="min-h-screen font-roboto bg-white mt-16 lg:mt-[98px]">
      {/* Header */}
      <div className="bg-[#D0252D] py-4 sm:py-7">
        <h1 className="text-center text-white text-[22px] tracking-[-0.1rem] leading-9.5 sm:text-3xl md:text-[35px] font-normal px-4">
          The Grand Masters {eventData?.year},
          <span className="ml-2">{eventData?.city?.name}</span> Edition - An
          Overview
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-12 lg:py-10">
        {/* Tabs */}
        <div className="flex justify-center md:gap-0.5 border-b border-[#D0252D] overflow-x-auto no-scrollbar">
          {hasDignitaries && (
            <button
              onClick={() => setActiveTab("dignitaries")}
              className={`font-roboto px-4 py-5 text-sm font-bold border border-b-0 transition
      ${
        activeTab === "dignitaries"
          ? "bg-[#D0252D] text-white border-[#D0252D]"
          : "bg-white text-[#333] border-gray-300"
      }`}
            >
              Dignitaries
            </button>
          )}
          <button
            onClick={() => setActiveTab("speakers")}
            className={`font-roboto px-4 sm:px-1 py-5 text-sm font-bold border border-b-0 transition cursor-pointer ${
              activeTab === "speakers"
                ? "bg-[#D0252D] text-white border-[#D0252D]"
                : "bg-white text-[#333] border-gray-300"
            }`}
          >
            Speakers
          </button>

          <button
            onClick={() => setActiveTab("gallery")}
            className={` font-roboto px-4 sm:px-2 py-5 text-sm font-bold border border-b-0 transition cursor-pointer ${
              activeTab === "gallery"
                ? "bg-[#D0252D] text-white border-[#D0252D]"
                : "bg-white text-[#333] border-gray-300"
            }`}
          >
            Gallery
          </button>

          {reportUrl && (
            <button
              onClick={() => setActiveTab("report")}
              className={`font-roboto px-4 sm:px-1 py-5 text-sm font-bold border border-b-0 transition cursor-pointer ${
                activeTab === "report"
                  ? "bg-[#D0252D] text-white border-[#D0252D]"
                  : "bg-white text-[#333] border-gray-300"
              }`}
            >
              Summit Report {eventData?.year}
            </button>
          )}
        </div>

        {/* Dignitaries Tab */}
        {activeTab === "dignitaries" && (
          <div className="mt-3 px-2 sm:px-4 text-[15px] font-roboto leading-7 text-[#333] md:px-8 pb-8">
            <div className="space-y-1">
              {dignitaries.map((item, index) => (
                <div
                  key={index}
                  className="flex items-baseline gap-1 capitalize"
                >
                  <p className="-mb-1">
                    <span className="font-bold text-[#333]">
                      {toTitleCase(item.name)}
                    </span>
                    <span className="text-[#333]">, </span>
                    <span className="text-[#333]">{item.designation}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Speakers Tab */}
        {activeTab === "speakers" && (
          <div className="mt-3 px-2 sm:px-4 text-[15px] font-roboto leading-7 text-[#333] md:px-8 pb-8">
            {speakerHeading && (
              <div className="mb-3">
                <p className="text-center font-bold text-[#333] text-[15px] leading-7">
                  {speakerHeading}
                </p>
              </div>
            )}
            <div className="space-y-1">
              {eventData?.speakers?.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-baseline gap-1 capitalize"
                >
                  <p className="-mb-1">
                    <span className="font-bold text-[#333]">
                      {toTitleCase(item.speaker?.name)}
                    </span>
                    <span className="text-[#333]">, </span>
                    <span className="text-[#333]">
                      {item.speaker?.designation}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <div className="py-0 my-4 sm:px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0.5">
              {eventData?.gallery?.images?.map((img: string, index: number) => (
                <div key={index} className="overflow-hidden aspect-[235/156]">
                  <img
                    src={img}
                    onClick={() => {
                      setSelectedIndex(index);
                      setSelectedImage(img);
                    }}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "report" && reportUrl && (
          <div className="py-8">
            <div className="border border-gray-300 overflow-hidden shadow-sm">
              <iframe
                src={reportUrl}
                title="Summit Report"
                className="w-full h-[85vh]"
              />
            </div>
          </div>
        )}
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onMouseMove={() => setShowControls(true)}
        >
          {/* Close */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white text-5xl z-[1001] cursor-pointer"
          >
            ×
          </button>

          {/* Image */}
          <img
            src={selectedImage}
            alt="Gallery"
            className="max-h-screen max-w-[90vw] object-contain cursor-pointer"
            onClick={() => setShowControls((prev) => !prev)}
          />

          {/* Controls */}
          <div
            className={`absolute bottom-0 left-0 w-full h-12 bg-black flex items-center  justify-between px-24 md:px-80 transition-all duration-300 cursor-pointer
    ${showControls ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
  `}
          >
            <button
              onClick={prevImage}
              disabled={selectedIndex === 0}
              className={`text-5xl font-bold transition mb-2
      ${
        selectedIndex === 0
          ? "text-gray-500 cursor-not-allowed"
          : "text-white hover:text-gray-300 cursor-pointer"
      }`}
            >
              ‹
            </button>

            <button
              onClick={nextImage}
              disabled={selectedIndex === images.length - 1}
              className={`text-5xl font-bold transition mb-2
      ${
        selectedIndex === images.length - 1
          ? "text-gray-500 cursor-not-allowed"
          : "text-white hover:text-gray-300 cursor-pointer"
      }`}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditionOverview;
