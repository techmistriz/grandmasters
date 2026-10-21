"use client";

import { useEffect, useState } from "react";
import { getOfficialMessages } from "../services/official-message.service";
import type { OfficialMessage } from "@/src/types/event.type";
import { APP_EVENT_TYPE } from "../config/eventType.config";
import { cachedRequest } from "../utils/cachedRequest";

export const useOfficialMessages = (eventTypeId: number = APP_EVENT_TYPE) => {
  const [messagesByYear, setMessagesByYear] = useState<
    Record<string, OfficialMessage[]>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await cachedRequest(
          `official-messages-${eventTypeId}`,
          () => getOfficialMessages(eventTypeId),
        );

        setMessagesByYear(response.data ?? {});
      } catch (err) {
        console.error("Failed to fetch official messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [eventTypeId]);

  return { messagesByYear, loading };
};
