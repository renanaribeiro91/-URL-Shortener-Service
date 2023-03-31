import { Params } from "react-router-dom";

export interface UrlParams extends Params {
  hash: any;
}

export interface Url {
  fullURL: string;
  shortURL: string;
}