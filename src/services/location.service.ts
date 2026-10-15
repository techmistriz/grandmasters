import api from "../network/axios";

export const getCountries = async () => {
  const { data } = await api.get("/country");
  return data;
};

export const getStates = async (countryId: number) => {
  const { data } = await api.get(`/state?country_id=${countryId}`);
  return data;
};

export const getCities = async (stateId: number) => {
  const { data } = await api.get(`/cities?state_id=${stateId}`);
  return data;
};
