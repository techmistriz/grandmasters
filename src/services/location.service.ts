import api from "../network/axios";
import type { ApiResponse } from "../types/api.type";
import type { LocationOption } from "../types/order";

export const getCountries = async (): Promise<
  ApiResponse<LocationOption[]>
> => {
  const { data } = await api.get("/country");
  return data;
};

export const getStates = async (
  countryId: number,
): Promise<ApiResponse<LocationOption[]>> => {
  const { data } = await api.get(`/state?country_id=${countryId}`);
  return data;
};

export const getCities = async (
  stateId: number,
): Promise<ApiResponse<LocationOption[]>> => {
  const { data } = await api.get(`/cities?state_id=${stateId}`);
  return data;
};
