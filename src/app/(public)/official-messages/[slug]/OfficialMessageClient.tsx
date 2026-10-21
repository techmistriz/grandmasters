"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import NotFound from "@/src/components/common/NotFound";
import SponsorsCarousel from "@/src/components/common/SponsorsCarousel";
import OfficialMessages from "@/src/components/common/OfficialMessageSidebar";
import { useOfficialMessages } from "@/src/hooks/useOfficialMessages";
import { getOfficialMessageDetails } from "@/src/services/official-message.service";
import type { OfficialMessage } from "@/src/types/event.type";
import { getOfficialMessageSlug } from "@/src/utils/officialMessage";

function Spinner() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#D0252D]/20 border-t-[#D0252D]" />
    </div>
  );
}

export default function OfficialMessageClient() {
  const { slug } = useParams<{ slug: string }>();
  const { messagesByYear, loading: listLoading } = useOfficialMessages();

  // The old app passed the message id through router state, so the page
  // broke on refresh or when shared. Resolve the id from the slug instead.
  const messageId = Object.values(messagesByYear)
    .flat()
    .find((item) => getOfficialMessageSlug(item) === slug)?.id;

  const [message, setMessage] = useState<OfficialMessage | null>(null);
  const [loadedId, setLoadedId] = useState<number | null>(null);

  useEffect(() => {
    if (!messageId) return;

    let cancelled = false;

    getOfficialMessageDetails(messageId)
      .then((res) => {
        if (!cancelled) setMessage(res.data ?? null);
      })
      .catch((error) => {
        console.error("Failed to fetch official message:", error);
        if (!cancelled) setMessage(null);
      })
      .finally(() => {
        if (!cancelled) setLoadedId(messageId);
      });

    return () => {
      cancelled = true;
    };
  }, [messageId]);

  if (listLoading || (messageId && loadedId !== messageId)) {
    return <Spinner />;
  }

  if (!messageId || !message) {
    return <NotFound />;
  }

  return (
    <div className="font-roboto min-h-screen bg-white mt-16 lg:mt-[98px]">
      <div className="bg-[#d61f26] py-5 sm:py-6">
        <h1 className="font-roboto text-white text-center text-3xl sm:text-4xl md:text-[33px] tracking-tight font-normal leading-tight px-4">
          Official Messages
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-10">
        {/* LEFT */}
        <section className="official-message-content">
          <div
            dangerouslySetInnerHTML={{
              __html: message.speaker?.message || "",
            }}
          />
        </section>

        {/* RIGHT */}
        <div>
          <OfficialMessages />
        </div>
      </div>

      <h2 className="text-3xl text-center my-12">Sponsors & Partners</h2>

      <SponsorsCarousel />
    </div>
  );
}
