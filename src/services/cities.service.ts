import api from "../network/axios";

export const getCities = async () => {
  const { data } = await api.get("/event-cities");
  console.log("Cities", data);
  return data;
};
