import { navigate } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import BoopHeader from "../components/BoopHeader";
import VoteInfo from "../components/vote/VoteInfo";
import VoteChoices from "../components/vote/VoteChoices";
import BackArrowButton from "../components/BackArrowButton";
import $ from "../styles/globals";
import RootContext from "../utils/rootContext";

const Container = styled.div`
  height: 100%;
  width: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VoteWrapper = styled.div`
  position: absolute;
  margin-top: calc(${$.headerheight} + 30px);
  margin-bottom: 30px;
  display: flex;
  height: calc(100% - ${$.headerheight} - ${$.footerheight} - 60px);
  width: 330px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const VotePage = ({ location }) => {
  const { roomInfo, setRoomInfo } = useContext(RootContext);

  useEffect(() => {
    if (!(location.state && location.state.roomNumber)) {
      navigate("/404");
    } else {
      setRoomInfo(location.state);
    }
  }, []);

  return (
    <Container>
      <BoopHeader />
      <BackArrowButton
        onClick={() => {
          navigate("/");
        }}
      />

      <VoteWrapper>
        {roomInfo && <VoteInfo roomInfo={roomInfo} />}

        {roomInfo && roomInfo.choicesPerPerson && (
          <VoteChoices choicesPerPerson={roomInfo.choicesPerPerson} />
        )}
      </VoteWrapper>
    </Container>
  );
};

export default VotePage;
