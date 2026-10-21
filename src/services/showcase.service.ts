import api from "../network/axios";

interface ShowcasePayload {
  event_type_id: number;
  form_type: string;
  name: string;
  email: string;
  phone: string;
  confirmation?: boolean;
  captcha: string;
}

export const submitShowcase = async (payload: ShowcasePayload) => {
  const { confirmation, ...rest } = payload;

  // Only the Get Involved form has the updates checkbox.
  const res = await api.post("/showcase", {
    ...rest,
    ...(confirmation !== undefined && { confirmation: confirmation ? 1 : 0 }),
  });

  return res.data;
};
