// hooks/useOfficialMessageDetails.ts

import { useQuery } from "@tanstack/react-query";
import { getOfficialMessageDetails } from "../services/APIs/officialMessage";
// import { getOfficialMessageDetails } from "../services/APIs/officialMessageDetails";

export const useOfficialMessageDetails = (id?: string) => {
  return useQuery({
    queryKey: ["official-message", id],
    queryFn: () => getOfficialMessageDetails(id!),
    enabled: !!id,
  });
};
