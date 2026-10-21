import { APP_EVENT_TYPE } from "../config/eventType.config";
import api from "../network/axios";
import type {
  EventDetailResponse,
  PastEditionsResponse,
} from "../types/event.type";

export const getPastEdition = async (): Promise<PastEditionsResponse> => {
  const response = await api.get(`/events/${APP_EVENT_TYPE}`, {
    params: {
      is_past_edition: 1,
    },
  });

  return response.data;
};

export const getPastEditionDetail = async (
  idOrSlug: number | string,
): Promise<EventDetailResponse> => {
  const res = await api.get(`/event/${idOrSlug}`);
  return res.data;
};
