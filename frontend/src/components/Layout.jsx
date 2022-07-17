import React, { useEffect, useState, useContext } from "react";
import styled, { keyframes, css } from "styled-components";

import rectangleShape from "../assets/images/rectangleShape.png";
import "../styles/fonts.css";
import "../styles/reset.css";
import $ from "../styles/globals";
import RootContext from "../utils/rootContext";
import { LayoutProvider } from "../utils/layoutContext";
import Toast from "./Toast";
import { navigate } from "gatsby";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${$.colors.secondary[700]};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const floatRight = (props) => keyframes`
  0% {
    top: ${props.startY}vh;
    left: -100vw;
  }
  100% {
    top: ${props.endY}vh;
    left: 100vw;
    transform: rotateZ(270deg);
  }
`;

const floatLeft = (props) => keyframes`
  0% {
    top: ${props.startY}vh;
    left: 100vw;
  }
  100% {
    top: ${props.endY}vh;
    left: -100vw;
    transform: rotateZ(270deg);
  }
`;

const Box = styled.img`
  position: fixed;
  z-index: 0;
  left: -150vw;

  ${(props) =>
    props.right
      ? css`
          animation: ${floatRight(props)} ${props.duration}s ease-in-out;
          animation-delay: ${props.delay};
        `
      : css`
          animation: ${floatLeft(props)} ${props.duration}s ease-in-out;
          animation-delay: ${props.delay};
        `}
`;

const Layout = ({ children }) => {
  const { socket } = useContext(RootContext);

  const [boxes, setBoxes] = useState([]);
  const [toastState, setToastState] = useState({
    isVisible: false,
    title: "",
    message: "",
    theme: "",
  });

  const showToast = (title, message, theme, interval) => {
    setToastState({
      isVisible: true,
      title,
      message,
      theme,
    });

    const t = setInterval(() => {
      setToastState({ ...toastState, isVisible: false });
      clearInterval(t);
    }, interval);
  };

  const newBoxes = () => {
    setBoxes([
      <Box
        src={rectangleShape}
        startY={Math.random() * 100}
        endY={Math.random() * 100}
        right={true}
        duration={Math.random() * 2 + 3}
        delay={Math.random() * 2}
      />,
      <Box
        src={rectangleShape}
        startY={Math.random() * 100}
        endY={Math.random() * 100}
        right={false}
        duration={Math.random() * 2 + 3}
        delay={Math.random() * 2}
      />,
    ]);
  };

  useEffect(() => {
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      const exit = window.confirm(
        "Are you sure you want to leave? Your session will be lost!"
      );
      if (exit) window.close();
      return (e.returnValue = "");
    });

    window.addEventListener("reload", () => {
      socket.close();
    });

    socket.newListener("error", (message) => {
      showToast("An error occured", JSON.stringify(message), "error", 7000);
    });

    socket.newListener("roomDestroyed", () => {
      showToast(
        "Room ended",
        "This boop has been destroyed by the admin",
        "error",
        7000
      );
      navigate("/");
    });

    newBoxes();
    const interval = setInterval(() => {
      newBoxes();
    }, 7000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", () => {});
    };
  }, []);

  return (
    <Wrapper>
      <LayoutProvider value={{ showToast }}>
        <Toast
          isVisible={toastState.isVisible}
          theme={toastState.theme}
          title={toastState.title}
          body={toastState.message}
          setIsVisible={(isVisible) => {
            setToastState({ ...toastState, isVisible });
          }}
        />
        {boxes}
        {children}
      </LayoutProvider>
    </Wrapper>
  );
};

export default Layout;
