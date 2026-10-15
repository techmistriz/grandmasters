import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import icon4 from "../assets/icons/icon4.png";
import { getPlans } from "../services/plans.service";
import CitySelectorModal from "./CityPopup";
import { getEvents } from "../services/homepage.service";
import { usePlans } from "../hooks/usePlans";
import { useEvents } from "../hooks/useEvents";

const RegisterPricing = () => {
  const navigate = useNavigate();

  const { data: plansData, isLoading: plansLoading } = usePlans();

  const { data: eventsData, isLoading: eventsLoading } = useEvents();

  const loading = plansLoading || eventsLoading;

  const plan = plansData?.data || [];
  const events = eventsData?.data?.events || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

  const cardColors = [
    "bg-[#C2E5DF]",
    "bg-[#F3D4F3]",
    "bg-[#FFCAA4]",
    "bg-[#FFE9AE]",
  ];

  const SkeletonCard = () => (
    <div className="animate-pulse flex flex-col pt-8 pb-5 px-4 md:px-6 rounded-xl bg-white shadow-[6px_6px_10px_rgba(0,0,0,0.1)]">
      <div className="h-4 w-20 bg-gray-300 rounded mx-auto mb-4"></div>
      <div className="h-5 w-32 bg-gray-300 rounded mx-auto mb-4"></div>
      <div className="h-6 w-40 bg-gray-300 rounded mx-auto mb-4"></div>

      <div className="space-y-2 mb-8">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto"></div>
        <div className="h-3 bg-gray-200 rounded w-4/6 mx-auto"></div>
      </div>

      <div className="h-10 w-28 bg-gray-300 rounded mx-auto"></div>
    </div>
  );

  const handleCitySelect = (cityName: string) => {
    setIsModalOpen(false);

    navigate("/cart", {
      state: { city: cityName, planId: selectedPlanId },
    });
  };

  return (
    <section className="py-4 md:pb-16 font-roboto bg-[#f5f5f5]">
      {/* Header */}
      <div className="font-roboto max-w-6xl mx-auto text-center mb-8 px-4 md:px-2">
        <div className="flex justify-center">
          <img
            src={icon4}
            className="text-3xl md:text-4xl h-24 text-[#D0252D]"
          />
        </div>

        <h2 className="text-[34px] sm:text-4xl md:text-[50px] md:tracking-tighter font-normal leading-tight md:leading-[55px] text-[#333] mb-3 px-2">
          {" "}
          Delegate Registrations
        </h2>

        <p className="text-[#333] text-[15px] md:text-[15px] font-normal leading-7 px-2 md:px-0">
          {" "}
          It's a Race Against Time. Avail Best Possible Discounts Now.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 items-stretch">
        {" "}
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : (plan ?? []).map((tier: any, index: number) => (
              <div
                key={tier?.id || index}
                className={`relative flex flex-col pt-8 pb-6 px-5 md:px-6 rounded-xl shadow-[6px_6px_10px_rgba(0,0,0,0.26)] ${
                  cardColors[index % cardColors.length]
                }`}
              >
                {tier?.tag && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded text-white text-[11px] md:text-sm font-medium tracking-wide bg-[#D0252D]">
                    {tier.tag}
                  </div>
                )}

                <h3 className="font-roboto text-[#D0252D] font-bold -mt-3 text-base md:text-[17px] tracking-tighter leading-tight min-h-[48px] flex items-center justify-center text-center whitespace-nowrap">
                  {tier?.title}
                </h3>

                <div className="text-[28px] md:text-[26px] font-bold font-roboto leading-tight text-[#333] mb-4 text-center">
                  ₹{Number(tier?.starting_price || 0).toLocaleString()} Onwards
                </div>

                <div
                  className="font-roboto flex-grow mb-8 text-center text-sm leading-relaxed space-y-2"
                  dangerouslySetInnerHTML={{ __html: tier.description }}
                />

                <button
                  onClick={() => {
                    setSelectedPlanId(tier?.id);
                    setIsModalOpen(true);
                  }}
                  className={`font-custom mt-auto w-35 mx-auto py-3 px-4  border border-[#D0252D] rounded-md font-bold text-[#D0252D]  hover:bg-[#D0252D] hover:text-white cursor-pointer transition-colors `}
                >
                  Book Now
                </button>
              </div>
            ))}
      </div>

      {/* Modal */}
      <CitySelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        events={events ?? []}
        selectedPlanId={selectedPlanId}
      />
    </section>
  );
};

export default RegisterPricing;
