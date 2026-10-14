// hooks/usePlans.ts
import { useQuery } from "@tanstack/react-query";
import { getPlans } from "../services/APIs/plans";

export const usePlans = () => {
  return useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    placeholderData: (previousData) => previousData,
  });
};
