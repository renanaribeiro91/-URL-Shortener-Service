import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import headersEndpoints from "../consts/headerEnponit";
import { endPonit } from "../consts/endponits";

const baseApi: AxiosInstance = axios.create({
  headers: headersEndpoints,
  baseURL: endPonit,
});

const addRequestHeader = (config: AxiosRequestConfig) => {
  const commonHeaders: AxiosRequestConfig["headers"] = {
    ...headersEndpoints,
  };

  return {
    ...config,
    headers: {
      ...commonHeaders,
      ...config.headers,
    },
  };
};

export const request = (config: AxiosRequestConfig): Promise<AxiosResponse> => {
  return baseApi
    .request(addRequestHeader(config))
    .catch((error: AxiosError) => {
      return Promise.reject(error);
    });
};
