/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FiLink } from "react-icons/fi";

import { useEffect, useState } from "react";
import LinkItem from "../../components/LinkItem";

import { useNavigate, useParams } from "react-router-dom";
import { UrlParams } from "../../components/LinkItem/interfaces";
import UrlService from "../../services/url";
import * as S from "./styles";
import NotFound from "../notFound";

export interface Url {
  fullURL: string;
  shortURL: string;
}

function Home() {
  const [link, setLink] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState();
  const params = useParams<UrlParams>();

  const navigate = useNavigate();
  const { hash } = params;

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
    }
  };

  useEffect(() => {
    handleRedirect();
  }),
    [hash];

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

  const onChange = (e: any) => {
    setLink(e.target.value);
  };

  return (
    <>
      <header>Renan Ribeiro</header>

      <div
        style={{
          width: "100%",
          flexDirection: "column",
        }}
      >
        <S.section>
          <h1 style={{ fontSize: "8rem" }}>Encurte sua URL</h1>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FiLink size={24} color="#fff" />
            <span>Cole seu link para encurtar</span>
          </div>

          <S.input
            type="text"
            placeholder="Cole seu link aqui..."
            value={link}
            onChange={onChange}
          />

          <S.button onClick={handleShortLink}>Encurtar link</S.button>
        </S.section>
        {showModal && (
          <LinkItem
            hash={hash}
            content={data}
            closeModal={() => setShowModal(false)}
          />
        )}
      </div>
    </>
  );
}

export default Home;
