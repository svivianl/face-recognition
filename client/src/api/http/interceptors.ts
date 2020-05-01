import { AxiosRequestConfig } from "axios";
import { getToken } from "../../types";

export const prepHeaderWithAuthToken = async (config: AxiosRequestConfig) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};
