import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import TestContext from "../contexts/TestContext";
import { getTests, getTestsParams } from "../services/repoProvas";
import { storeTestCreationParams } from "../services/testCreationPersistence";
import { storeTestsArray } from "../services/testPersistence";

export default function Home() {
  const navigate = useNavigate();
  const { setTests, setTestsParams } = useContext(TestContext);

  const handleTests = () => {
    getTests().then((res) => {
      setTests(res.data);
      storeTestsArray(res.data);
      navigate("/test-form");
    });
  };

  const handleTestsParams = () => {
    getTestsParams()
      .then((res) => {
        setTestsParams(res.data);
        storeTestCreationParams(res.data);
        navigate("/test-creation");
      })
      .catch(() => {
        alert("Ocorreu um erro inesperado, tente novamente mais tarde");
        navigate("/");
      });
  };

  return (
    <OuterContainer>
      <Title>
        <div>
          <h2>RepoProvas</h2>
        </div>
      </Title>
      <OptionContainer>
        <div>
          <h1>Visualizar prova</h1>
        </div>
        <Close>
          <span onClick={handleTests}>Acessar</span>
          <svg width="15px" height="10px" viewBox="0 0 13 10">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
        </Close>
      </OptionContainer>
      <OptionContainer>
        <div>
          <h1>Compartilhar prova</h1>
        </div>
        <Close>
          <span onClick={handleTestsParams}>Acessar</span>
          <svg width="15px" height="10px" viewBox="0 0 13 10">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
        </Close>
      </OptionContainer>
    </OuterContainer>
  );
}

const cursorBlink = keyframes`
    0%,
     75% {
         opacity: 1
     }
     76%,
     100% {
         opacity: 0
     }
`;

const type = keyframes`
    0%,
     100% {
         width: 0px
     }
     30%,
     60% {
         width: 100%;
     }
`;

const OuterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 6rem;
  background-size: 100%;
  z-index: 0;

  div::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 2px;
    height: 100%;
    background: #fff;
    animation: ${cursorBlink} 0.8s steps(3) infinite;
  }
  div {
    position: relative;
    -webkit-box-reflect: below 1px linear-gradient(transparent, #3333);
    h2 {
      position: relative;
      color: #fff;
      letter-spacing: 5px;
      font-size: 2rem;
      overflow: hidden;
      margin-bottom: 0;
      animation: ${type} 5s steps(11) infinite;
    }
  }
`;

const OptionContainer = styled.div`
  height: 10rem;
  width: 20rem;
  border-radius: 10px;
  background: linear-gradient(225deg, #3d3d3d, #494949);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  margin-bottom: 2rem;

  div {
    width: 100%;
    word-break: break-all;
    margin-bottom: 2rem;
  }

  h1 {
    color: #fff;
    text-align: center;
    font-weight: bold;
    color: gold;
  }

  @media (max-width: 330px) {
    width: 100%;
  }
`;

const Close = styled.button`
  position: relative;
  margin: auto;
  padding: 10px 18px;
  transition: all 0.2s ease;
  background: none;

  :before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    border-radius: 10px;
    background-image: linear-gradient(hsl(206, 86%, 63%), hsl(206, 56%, 44%));
    width: 45px;
    height: 40px;
    transition: all 0.3s ease;
  }

  span {
    position: relative;
    font-family: "Ubuntu", sans-serif;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: #fff;
  }
  svg {
    position: relative;
    top: 0;
    margin-left: 10px;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: hsl(206, 86%, 43%);
    stroke-width: 2;
    transform: translateX(-5px);
    transition: all 0.3s ease;
  }

  :hover:before {
    width: 100%;
    background-image: linear-gradient(
      90deg,
      rgba(36, 0, 0, 1) 0%,
      rgba(255, 0, 0, 1) 100%,
      rgba(223, 19, 26, 1) 100%
    );
  }

  :hover svg {
    transform: translateX(0);
  }

  :active {
    transform: scale(0.95);
  }
`;
