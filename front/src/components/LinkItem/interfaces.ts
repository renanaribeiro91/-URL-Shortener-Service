import { Params } from "react-router-dom";
import { Url } from "../../pages/home";

export interface IProps {
  hash?: UrlParams
  content?: Url;
  closeModal: () => void;
}

export interface UrlParams extends Params {
  hash: any
}
