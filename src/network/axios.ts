import axios from "axios";
import { API_BASE_URL } from "../config/api.config";
import { getCartToken } from "./cartToken";

const api = axios.create({
  baseURL: API_BASE_URL,

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

const CART_TOKEN_PATHS = /^\/?(cart\/|order\/register|order\/verify-payment)/;

api.interceptors.request.use((config) => {
  if (config.url && CART_TOKEN_PATHS.test(config.url)) {
    const token = getCartToken();
    if (token) config.headers["X-Cart-Token"] = token;
  }
  return config;
});

export default api;
