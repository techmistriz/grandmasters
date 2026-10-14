// hooks/useSponsors.ts

import { useQuery } from "@tanstack/react-query";
import { getSponsors } from "../services/APIs/homePage";

export const useSponsors = () => {
  return useQuery({
    queryKey: ["sponsors"],
    queryFn: getSponsors,
    staleTime: 1000 * 60 * 10,
  });
};
