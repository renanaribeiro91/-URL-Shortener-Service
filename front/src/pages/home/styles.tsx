import styled from "styled-components";

export const title = styled.h1`
  fontsize: 8rem;
`;

export const main = styled.div`
  width: 100%;
  flexdirection: column;
`;

export const subTitle = styled.span`
  display: flex;
  justifycontent: center;
`;

export const section = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const input = styled.input`
  height: 45px;
  width: 70%;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  font-size: 20px;
`;

export const button = styled.button`
  height: 45px;
  border-radius: 6px;
  width: 20%;
  font-size: 1.1rem;
  border: 0;
  font-weight: bold;
  margin-top: 25px;
`;

export const renanData = styled.div`
  width: 100%;
  position: absolute;
  justify-content: center;
  display:flex
  font-size: 12px;
  font-family: serif;
  color: #f3f3fd;
  animation: animate 1.5s linear infinite;

  a {
    color: #f3f3fd;
  }

  @keyframes animate {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      opacity: 0;
    }
  }
`;
