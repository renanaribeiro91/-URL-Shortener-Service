/* eslint-disable no-sequences */
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FiLink } from "react-icons/fi";
import { useEffect } from "react";
import LinkItem from "../../components/LinkItem";
import { useParams } from "react-router-dom";
import * as S from "./styles";
import { UrlParams } from "./interfaces";
import { HandleApi } from "./controller";

function Home() {
  const params = useParams<UrlParams>();
  const { hash } = params;
  const {
    data,
    handleRedirect,
    handleShortLink,
    showModal,
    setShowModal,
    link,
    setLink,
  } = HandleApi(hash);

  useEffect(() => {
    if (hash !== undefined) {
      handleRedirect();
    }
  }),
    [hash];

  const onChange = (e: any) => {
    setLink(e.target.value);
  };

  return (
    <>
      <S.renanData>
        <p>Nome: Renan Ribeiro</p>
        <p>Email: renan.admribeiro@gmail.com</p>
        <a
          href="https://www.linkedin.com/in/renanaribeiro91/"
          rel="noreferrer"
          target="_blank"
        >
          Linkedin: https://www.linkedin.com/in/renanaribeiro91/
        </a>
      </S.renanData>

      <S.main
        style={{
          width: "100%",
          flexDirection: "column",
        }}
      >
        <S.section>
          <S.title style={{ fontSize: "8rem" }}>Encurte sua URL</S.title>
          <S.subTitle style={{ display: "flex", justifyContent: "center" }}>
            <FiLink size={24} color="#fff" />
            Cole seu link para encurtar
          </S.subTitle>

          <S.input
            type="text"
            placeholder="Cole seu link aqui..."
            value={link}
            onChange={onChange}
          />

          <S.button onClick={handleShortLink}>Encurtar link</S.button>
        </S.section>
        {showModal && (
          <LinkItem content={data} closeModal={() => setShowModal(false)} />
        )}
      </S.main>
    </>
  );
}

export default Home;
