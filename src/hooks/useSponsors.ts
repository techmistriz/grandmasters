"use client";

import { useEffect, useState } from "react";
import { getSponsors } from "../services/homePage";
import type { Sponsor } from "@/src/types/event.type";
import { cachedRequest } from "../utils/cachedRequest";

export function useSponsors() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await cachedRequest("sponsors", getSponsors);

        setSponsors(response.data?.margedSponsors ?? []);
      } catch (err) {
        console.error("Failed to fetch sponsors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  return { sponsors, loading };
}
