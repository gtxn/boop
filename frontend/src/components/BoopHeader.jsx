import React from "react";
import styled from "styled-components";

import $ from "../styles/globals";
import BoopLogo from "../assets/images/boopLogo.png";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: ${$.headerheight};

  background-color: ${$.colors.secondary[500]};

  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 60px;
  border-bottom-right-radius: 60px;
`;

const BoopLogoImg = styled.img`
  height: 130px;
`;

const BoopHeader = () => {
  return (
    <Wrapper>
      <BoopLogoImg src={BoopLogo} />
    </Wrapper>
  );
};

export default BoopHeader;
