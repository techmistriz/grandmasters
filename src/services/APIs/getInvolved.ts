import api from "../axios";

export const submitShowcase = async (payload: {
  event_type_id: string;
  name: string;
  email: string;
  phone: string;
  confirmation: boolean;
}) => {
  const res = await api.post("/showcase", {
    ...payload,
    confirmation: payload.confirmation ? 1 : 0,
  });

  return res.data;
};
