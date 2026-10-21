import Link from "next/link";

import { EVENT_CONFIG } from "@/src/config/event";

const links = [
  { label: "SPEAK", href: "/#speak" },
  { label: "SPONSOR", href: "/#sponsor" },
  EVENT_CONFIG.registrationOpen
    ? { label: "REGISTER NOW", href: "/#register" }
    : { label: "SUMMIT GALLERY", href: "/#gallery" },
  { label: "CONNECT", href: "/#connect" },
];

// The "Get Involved" banner shared by the Concept and Speakers sections.
export default function GetInvolvedCTA() {
  return (
    <div
      className="relative w-full bg-center bg-cover py-12 px-4 text-white"
      style={{ backgroundImage: "url(/images/chess.jpg)" }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 text-center">
        <h2 className="font-roboto text-3xl sm:text-4xl md:text-[50px] font-bold leading-tight md:leading-[55px] md:tracking-tighter">
          Get Involved
        </h2>

        <p className="my-4 font-roboto text-[15px] font-normal leading-[28px]">
          All that You’d Like to Know about The Grand Masters 2026
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 mt-8">
          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="w-[65%] sm:w-auto min-w-0 sm:min-w-[180px] border border-white rounded-md py-3 px-6 mx-0 md:mx-10 md:py-4 text-sm font-bold tracking-[0.2rem] leading-[14px] text-center transition-colors hover:bg-[#D0252D]"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
