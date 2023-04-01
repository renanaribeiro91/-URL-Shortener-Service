import { FiClipboard, FiX } from "react-icons/fi";
import { IProps, LinkModalProps } from "./interfaces";
import * as S from "./styles";

function LinkModal({
  content,
  closeModal,
  showModal,
}: IProps & LinkModalProps) {
  const redirectUrl = content?.shortURL.replace(
    "http://localhost:8091/api/url/",
    "http://localhost:3000/"
  ) as string;

  function copyLink() {
    navigator.clipboard.writeText(redirectUrl);
    alert("URL copiada com sucesso!");
  }

  return (
    <S.ModalOverlay showModal={showModal}>
      <S.ModalContainer>
        <S.ModalTitle>Seus links</S.ModalTitle>
        <S.ModalContent>URL: {content?.fullURL}</S.ModalContent>
        <S.ModalContent>
          Link:
          <a
            href={content?.fullURL}
            rel="noreferrer"
            target="_blank"
            style={{ fontSize: "20px", color: "black" }}
          >
            {redirectUrl}
          </a>
        </S.ModalContent>
        <S.ModalActions>
          <S.ModalButton onClick={copyLink}>
            <FiClipboard size={20} color="white" />
            Copiar
          </S.ModalButton>
          <button onClick={closeModal}>
            <FiX size={24} color="#ec2d2d" />
          </button>
        </S.ModalActions>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
}

export default LinkModal;
