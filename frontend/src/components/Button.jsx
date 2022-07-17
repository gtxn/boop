import React, { useState } from "react";
import styled from "styled-components";

import $ from "../styles/globals";

const ButtonWrapper = styled.div`
  background-color: ${$.colors.primary[300]};
  color: white;
  font-family: mochiy;
  border: none;
  border-radius: ${$.borderRadius.standard};

  width: 300px;
  height: 80px;
  font-size: ${$.fontSize().h3};

  box-shadow: ${$.boxShadow.standard};

  transition: 0.3s;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    box-shadow: ${$.boxShadow.hover};
    background-color: ${$.colors.primary[100]};
    transform: translate(-2px, -2px);
  }
`;

const Button = ({ children, onClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <ButtonWrapper
      onClick={() => {
        if (!isClicked) {
          onClick();
          setIsClicked(true);
        }
      }}
    >
      {children}
    </ButtonWrapper>
  );
};

export default Button;
