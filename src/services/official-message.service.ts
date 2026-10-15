import api from "../network/axios";

export const getOfficialMessages = async (eventTypeId: number) => {
  const res = await api.get(`/official-messages/${eventTypeId}`);
  return res.data;
};

export const getOfficialMessageDetails = async (id: string) => {
  const res = await api.get(`/official-message/${id}`);
  return res.data;
};
