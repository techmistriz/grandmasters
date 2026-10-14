import { useQuery } from "@tanstack/react-query";
import { getCities } from "../services/APIs/cities";

export const useCities = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
