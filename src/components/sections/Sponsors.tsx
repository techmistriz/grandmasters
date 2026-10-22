"use client";

import { useSponsors } from "@/src/hooks/useSponsors";
import type { Sponsor } from "@/src/types/event.type";
import {
  DEFAULT_SPONSOR_IMAGE,
  getSponsorImageUrl,
  handleImageError,
} from "@/src/utils/image";

export default function Sponsors() {
  const { sponsors } = useSponsors();

  // Same card layout as BFLS: the first sponsor gets a larger centred card,
  // the rest sit in a 4-column grid.
  const renderSponsor = (item: Sponsor, index: number, isFeatured = false) => (
    <div
      key={item.id ?? index}
      className={`group relative flex flex-col items-center justify-center border border-[#e1e8f1] bg-white px-4 transition-all duration-300 hover:z-10 ${
        isFeatured ? "h-[175px] w-full max-w-[420px]" : "h-[156px]"
      }`}
    >
      <p className="absolute left-0 right-0 top-[11px] text-center text-[16px] font-semibold text-[#777] font-roboto">
        {item.sponsor_type}
      </p>

      <div
        className={`relative mt-[12px] ${
          isFeatured ? "h-[126px] w-[279px]" : "h-[75px] w-[180px]"
        } max-w-full`}
      >
        <a
          href={item.website_url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${item.title || item.sponsor_type} website`}
          onClick={(e) => !item.website_url && e.preventDefault()}
          className="block h-full w-full"
        >
          <img
            src={getSponsorImageUrl(item.image)}
            alt={item.title || item.sponsor_type}
            className={`h-full w-full object-contain ${
              item.website_url ? "cursor-pointer" : "cursor-default"
            }`}
            onError={handleImageError(DEFAULT_SPONSOR_IMAGE)}
          />
        </a>
      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-white py-10 md:pb-20 px-4">
      {/* Floating decorations, as on BFLS */}
      <div className="sponsor-lightning pointer-events-none absolute left-[12%] top-[105px] hidden lg:block">
        <svg
          width="42"
          height="55"
          viewBox="0 0 42 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M28 2L8 27H21L15 53L35 24H22L28 2Z"
            stroke="#dfe3e9"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="sponsor-wave pointer-events-none absolute right-[15%] top-[150px] hidden lg:block">
        <svg
          width="82"
          height="42"
          viewBox="0 0 82 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 22C10 22 10 10 18 10C26 10 26 28 34 28C42 28 42 12 50 12C58 12 58 25 66 25C74 25 74 14 80 14"
            stroke="#dfe3e9"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="sponsor-wave-left pointer-events-none absolute left-[4%] top-[390px] hidden lg:block">
        <svg
          width="75"
          height="35"
          viewBox="0 0 75 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 17C10 17 10 7 18 7C26 7 26 22 34 22C42 22 42 9 50 9C58 9 58 20 66 20C69 20 71 17 73 17"
            stroke="#dfe3e9"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="sponsor-circle pointer-events-none absolute right-[9%] top-[310px] hidden h-[19px] w-[19px] rounded-full border-[2px] border-[#dfe3e9] lg:block" />

      <div className="sponsor-dot pointer-events-none absolute left-[6.5%] top-[235px] hidden h-[8px] w-[8px] rounded-full bg-[#dfe3e9] lg:block" />

      <div className="relative z-10 max-w-6xl px-6 mx-auto">
        {/* Icon */}
        <div className="flex justify-center">
          <img
            src="/icons/icon7.png"
            alt=""
            className="w-8 h-8 md:w-30 md:h-20"
          />
        </div>

        {/* Heading */}
        <h2 className="text-center text-[#333] mb-8 md:mb-8 text-3xl sm:text-4xl md:text-[50px] font-normal leading-tight md:tracking-tighter md:leading-[55px] font-roboto">
          Sponsors & Partners
        </h2>

        <div className="mx-auto mt-10 max-w-[1130px]">
          {/* First sponsor: centred, full row */}
          {sponsors.length > 0 && (
            <div className="flex justify-center">
              {renderSponsor(sponsors[0], 0, true)}
            </div>
          )}

          {/* Remaining sponsors */}
          {sponsors.length > 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {sponsors
                .slice(1)
                .map((item, index) => renderSponsor(item, index + 1))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .sponsor-lightning {
          animation: sponsorLightning 4s ease-in-out infinite;
        }

        .sponsor-wave {
          animation: sponsorWave 5s ease-in-out infinite;
        }

        .sponsor-wave-left {
          animation: sponsorWaveLeft 4.5s ease-in-out infinite;
        }

        .sponsor-circle {
          animation: sponsorCircle 4s ease-in-out infinite;
        }

        .sponsor-dot {
          animation: sponsorDot 3s ease-in-out infinite;
        }

        @keyframes sponsorLightning {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(4deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        @keyframes sponsorWave {
          0% {
            transform: translate(0px, 0px);
          }
          50% {
            transform: translate(8px, -8px);
          }
          100% {
            transform: translate(0px, 0px);
          }
        }

        @keyframes sponsorWaveLeft {
          0% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(10px);
          }
          100% {
            transform: translateX(0px);
          }
        }

        @keyframes sponsorCircle {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes sponsorDot {
          0% {
            transform: translateY(0px);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-12px);
            opacity: 1;
          }
          100% {
            transform: translateY(0px);
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  );
}
