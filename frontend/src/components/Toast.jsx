import React from "react";
import styled, { css, keyframes } from "styled-components";

import $ from "../styles/globals";

const floatIn = keyframes`
  0% {
    top: -100%;
  }
  100% {
    top: 10px;
  }
`;

const floatOut = keyframes`
  0% {
    top: 10px;
  }
  100% {
    top: -100%;
  }
`;

const Container = styled.div`
  position: absolute;
  top: -100%;
  width: 80vw;
  max-width: 500px;
  padding: 10px;
  height: 80px;
  z-index: 5;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  font-family: montserrat;
  border-radius: ${$.borderRadius.standard};

  background-color: ${$.colors.secondary[500]}c0;
  border: 1px solid ${$.colors.secondary[100]};
  border-left: 20px solid ${$.colors.secondary[100]};

  transition: all 0.3s ease-in-out;

  ${(props) =>
    props.theme == "success" &&
    css`
      border: 1px solid ${$.colors.primary[100]};
      border-left: 20px solid ${$.colors.primary[100]};
    `}

  ${(props) =>
    props.theme == "error" &&
    css`
      border: 1px solid ${$.colors.red};
      border-left: 20px solid ${$.colors.red};
    `}

  ${(props) =>
    props.isVisible
      ? css`
          animation: ${floatIn} 0.3s ease-in-out forwards;
          -webkit-animation: ${floatIn} 0.3s ease-in-out forwards;
        `
      : css`
          animation: ${floatOut} 0.3s ease-in-out forwards;
          -webkit-animation: ${floatOut} 0.3s ease-in-out forwards;
        `}
`;

const Title = styled.div`
  font-size: ${$.fontSize().h4};
  font-weight: 500;
  color: ${$.colors.bg[200]};
`;

const Body = styled.div`
  color: ${$.colors.bg[300]};
`;

const CloseButton = styled.div`
  position: absolute;
  right: 30px;
  font-size: ${$.fontSize().h4};
  font-family: montserrat;
  color: ${$.colors.bg[200]};
  cursor: pointer;
  transition: 0.3s;

  :hover {
    color: ${$.colors.bg[300]};
  }
`;

const Toast = ({ theme, title, body, isVisible, setIsVisible }) => {
  return (
    <Container theme={theme} isVisible={isVisible}>
      <Title>{title}</Title>
      <Body>{body}</Body>
      <CloseButton
        onClick={() => {
          setIsVisible(false);
        }}
      >
        X
      </CloseButton>
    </Container>
  );
};

export default Toast;
