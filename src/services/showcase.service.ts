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
    event_type_id: payload.event_type_id,
    form_type: payload.form_type,
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    confirmation: payload.confirmation ? 1 : 0,
    captcha: payload.captcha,
  });

  return res.data;
};
