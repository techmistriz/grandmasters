"use client";

import { useEffect, useState } from "react";
import { getPlans } from "../services/homePage";
import type { Plan } from "@/src/types/event.type";
import { cachedRequest } from "../utils/cachedRequest";

export const usePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await cachedRequest("plans", getPlans);

        setPlans(response.data ?? []);
      } catch (err) {
        console.error("Failed to fetch plans:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return { plans, loading };
};
