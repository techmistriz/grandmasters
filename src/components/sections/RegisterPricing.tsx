"use client";

import { useState, type CSSProperties } from "react";

import CitySelectorModal from "@/src/components/common/CityPopup";
import EarlyBirdInterest from "@/src/components/sections/EarlyBirdInterest";
import { useEvents } from "@/src/hooks/useEvents";
import { usePlans } from "@/src/hooks/usePlans";
import type { Plan } from "@/src/types/event.type";

const PLAN_COLORS = ["#b9e3df", "#ebc9ec", "#9bc9fc", "#aaef92"];

const TAG_COLORS: Record<string, string> = {
  TRENDING: "#ff7a00",
  "MOST PREFERRED": "#2e9b22",
};
const DEFAULT_TAG_COLOR = "#D0252D";

// Badges for specific plans, matched on title; these win over the API tag.
const PLAN_TAGS: [match: string, tag: string][] = [
  ["corporate registration", "Trending"],
  ["annual pass", "Most Preferred"],
];

const getPlanTag = (plan: Plan) => {
  const title = (plan.title ?? "").toLowerCase();
  const match = PLAN_TAGS.find(([key]) => title.includes(key));

  return match ? match[1] : plan.tag?.trim();
};

function PlanTag({ tag }: { tag?: string | null }) {
  if (!tag) return null;

  const label = tag.toUpperCase();

  return (
    <div
      className="absolute left-1/2 top-[-16px] -translate-x-1/2 whitespace-nowrap rounded-[5px] px-[11px] py-[4px] text-[14px] leading-[25px] text-white"
      style={{ backgroundColor: TAG_COLORS[label] ?? DEFAULT_TAG_COLOR }}
    >
      {label}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="min-h-[350px] animate-pulse rounded-[9px] bg-gray-200 shadow-[0_7px_10px_rgba(0,0,0,0.25)]" />
  );
}

export default function RegisterPricing() {
  const { plans, loading: plansLoading } = usePlans();
  const { events, loading: eventsLoading } = useEvents();

  const loading = plansLoading || eventsLoading;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

  return (
    <section className="w-full font-roboto bg-[#f7f7f7] px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-[20px] font-medium text-[#D0252D] sm:text-[30px]">
            It&apos;s a Race Against Time. Avail Best Possible Discounts Now.
          </p>
          <h2 className="text-[34px] font-extrabold leading-[1.15] tracking-[-1.5px] text-[#333] sm:text-[42px]">
            Delegate Registrations
          </h2>

          <div className="mx-auto mt-[18px] h-[3px] w-[100px] bg-[#D0252D] sm:mt-[22px] sm:w-[120px]" />
        </div>

        <EarlyBirdInterest />

        {/* Cards. "Register Now" links target this grid, below the form. */}
        <div
          id="register-plans"
          className="grid scroll-mt-20 grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-5 md:scroll-mt-28 lg:grid-cols-4"
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : plans.map((plan, index) => (
                <div
                  key={plan.id}
                  className="relative flex min-h-[350px] flex-col rounded-[9px] border-[5px] border-[var(--plan-color)] bg-white px-3 pb-4 pt-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--plan-color)]"
                  style={
                    {
                      "--plan-color": PLAN_COLORS[index % PLAN_COLORS.length],
                    } as CSSProperties
                  }
                >
                  <PlanTag tag={getPlanTag(plan)} />

                  <div className="text-center">
                    <h3 className="mt-5 min-h-[22px] text-[16px] font-semibold leading-[22px] text-[#D0252D]">
                      {plan.title}
                    </h3>

                    <h4 className="mt-3 whitespace-nowrap text-[29px] font-bold leading-[34px] tracking-[-1.2px] text-[#222]">
                      ₹
                      {Number(plan.starting_price || 0).toLocaleString("en-IN")}{" "}
                      <span className="text-[17px]">Onwards</span>
                    </h4>

                    <div
                      className="mt-4 space-y-2 text-center text-[15px] leading-[21px] text-[#222] [&_p]:mb-2 [&_ul]:mt-2 [&_ul]:space-y-2 [&_li]:mb-2"
                      dangerouslySetInnerHTML={{
                        __html: plan.description ?? "",
                      }}
                    />
                  </div>

                  <div className="mt-auto flex justify-center pt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPlanId(plan.id);
                        setIsModalOpen(true);
                      }}
                      className="min-w-[129px] cursor-pointer rounded-[4px] border border-[#D0252D] bg-transparent px-5 py-[13px] text-center text-[14px] font-bold text-[#D0252D] transition-all duration-300 hover:bg-[#D0252D] hover:text-white"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Modal */}
      <CitySelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        events={events}
        selectedPlanId={selectedPlanId}
      />
    </section>
  );
}
