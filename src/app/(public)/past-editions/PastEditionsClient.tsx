"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getPastEdition } from "@/src/services/past-edition.service";
import type { PastEditionSection } from "@/src/types/event.type";
import {
  DEFAULT_SPONSOR_IMAGE,
  getPastEditionImageUrl,
  handleImageError,
} from "@/src/utils/image";

export default function PastEditionsClient() {
  const [sections, setSections] = useState<PastEditionSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPastEditions = async () => {
      try {
        const res = await getPastEdition();
        const eventsData = res.data?.events ?? [];

        setSections([...eventsData].sort((a, b) => b.year - a.year));
      } catch (error) {
        console.error("Failed to fetch past editions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPastEditions();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#D0252D]/20 border-t-[#D0252D]" />
      </div>
    );
  }

  if (!sections.length) {
    return (
      <div className="mt-[120px] text-center">
        <h2 className="text-xl font-semibold">No Past Editions Found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-[66px] md:mt-[98px] bg-white">
      {sections.map((section, index) => {
        return (
          <div key={section.year || index} className="mb-10">
            <div className="bg-[#d12229] py-8">
              <h1 className="font-roboto text-center text-[22px] md:text-[35px] font-normal -tracking-wider text-white">
                The Grand Masters {section.year} Editions
              </h1>
            </div>

            <div className="mx-auto max-w-6xl px-6 py-10">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                {section.events?.map((event) => {
                  return (
                    <div
                      key={event.id}
                      className="border border-gray-300 bg-white shadow-xl"
                    >
                      <div className="p-8">
                        <Link href={`/${event.slug}-edition-an-overview`}>
                          <img
                            src={getPastEditionImageUrl(event.image)}
                            alt={event.title}
                            className="w-full object-contain cursor-pointer"
                            onError={handleImageError(DEFAULT_SPONSOR_IMAGE)}
                          />
                        </Link>
                      </div>

                      <div className="pb-4 text-center">
                        <h2 className="font-roboto text-[20px] font-normal text-[#d71920] px-12">
                          <Link
                            href={`/${event.slug}-edition-an-overview`}
                            className="hover:underline"
                          >
                            {event.title}
                          </Link>
                        </h2>

                        <p className="mt-2 text-[16px] text-[#b3b2b2]">
                          {event.city?.name}
                        </p>
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
}
