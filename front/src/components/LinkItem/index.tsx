import { FiClipboard, FiX } from "react-icons/fi";
import { IProps } from "./interfaces";
import * as S from "./styles";

function LinkItem({ content, closeModal }: IProps) {
  const redirectUrl = content?.shortURL.replace(
    "http://localhost:8091/api/url/",
    "http://localhost:3000/"
  ) as string;

  function copyLink() {
    navigator.clipboard.writeText(redirectUrl);
    alert("URL copiada com sucesso!");
  }

  return (
    <S.container>
      <S.column>
        Seus links :
        <S.button onClick={closeModal}>
          <FiX size={28} color="#ec2d2d" />
        </S.button>
      </S.column>

      <span style={{ marginBottom: "29px", fontSize: "25px" }}>
        URL : {content?.fullURL}
      </span>

      <S.column>
        LINK :
        <a
          href={content?.fullURL}
          rel="noreferrer"
          target="_blank"
          style={{ fontSize: "25px", color: "black" }}
        >
          {redirectUrl}
        </a>
        <S.button onClick={copyLink}>
          <FiClipboard size={20} color="#5e7fec" />
          copy
        </S.button>
      </S.column>
    </S.container>
  );
}

export default LinkItem;
