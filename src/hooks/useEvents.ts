import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../services/APIs/homePage";

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    placeholderData: (previousData) => previousData,
  });
};
