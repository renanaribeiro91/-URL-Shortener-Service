import styled from "styled-components";

export const container = styled.div`
  width: 95vw;
  max-height: 120px; // alterei esse
  flex-direction: column;
  align-items: center;
  display: flex;
  position: absolute;
  top: 40rem;
  border-radius: 100px;
  background-color: rgb(255, 255, 255, 0.15);
  padding: 70px 0;
  font-size: 1.1rem;
`;

export const column = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

export const button = styled.button`
  background: transparent;
  border: none;
  display: flex;
  alignitems: center;
  line-height: 2;
  color: white;
  font-size: 10px;
`;
