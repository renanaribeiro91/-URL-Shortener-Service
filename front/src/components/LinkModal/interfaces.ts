import { Url } from "../../pages/home/interfaces";

export interface IProps {
  content?: Url;
  closeModal: () => void;
}

export interface LinkModalProps {
  showModal: boolean;
}
