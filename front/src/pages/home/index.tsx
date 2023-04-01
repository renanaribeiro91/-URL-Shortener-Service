/* eslint-disable no-sequences */
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect } from "react";
import { FiLink } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useHandleApi } from "./controller";
import { UrlParams } from "./interfaces";
import * as S from "./styles";
import LinkModal from "../../components/LinkModal";

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
  } = useHandleApi(hash);

  useEffect(() => {
    if (hash !== undefined) {
      handleRedirect();
    }
  }, [hash, handleRedirect]);

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
      <audio controls autoPlay>
        <source src="/interStellar.mp3" type="audio/mp3" />
      </audio>

      <S.main>
        <S.section>
          <S.title>Encurte sua URL</S.title>
          <S.subTitle>
            <FiLink size={24} color="#fff" />
            Cole seu link para encurtar
          </S.subTitle>

          <S.input
            type="text"
            placeholder="Cole seu link aqui..."
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />

          <S.button onClick={handleShortLink}>Encurtar link</S.button>
        </S.section>

        {showModal && (
          <LinkModal
            showModal={showModal}
            content={data}
            closeModal={() => setShowModal(false)}
          />
        )}
      </S.main>
    </>
  );
}

export default Home;
