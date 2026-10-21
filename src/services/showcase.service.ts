import api from "../network/axios";

interface ShowcasePayload {
  event_type_id: number;
  form_type: string;
  name: string;
  email: string;
  phone: string;
  captcha: string;
}

export const submitShowcase = async (payload: ShowcasePayload) => {
  const res = await api.post("/showcase", payload);

  return res.data;
};
