import styled from "styled-components";

export const container = styled.div`
  width: 100%;
  flex-direction: column;
  align-items: center;
  display: flex;
  margin: 32px 0;
  position: absolute;
  top: 60rem;
  border-radius: 10px;
  background-color: rgb(255, 255, 255, 0.15);
  padding: 70px 0;
  font-size: 1.1rem;
`;

export const button = styled.button`
  background: transparent;
  border: none;
  display: flex;
  alignitems: center;
  line-height: 2;
  color: white;
  font-size:10px
`;

export const column = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;
