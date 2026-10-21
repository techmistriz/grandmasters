"use client";

import { useEffect, useState } from "react";
import { getEventCities } from "../services/homePage";
import type { EventCity } from "@/src/types/event.type";
import { cachedRequest } from "../utils/cachedRequest";

export const useEventCities = () => {
  const [cities, setCities] = useState<EventCity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await cachedRequest("event-cities", getEventCities);

        setCities(response.data ?? []);
      } catch (err) {
        console.error("Failed to fetch cities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  return { cities, loading };
};
