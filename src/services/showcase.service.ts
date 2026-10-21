import api from "../network/axios";

interface ShowcasePayload {
  event_type_id: number;
  form_type: string;
  name: string;
  email: string;
  phone: string;
  confirmation: boolean;
  captcha: string;
}

export const submitShowcase = async (payload: ShowcasePayload) => {
  const res = await api.post("/showcase", {
    ...payload,
    confirmation: payload.confirmation ? 1 : 0,
  });

  return res.data;
};
