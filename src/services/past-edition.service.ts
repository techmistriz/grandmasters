import { APP_EVENT_TYPE } from "../constant/config";
import api from "../network/axios";

export const getPastEdition = async () => {
  const response = await api.get(`/events/${APP_EVENT_TYPE}`, {
    params: {
      is_past_edition: 1,
    },
  });

  return response.data;
};

export const getPastEditionDetail = async (idOrSlug: number | string) => {
  const res = await api.get(`/event/${idOrSlug}`);
  console.log(res);
  return res;
};
