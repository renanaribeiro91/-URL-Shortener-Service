import { useState } from "react";
import UrlService from "../../../services/url";
import { useNavigate } from "react-router-dom";
import { Url } from "../interfaces";

export const HandleApi = (hash: string) => {
  const [link, setLink] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<Url>();
  const navigate = useNavigate();

  const handleRedirect = async () => {
    try {
      const shortUrl = await UrlService.buscarUrl(hash);

      window.location.replace(shortUrl);
    } catch (error: any) {
      if (hash && error.response.status === 404) {
        alert("Nenhuma url encontrada, favortente novamente");
        navigate("/");

        return;
      }
      throw Error("Erro inesperado", error);
    }
  };

  async function handleShortLink() {
    try {
      const generateShortUrl = await UrlService.createUrl(link);

      setData(generateShortUrl);
      setShowModal(true);
    } catch (err: any) {
      if (err?.response.status === 409) {
        setLink("");
        return alert("Url já registrada , favor tente novamente");
      }
      if (err?.response.status === 400) {
        setLink("");
        return alert("Url inválida , favor tente novamente");
      }

      alert("Ops! Parece que algo deu errado!");
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
