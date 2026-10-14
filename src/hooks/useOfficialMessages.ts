import { useQuery } from "@tanstack/react-query";
import { getOfficialMessages } from "../services/APIs/officialMessage";

export const useOfficialMessages = (eventTypeId: number = 1) => {
  return useQuery({
    queryKey: ["official-messages", eventTypeId],
    queryFn: () => getOfficialMessages(eventTypeId),

    staleTime: 1000 * 60 * 10, // 10 min cache
    refetchOnWindowFocus: false,
  });
};
