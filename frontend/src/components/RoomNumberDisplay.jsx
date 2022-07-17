import React from "react";
import { useContext } from "react";
import styled from "styled-components";

import $ from "../styles/globals";
import LayoutContext from "../utils/layoutContext";

const RoomNumberDisplayContainer = styled.div`
  background-color: ${$.colors.bg[100]};
  color: ${$.colors.bg[700]};
  width: 100%;
  height: 330px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: ${$.borderRadius.standard};
  font-size: ${$.fontSize().h3};
  font-family: mochiy;
  transition: 0.3s;

  :hover {
    cursor: pointer;
    background-color: ${$.colors.bg[300]};
  }

  :after {
    content: "Click to copy invite link";
    font-size: 10px;
    font-weight: 400;
    color: ${$.colors.bg[500]};
  }
`;

const RoomNumberDisplay = ({ roomNumber }) => {
  const { showToast } = useContext(LayoutContext);

  return (
    <RoomNumberDisplayContainer
      onClick={() => {
        navigator.clipboard.writeText(
          `You have been invited to join a BOOP room!\n\nJoin in the fun here:\n${window.location.origin}/join-boop?roomNumber=${roomNumber}`
        );
        showToast("Copied to clipboard!", "", "success", 5000);
      }}
    >
      {roomNumber}
    </RoomNumberDisplayContainer>
  );
};

export default RoomNumberDisplay;
