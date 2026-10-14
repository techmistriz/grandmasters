import React, { useEffect, useState } from "react";
import defaultImg from "../assets/images.png";
import { useNavigate } from "react-router-dom";
import { getPastEdition } from "../services/APIs/pastEdition";

type EventItem = {
  slug: any;
  id: number;
  title: string;
  city?: {
    name: string;
  };
  image?: string | null;
};

type EventSection = {
  year: number;
  events: EventItem[];
};

const imgUrl = import.meta.env.VITE_PASTEDITIONS_BASE_URL;

const PastEdition = () => {
  const navigate = useNavigate();

  const [sections, setSections] = useState<EventSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const res = await getPastEdition();

        const eventsData = res?.data?.events || [];

        // setSections(eventsData);

        const sortedData = [...eventsData].sort((a, b) => b.year - a.year);

        setSections(sortedData);
      } catch (error) {
        console.error("PAST EDITION API ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    dataFetch();
  }, []);

  console.log("past edition data", sections);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#D0252D]/20 border-t-[#D0252D]" />
      </div>
    );
  }

  // if (loading) {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center bg-white">
  //       <div className="flex items-center gap-3">
  //         <span className="relative flex h-5 w-5">
  //           <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D0252D] opacity-75"></span>
  //           <span className="relative inline-flex h-5 w-5 rounded-full bg-[#D0252D]"></span>
  //         </span>

  //         {/* <span className="font-semibold tracking-widest text-[#D0252D]">
  //         LOADING..
  //       </span> */}
  //       </div>
  //     </div>
  //   );
  // }

  if (!sections.length) {
    return (
      <div className="mt-[120px] text-center">
        <h2 className="text-xl font-semibold">No Past Editions Found</h2>

        {/* <pre className="mt-4 text-left bg-gray-100 p-4 rounded">
          {JSON.stringify(sections, null, 2)}
        </pre> */}
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-[66px] md:mt-[98px] bg-white">
      {sections.map((section, index) => {
        return (
          <div key={section?.year || index} className="mb-10">
            <div className="bg-[#d12229] py-8">
              <h1 className="font-roboto text-center text-[22px] md:text-[35px] font-normal -tracking-wider text-white">
                The Grand Masters {section?.year} Editions
              </h1>
            </div>

            <div className="mx-auto max-w-6xl px-6 py-10">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                {section?.events?.map((event) => {
                  return (
                    <div
                      key={event?.id}
                      className="border border-gray-300 bg-white shadow-xl"
                    >
                      <div className="p-8">
                        <img
                          onClick={() => {
                            navigate(`/${event.slug}-edition-an-overview`);
                          }}
                          src={
                            event?.image
                              ? `${imgUrl}/${event.image}`
                              : defaultImg
                          }
                          alt={event?.title}
                          className="w-full object-contain cursor-pointer"
                          onError={(e) => {
                            e.currentTarget.src = image;
                          }}
                        />
                      </div>

                      <div className="pb-4 text-center">
                        <h2
                          onClick={() => {
                            navigate(`/${event.slug}-edition-an-overview`);
                          }}
                          className="font-roboto text-[20px] font-normal text-[#d71920] hover:underline cursor-pointer"
                        >
                          {event?.title}
                        </h2>

                        <p className="mt-2 text-[16px] text-[#b3b2b2]">
                          {event?.city?.name}
                        </p>

                        {/* <p className="text-sm text-gray-500">
                          {event?.date}
                        </p> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PastEdition;
