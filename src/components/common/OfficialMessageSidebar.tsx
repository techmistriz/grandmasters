"use client";

import Link from "next/link";

import { useOfficialMessages } from "@/src/hooks/useOfficialMessages";
import { getOfficialMessageHref } from "@/src/utils/officialMessage";

export default function OfficialMessagesSidebar() {
  const { messagesByYear, loading } = useOfficialMessages();

  const messageYears = Object.entries(messagesByYear)
    .map(([year, messages]) => ({ year, messages }))
    .sort((a, b) => Number(b.year) - Number(a.year));

  if (loading) {
    return (
      <div className="flex min-h-screen -mt-40 -ml-20 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#D0252D]/20 border-t-[#D0252D]" />
      </div>
    );
  }

  return (
    <aside className="font-roboto">
      {messageYears.map((yearData, i) => (
        <div key={yearData.year}>
          <h2 className="text-lg sm:text-xl font-normal text-[#333] mb-3 leading-tight">
            {yearData.year} Official Messages
          </h2>

          <div className="space-y-6">
            {yearData.messages.map((item) => (
              <div key={item.id}>
                <h3 className="font-bold text-sm sm:text-[15px] leading-6 sm:leading-7 text-[#333]">
                  {item.speaker?.name}
                </h3>

                <p className="text-sm sm:text-[15px] leading-6 sm:leading-7 text-[#333]">
                  {item.speaker?.designation}
                </p>

                {item.speaker?.company && (
                  <p className="text-xs sm:text-[12px] leading-5 sm:leading-6 text-[#333]">
                    {item.speaker.company}
                  </p>
                )}

                <Link
                  href={getOfficialMessageHref(item)}
                  className="mt-1 inline-block text-sm text-[#d61f26] hover:underline cursor-pointer"
                >
                  Read More...
                </Link>
              </div>
            ))}
          </div>

          {i !== messageYears.length - 1 && (
            <div className="border-b border-gray-300 my-6 sm:my-8" />
          )}
        </div>
      ))}
    </aside>
  );
}
