import React from "react";
import styled from "styled-components";
import BackArrow from "../assets/images/backArrow.png";

const BackArrowImg = styled.img`
  position: fixed;
  bottom: 20px;
  left: 20px;
`;

const BackArrowButton = ({ onClick }) => {
  return <BackArrowImg src={BackArrow} onClick={onClick} />;
};

export default BackArrowButton;
