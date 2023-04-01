import styled from "styled-components";
import { LinkModalProps } from "./interfaces";


export const ModalOverlay = styled.div<LinkModalProps>`
  display: ${({ showModal }) => (showModal ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  height: 200px;
  padding: 20px;
  border-radius: 8px;
  background-color: #b0b0b0;
`;

export const ModalTitle = styled.h2`
  margin-top: 0;
  font-size: 22px;
  font-weight: bold;
`;

export const ModalContent = styled.p`
  font-size: 20px;
  color: black;
`;

export const ModalActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const ModalButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #5e7fec;
  cursor: pointer;

  &:hover {
    background-color: #476cbb;
  }
`;