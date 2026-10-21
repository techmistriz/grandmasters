import api from "../network/axios";
import type {
  OfficialMessageDetailResponse,
  OfficialMessagesResponse,
} from "../types/event.type";

export const getOfficialMessages = async (
  eventTypeId: number,
): Promise<OfficialMessagesResponse> => {
  const res = await api.get(`/official-messages/${eventTypeId}`);
  return res.data;
};

export const getOfficialMessageDetails = async (
  id: number | string,
): Promise<OfficialMessageDetailResponse> => {
  const res = await api.get(`/official-message/${id}`);
  return res.data;
};
