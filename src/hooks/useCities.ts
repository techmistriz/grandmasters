import { useQuery } from "@tanstack/react-query";
import { getCities } from "../services/cities.service";

export const useCities = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
