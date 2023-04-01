import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UrlService from "../../../services/url";
import { Url } from "../interfaces";

function getErrorMessage(error: any) {
  const status = error?.response?.status;

  switch (status) {
    case 400:
      return "Url inválida, favor tente novamente.";
    case 404:
      return "Nenhuma url encontrada, favor tente novamente.";
    case 409:
      return "Url já registrada, favor tente novamente.";
    default:
      return "Ops! Parece que algo deu errado.";
  }
}

export const useHandleApi = (hash: string) => {
  const [link, setLink] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<Url>();
  const navigate = useNavigate();

  const handleRedirect = async () => {
    try {
      const shortUrl = await UrlService.buscarUrl(hash);

      window.location.replace(shortUrl);
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);

      alert(errorMessage);

      if (hash && error.response.status === 404) {
        navigate("/");
      }
    }
  };

  async function handleShortLink() {
    try {
      const generateShortUrl = await UrlService.createUrl(link);

      setData(generateShortUrl);
      setShowModal(true);
    } catch (err: any) {
      const errorMessage = getErrorMessage(err);

      alert(errorMessage);
    }

    setLink("");
  }

  return {
    handleRedirect,
    handleShortLink,
    data,
    showModal,
    setShowModal,
    setLink,
    link,
  };
};