/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from "axios";
import { request } from "../adapters/RequisicaoAdapter";
import headersEndpoints from "../consts/headerEnponit";

const headers: AxiosRequestConfig["headers"] = {
  ...headersEndpoints,
};

class UrlService {
  static async createUrl(body: any): Promise<any> {
    return request({
      url: "/generate",
      method: "POST",
      headers,
      data: {
        fullURL: body,
      },
    }).then((response) => {
      return response.data;
    });
  }

  static async buscarUrl(data: any): Promise<string> {
    return request({
      url: `${data}`,
      method: "GET",
      headers,
    }).then((response) => {
      return response.data;
    });
  }
}

export default UrlService;
