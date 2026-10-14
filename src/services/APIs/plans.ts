import api from "../axios";

export const getPlans = async () => {
  try {
    const { data } = await api.get("/plans");
    return data;
  } catch (error: any) {
    throw error;
  }
};
